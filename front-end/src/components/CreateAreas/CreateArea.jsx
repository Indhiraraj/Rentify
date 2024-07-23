import React, { useState } from "react";
import "./CreateArea.css";
import { categories, facilities, types } from "../../Data/data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

const CreateArea = () => {
  // UPLOAD, DRAG,REMOVE PHOTOS
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    // console.log(photos);
  };

  const handleDragPhoto = (result) => {
    // console.log(result);
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.slice(result.source.index, 1);
    items.slice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index != indexToRemove)
    );
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
              <div className="category" key={index}>
                <div className="category-icon">{item.icon}</div>
                <p>{item.label}</p>
              </div>
            ))}
          </div>

          <h3>What type of place will tenants have?</h3>
          <div className="type-list">
            {types.map((type, index) => (
              <div className="type" key={index}>
                <div className="type-text">
                  <h4>{type.name}</h4>
                  <p>{type.description}</p>
                </div>
                <div className="type-icon">{type.icon}</div>
              </div>
            ))}
          </div>

          <h3>Where's your place located?</h3>
          <div className="address">
            <div className="location sa">
              <p>Street Address</p>
              <input
                type="text"
                placeholder="Door No,Street Address"
                required
              />
            </div>
            <div className="location ct">
              <p>City</p>
              <input type="text" placeholder="City" required />
            </div>
            <div className="location st">
              <p>State</p>
              <input type="text" placeholder="State" required />
            </div>
            <div className="location cy">
              <p>Country</p>
              <input type="text" placeholder="Country" required />
            </div>
          </div>

          <h3>Share something about your place</h3>
          <div className="basics">
            <div className="basic">
              <p>Guests</p>
              <div className="basic-count">
                <RemoveCircleOutline sx={{ font: "inherit"}} />
                <p>1</p>
                <AddCircleOutline sx={{ font: "inherit"}} />
              </div>
            </div>
            <div className="basic">
              <p>Bedrooms</p>
              <div className="basic-count">
                <RemoveCircleOutline sx={{ font: "inherit" }} />
                <p>1</p>
                <AddCircleOutline sx={{ font: "inherit" }} />
              </div>
            </div>
            <div className="basic">
              <p>Beds</p>
              <div className="basic-count">
                <RemoveCircleOutline sx={{ font: "inherit" }} />
                <p>1</p>
                <AddCircleOutline sx={{ font: "inherit" }} />
              </div>
            </div>
            <div className="basic">
              <p>Bathrooms</p>
              <div className="basic-count">
                <RemoveCircleOutline sx={{ font: "inherit" }} />
                <p>1</p>
                <AddCircleOutline sx={{ font: "inherit" }} />
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
              <div className="facility" key={index}>
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
                                className="photo"
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
                                  onClick={() => handleRemovePhoto(index)}
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
            <input type="text" placeholder="Title" name="title" required />
            <p>Description</p>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              required
            />
            <p>Highlight</p>
            <input
              type="text"
              placeholder="Highlight"
              name="highlight"
              required
            />
            <p>Highlight details</p>
            <textarea
              type="text"
              placeholder="Highlight details"
              name="highlightDetails"
              required
            />
            <p>Now, set your PRICE</p>
            <div className="price">
            <span>$</span>
            <input
              type="number"
              placeholder="100"
              name="price"
              className="price"
              required
            />
            </div>
          </div>
        </div>
      </form>
      <button className="submit-area-button">Post your Area</button>
    </div>
  );
};

export default CreateArea;
