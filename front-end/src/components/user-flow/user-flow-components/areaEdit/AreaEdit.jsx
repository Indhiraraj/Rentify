import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./areaEdit.css";
import { RentifyContext } from "../../../ContextProvider/RentifyContextProvider";

const AreaEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { areaId } = location.state || {};
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(RentifyContext);

  const [formData, setFormData] = useState({
    name: "",
    areaId: areaId,
    ownerId: user.userId,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    facilities: "",
    publicTransport: "",
    securityFeatures: "",
    greenSpaces: "",
    internetProviders: "",
    mobileNetwork: "",
    areaImg: null,
  });

  useEffect(() => {
    const getArea = async () => {
      if (areaId) {
        const response = await fetch(`http://localhost:4000/areas/${areaId}`);

        if (response.ok) {
          const data = await response.json();
          const area = data.area;

          setFormData({
            ...formData,
            name: area.name,
            address: area.address,
            city: area.city,
            state: area.state,
            zipCode: area.zipCode,
            facilities: area.facilities.join(","),
            publicTransport: area.publicTransport.join(","),
            securityFeatures: area.securityFeatures.join(","),
            greenSpaces: area.greenSpaces.join(","),
            internetProviders: area.internetProviders.join(","),
            mobileNetwork: area.mobileNetwork,
            areaImg: null,
          });

          setImagePreview(area.img);
        } else {
          setError("Couldnt find your area, try later");
        }
      }
    };
    getArea();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
   
    if (file) {
      setFormData({
        ...formData,
        areaImg: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    document.getElementById("image").value = "";
    setFormData({
      ...formData,
      areaImg: null,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Convert comma-separated strings to arrays
    const formattedData = {
      ...formData,
      facilities: formData.facilities.split(",").map((item) => item.trim()),
      publicTransport: formData.publicTransport
        .split(",")
        .map((item) => item.trim()),
      securityFeatures: formData.securityFeatures
        .split(",")
        .map((item) => item.trim()),
      greenSpaces: formData.greenSpaces.split(",").map((item) => item.trim()),
      internetProviders: formData.internetProviders
        .split(",")
        .map((item) => item.trim()),
    };
    console.log(formattedData);
    const formDataToSend = new FormData();
    Object.keys(formattedData).forEach((key) => {
      formDataToSend.append(key, formattedData[key]);
      console.log(formattedData[key]);
    });

    console.log(formattedData);
    // Send data to the backend
    console.log(formDataToSend);
    const response = await fetch("http://localhost:4000/area/edit", {
      method: "POST",
      body: formDataToSend,
    });
    if (response.ok) {
        navigate("/rent");
    } else {
      setError("couldnt edit area,try later");
    }
    setLoading(false);
  };

  return (
    <div className="area-edit">
      <form onSubmit={handleSubmit}>
        <h2>Area Edit Form</h2>

        <label htmlFor="name">Edit Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Edit Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="city">Edit City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="state">Edit State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <label htmlFor="zipCode">Edit Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />

        <label htmlFor="facilities">Edit Facilities (comma-separated):</label>
        <input
          type="text"
          id="facilities"
          name="facilities"
          value={formData.facilities}
          onChange={handleChange}
          required
        />

        <label htmlFor="publicTransport">
          Edit Public Transport (comma-separated):
        </label>
        <input
          type="text"
          id="publicTransport"
          name="publicTransport"
          value={formData.publicTransport}
          onChange={handleChange}
          required
        />

        <label htmlFor="securityFeatures">
          Edit Security Features (comma-separated):
        </label>
        <input
          type="text"
          id="securityFeatures"
          name="securityFeatures"
          value={formData.securityFeatures}
          onChange={handleChange}
          required
        />

        <label htmlFor="greenSpaces">
          Edit Green Spaces (comma-separated):
        </label>
        <input
          type="text"
          id="greenSpaces"
          name="greenSpaces"
          value={formData.greenSpaces}
          onChange={handleChange}
          required
        />

        <label htmlFor="internetProviders">
          Edit Internet Providers (comma-separated):
        </label>
        <input
          type="text"
          id="internetProviders"
          name="internetProviders"
          value={formData.internetProviders}
          onChange={handleChange}
          required
        />

        <label htmlFor="mobileNetwork">Edit Mobile Network:</label>
        <input
          type="text"
          id="mobileNetwork"
          name="mobileNetwork"
          value={formData.mobileNetwork}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Edit Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        />

        {imagePreview && (
          <>
            <img src={imagePreview} alt="Preview" className="image-preview" />

            <button className="remove" onClick={handleImageRemove}>
              remove
            </button>
          </>
        )}
        {error && <p className="error">{error}</p>}
        {loading ? (
          <button>Loading...</button>
        ) : (<>
          <button type="submit">Update Area</button>
          <button onClick={() => {
            navigate("/rent")
          }}>Cancel</button>
          </>
        )}
      </form>
    </div>
  );
};

export default AreaEdit;
