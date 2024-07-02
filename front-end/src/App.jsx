import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './components/Register/Register';
import { RentifyContext } from './components/ContextProvider/RentifyContextProvider';
import Login from './components/login/Login';
import UserVerification from './components/UserVerification/UserVerification';
import AreaRegistrationForm from './components/user-flow/user-flow-components/AreaRegistration/AreaRegistrationForm';
import AreaEdit from './components/user-flow/user-flow-components/areaEdit/AreaEdit';
import HomePage from './components/Landing Page/HomePage';
import Tenant from './components/user-flow/Tenant';
import Owner from './components/user-flow/Owner';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import WishList from './components/Wishlist/WishList';
import useStartEffect from './CustomEffects/StartEffect';

function App() {
  const { user } = useContext(RentifyContext);
  const location = useLocation();

  useStartEffect("start");

  // Define the routes where Navbar should not be displayed
  const noNavbarRoutes = ['/register', '/login'];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/register' Component={Register} />
        <Route path='/login' Component={Login} />
        <Route path='/verification' Component={UserVerification} />
        <Route path='/buy' Component={Tenant} />
        <Route path='/rent' Component={Owner} />
        {user && <>
          <Route path='/areaRegistration' Component={AreaRegistrationForm} />
          <Route path='/areaEdit' Component={AreaEdit} />
          <Route path='/wishlist' Component={WishList} />
        </>}
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
  