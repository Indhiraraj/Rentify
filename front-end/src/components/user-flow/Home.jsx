import React, { useContext, useState, useRef, useEffect } from "react";
import "./home.css";
import { RentifyContext } from "../ContextProvider/RentifyContextProvider";
import Tenant from "./Tenant";
import Owner from "./Owner";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Home = () => {
  const { user, logout } = useContext(RentifyContext);
  const [ishover, setIsHover] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsHover(false);
    }
  };

  useEffect(() => {
    if (ishover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ishover]);

  return (
    <div className="home">
      <section className="top">
        <h1>Hello, {user.userName}</h1>
        <div
          className="profile"
          ref={profileRef}
          onClick={() => {
            setIsHover(!ishover);
          }}
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="icon">
            <AccountCircleOutlinedIcon fontSize="large" />
          </div>
          {ishover ? (
            <ul>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          ) : null}
        </div>
      </section>
      {user.type === "tenant" ? <Tenant /> : <Owner />}
    </div>
  );
};

export default Home;
