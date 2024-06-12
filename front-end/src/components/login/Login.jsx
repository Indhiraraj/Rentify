import React, { useContext, useState } from "react";
import "./login.css";
import { RentifyContext } from "../ContextProvider/RentifyContextProvider";
import { useNavigate } from "react-router";

const Login = () => {
  const { login,setFormData } = useContext(RentifyContext);
  const navigate = useNavigate();
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [displayVerification,setDisplayVerification] = useState(false)
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleClick = () => {
    setFormData({
      userName:"",
      email:loginFormData.email,
      contact:"",
      type:"",
      password:""
  })
    navigate("/verification")
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginFormData),
    });

    if (response.ok) {
      const data = await response.json();
      setLoading(false)
      login(data.user);
      setLoginFormData({
        email: "",
        password: "",
      });

      navigate("/")
      
    } else {
      const data = await response.json();
      if(data.message == "unverified-user"){
        setError(data.message)
        setDisplayVerification(true)
        setLoading(false)
        return;
      }
      setError(data.message)
      setLoading(false)
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={loginFormData.email}
            onChange={handleChange}
            required
            autoComplete="off"
            placeholder="Email"
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginFormData.password}
            onChange={handleChange}
            required
            autoComplete="off"
            placeholder="Password"
          ></input>
        </div>
        <div className="bottom">
          {loading ? <p className="loading">Loading...</p> : <>{error ? <p className="error">{error}</p> : null}</>}
          {displayVerification && <p className="verification">Still not verified, <span onClick={handleClick} className="link">verify now</span></p>}
        <button type="submit">Login</button>
        </div>
        
      </form>
    </div>
  );
};

export default Login;
