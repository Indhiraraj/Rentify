import React, { useContext, useState } from "react";
import "./areaRegister.css";
import { useNavigate } from "react-router";
import { RentifyContext } from "../../../ContextProvider/RentifyContextProvider";

const AreaRegistrationForm = () => {
  const { user } = useContext(RentifyContext);
  const [formData, setFormData] = useState({
    ownerId: user.userId,
    name: "",
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
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
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
    const formDataToSend = new FormData();
    Object.keys(formattedData).forEach((key) => {
      formDataToSend.append(key, formattedData[key]);
    });


    const response = await fetch("http://localhost:4000/area", {
      method: "POST",
      body: formDataToSend,
    });
    if (response.ok) {
      navigate("/rent");
    } else {
      setError("couldnt upload area,try later");
    }
    setLoading(false);
  };

  return (
    <div className="AreaForm">
      <form onSubmit={handleSubmit}>
        <h2>Area Registration Form</h2>

        <label htmlFor="name">Area Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />

        <label htmlFor="facilities">Facilities (comma-separated):</label>
        <input
          type="text"
          id="facilities"
          name="facilities"
          value={formData.facilities}
          onChange={handleChange}
          required
        />

        <label htmlFor="publicTransport">
          Public Transport (comma-separated):
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
          Security Features (comma-separated):
        </label>
        <input
          type="text"
          id="securityFeatures"
          name="securityFeatures"
          value={formData.securityFeatures}
          onChange={handleChange}
          required
        />

        <label htmlFor="greenSpaces">Green Spaces (comma-separated):</label>
        <input
          type="text"
          id="greenSpaces"
          name="greenSpaces"
          value={formData.greenSpaces}
          onChange={handleChange}
          required
        />

        <label htmlFor="internetProviders">
          Internet Providers (comma-separated):
        </label>
        <input
          type="text"
          id="internetProviders"
          name="internetProviders"
          value={formData.internetProviders}
          onChange={handleChange}
          required
        />

        <label htmlFor="mobileNetwork">Mobile Network:</label>
        <input
          type="text"
          id="mobileNetwork"
          name="mobileNetwork"
          value={formData.mobileNetwork}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          required
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
          <button type="submit">Register Area</button>
          <button onClick={() => {
            navigate("/rent")
          }}>Cancel</button>
          </>
        )}
      </form>
    </div>
  );
};

export default AreaRegistrationForm;
