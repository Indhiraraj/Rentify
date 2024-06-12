import React, { useContext } from 'react';
import Register from './components/register/Register';
import  { RentifyContext } from './components/ContextProvider/RentifyContextProvider';
import Home from './components/user-flow/Home';
import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from './components/login/Login';
import Header from './components/header/Header';
import UserVerification from './components/UserVerification/UserVerification';
import AreaRegistrationForm from './components/user-flow/user-flow-components/AreaRegistration/AreaRegistrationForm';
import AreaEdit from './components/user-flow/user-flow-components/areaEdit/AreaEdit';

function App() {
  const {user} = useContext(RentifyContext)

  return (
<Router>
  {user ? null : <Header/>}

<Routes>
<Route path='/' element={user ? <Home /> : <Register />}></Route>
<Route path='/register' Component={Register}></Route>
<Route path='/login' Component={Login}></Route>
<Route path='/verification' Component={UserVerification}></Route>
{user && <>
  
<Route path='/areaRegistration' Component={AreaRegistrationForm}></Route>
<Route path='/areaEdit' Component={AreaEdit}></Route>
</>}

</Routes>
</Router>

  );
}

export default App;
