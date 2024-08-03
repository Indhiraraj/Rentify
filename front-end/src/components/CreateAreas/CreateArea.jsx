import React, { useContext, useState } from "react";
import "./CreateArea.css";
import { categories, facilities, types } from "../../Data/data";
import {
  RemoveCircleOutline,
  AddCircleOutline,
  CategoryOutlined,
} from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import Modal from "../CustomModal/Modal";
import { useNavigate } from "react-router";
import { getImageLink } from "../FirebaseService/firebaseService";
import { RentifyContext } from "../ContextProvider/RentifyContextProvider";

const CreateArea = () => {
  const { user } = useContext(RentifyContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [deletePhoto, setDeletePhoto] = useState(-1);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState(-1);
  const [type, setType] = useState(-1);
  const [address, setAddress] = useState({
    street_address: "",
    city: "",
    state: "",
    country: "",
  });
  const [gbbb, setGbbb] = useState({
    guests: 0,
    bathrooms: 0,
    bedrooms: 0,
    beds: 0,
  });
  const [user_facilities, setUserFacilities] = useState([]);
  const [area_details, setAreaDetails] = useState({
    title: "",
    description: "",
    highlight: "",
    highlight_details: "",
    price: "",
  });
  const [showModal, setShowModal] = useState(false);

  const OpenModal = (index) => {
    setShowModal(true);
    setPhotoIndex(index);
  };

  const CloseModal = () => {
    setShowModal(false);
  };

  const handleChangeCategory = (index) => {
    setCategory(index);
  };

  const handleChangeType = (index) => {
    setType(index);
    console.log(type);
  };

  const handleChangeAddress = (e) => {
    const name = e.target.name;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: e.target.value }));
  };

  const handleChangeGbbb = (name, value) => {
    value = value < 0 ? 0 : value;
    setGbbb((prevGbbb) => ({ ...prevGbbb, [name]: value }));
  };

  const handleChangeFacilities = (facility) => {
    let new_facilities;
    if (user_facilities.includes(facility)) {
      new_facilities = user_facilities.filter(
        (user_facility) => user_facility != facility
      );
    } else {
      new_facilities = [...user_facilities, facility];
    }

    setUserFacilities(new_facilities);
    console.log(user_facilities);
  };

  const handleChangeDetails = (e) => {
    const name = e.target.name;
   
    setAreaDetails((prevDetails) => ({
      ...prevDetails,
      [name]: e.target.value,
    }));
  };

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    console.log(photos);
  };

  const handleDragPhoto = (result) => {
    // console.log(result);
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.slice(result.source.index, 1);
    items.slice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (index) => {
    CloseModal();
    setDeletePhoto(index);
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setTimeout(() => {
      setPhotos(newPhotos);
      setDeletePhoto(-1);
    }, 400); // Match this with your CSS transition duration
  };

  const handlePostArea = async () => {
    if (category === -1) {
      setError("select category");
      return;
    }
    if (type === -1) {
      setError("select type");
      return;
    }
    if (gbbb.bathrooms === 0 || gbbb.bedrooms === 0 || gbbb.beds === 0) {
      setError("set your place details(bathrooms,bedrooms,beds) properly");
      return;
    }
    if (user_facilities.length === 0) {
      setError("set facilities of your property");
      return;
    }
    if (
      address.city === "" ||
      address.country === "" ||
      address.state === "" ||
      address.street_address === ""
    ) {
      setError("set your address correctly");
      return;
    }
    if (
      area_details.description === "" ||
      area_details.highlight === "" ||
      area_details.highlight_details === "" ||
      area_details.price === "" ||
      area_details.title === ""
    ) {
      setError("set your area details(description and highlights) correctly");
      return;
    }

    if (photos.length === 0) {
      setError("upload your area images");
      return;
    }

    let photoLinks = await Promise.all(
      photos.map(async (photo) => {
        console.log("test");
        return await getImageLink(user.userId, photo.name, photo);
      })
    );

    let upload_facilities = user_facilities.map((item) => {
      return facilities[item].label;
    })
    const data = {
      category: categories[category].label,
      type: types[type].name,
      gbbb,
      user_facilities: upload_facilities,
      address,
      area_details,
      images: [...photoLinks],
      ownerId: user.userId
    };
    // console.log(data);
    setError("loading");
    const response = await fetch("http://localhost:4000/api/areas/area", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      navigate("/rent");
    } else {
      setError("couldnt upload area,try later");
    }
    setError(null);
  };

  return (
    <div className="post-area">
      <h1>Publish Your Place</h1>
      <form>
        <div className="post-area__step1">
          <h2>Tell us about your place</h2>
          <hr />
          <h3>Which of the following categories best describes your place?</h3>
          <div className="category-list">
            {categories.map((item, index) => (
              <div
                className={
                  !(index === category)
                    ? "category category_hover"
                    : "category clicked"
                }
                key={index}
                onClick={() => handleChangeCategory(index)}
              >
                <div className="category-icon">{item.icon}</div>
                <p>{item.label}</p>
              </div>
            ))}
          </div>

          <h3>What type of place will tenants have?</h3>
          <div className="type-list">
            {types.map((item, index) => (
              <div
                className="type"
                key={index}
                onClick={() => handleChangeType(index)}
              >
                <div className="type-text">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
                <div
                  className={
                    index === type ? "type-icon clicked" : "type-icon hover"
                  }
                >
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          <h3>Where's your place located?</h3>
          <div className="address">
            <div className="location sa">
              <p>Street Address</p>
              <input
                type="text"
                name="street_address"
                placeholder="Door No,Street Address"
                value={address.street_address}
                onChange={handleChangeAddress}
                required
              />
            </div>
            <div className="location ct">
              <p>City</p>
              <input
                name="city"
                type="text"
                placeholder="City"
                value={address.city}
                required
                onChange={handleChangeAddress}
              />
            </div>
            <div className="location st">
              <p>State</p>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                required
                onChange={handleChangeAddress}
              />
            </div>
            <div className="location cy">
              <p>Country</p>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                required
                onChange={handleChangeAddress}
              />
            </div>
          </div>

          <h3>Share something about your place</h3>
          <div className="basics">
            <div className="basic">
              <p>Guests</p>
              <div className="basic-count">
                <RemoveCircleOutline
                  sx={{ font: "inherit" }}
                  onClick={() => handleChangeGbbb("guests", gbbb.guests - 1)}
                />
                <p>{gbbb.guests}</p>
                <AddCircleOutline
                  sx={{ font: "inherit" }}
                  onClick={() => handleChangeGbbb("guests", gbbb.guests + 1)}
                />
              </div>
            </div>
            <div className="basic">
              <p>Bedrooms</p>
              <div className="basic-count">
                <RemoveCircleOutline
                  sx={{ font: "inherit" }}
                  onClick={() =>
                    handleChangeGbbb("bedrooms", gbbb.bedrooms - 1)
                  }
                />
                <p>{gbbb.bedrooms}</p>
                <AddCircleOutline
                  sx={{ font: "inherit" }}
                  onClick={() =>
                    handleChangeGbbb("bedrooms", gbbb.bedrooms + 1)
                  }
                />
              </div>
            </div>
            <div className="basic">
              <p>Beds</p>
              <div className="basic-count">
                <RemoveCircleOutline
                  sx={{ font: "inherit" }}
                  onClick={() => handleChangeGbbb("beds", gbbb.beds - 1)}
                />
                <p>{gbbb.beds}</p>
                <AddCircleOutline
                  sx={{ font: "inherit" }}
                  onClick={() => handleChangeGbbb("beds", gbbb.beds + 1)}
                />
              </div>
            </div>
            <div className="basic">
              <p>Bathrooms</p>
              <div className="basic-count">
                <RemoveCircleOutline
                  sx={{ font: "inherit" }}
                  onClick={() =>
                    handleChangeGbbb("bathrooms", gbbb.bathrooms - 1)
                  }
                />
                <p>{gbbb.bathrooms}</p>
                <AddCircleOutline
                  sx={{ font: "inherit" }}
                  onClick={() =>
                    handleChangeGbbb("bathrooms", gbbb.bathrooms + 1)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="post-area__step2">
          <h2>Make your place stand out</h2>
          <hr />

          <h3>Tell guests what your place has to offer</h3>
          <div className="facilities">
            {facilities.map((item, index) => (
              <div
                className={
                  user_facilities.includes(index)
                    ? "facility clicked"
                    : "facility"
                }
                key={index}
                onClick={() => handleChangeFacilities(index)}
              >
                <div className="facility_icon">{item.icon}</div>
                <p>{item.label}</p>
              </div>
            ))}
          </div>

          <h3>Add some photos of your place</h3>
          <DragDropContext onDragEnd={handleDragPhoto}>
            <Droppable droppableId="photos" direction="horizontal">
              {(provided) => (
                <div
                  className="photos"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {photos.length < 1 && (
                    <>
                      <input
                        id="image"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                      />
                      <label htmlFor="image" className="alone">
                        <div className="icon">
                          <IoIosImages />
                        </div>
                        <p>Upload from your device</p>
                      </label>
                    </>
                  )}

                  {photos.length >= 1 && (
                    <>
                      {photos.map((photo, index) => {
                        return (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={
                                  deletePhoto == index
                                    ? "delete_photo photo"
                                    : "photo"
                                }
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="place"
                                />
                                <button
                                  type="button"
                                  onClick={() => OpenModal(index)}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}

                      <input
                        id="image"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                      />
                      <label htmlFor="image" className="together">
                        <div className="icon">
                          <IoIosImages />
                        </div>
                        <p>Upload from your device</p>
                      </label>
                    </>
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <h3>What make your place attractive and exiting?</h3>
          <div className="description">
            <p>Title</p>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={area_details.title}
              onChange={handleChangeDetails}
              required
            />
            <p>Description</p>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={area_details.description}
              onChange={handleChangeDetails}
              required
            />
            <p>Highlight</p>
            <input
              type="text"
              placeholder="Highlight"
              name="highlight"
              value={area_details.highlight}
              onChange={handleChangeDetails}
              required
            />
            <p>Highlight details</p>
            <textarea
              type="text"
              placeholder="Highlight details"
              name="highlight_details"
              value={area_details.highlight_details}
              onChange={handleChangeDetails}
              required
            />
            <p>Now, set your PRICE</p>
            <div className="price">
              <span>&#8377;</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                value={area_details.price}
                onChange={handleChangeDetails}
                className="price"
                required
              />
            </div>
          </div>
        </div>
      </form>

      <button onClick={handlePostArea} className="submit-area-button">
        Post your Area
      </button>
      {error && <p className="error">{error}</p>}
      <Modal show={showModal} onClose={CloseModal}>
        <p>Are you sure to delete the photo?</p>
        <button className="modal-button" onClick={() => handleRemovePhoto(photoIndex)}>delete</button>
      </Modal>
    </div>
  );
};

export default CreateArea;
