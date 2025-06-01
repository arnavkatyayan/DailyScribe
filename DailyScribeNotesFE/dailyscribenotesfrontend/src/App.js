import './App.css';
import LoginPage from './LoginPage';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './HomePage';
import { Nav, Navbar } from 'react-bootstrap';
import LogoDailyScribe from './LogoDailyScribe.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });
  const [userName, setUsername] = useState(() => {
  return sessionStorage.getItem("userName") || "";
});
  const [isNewUser, setIsNewUser] = useState(false);
  const [isForgetPass, setIsForgetPass] = useState(false);
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
   }

   const handleSignup = () => {
    setIsNewUser(true);
   }

   const handleForgetPassword = () => {
    setIsForgetPass(true);
   } 
  return (
    <>
      <div className='header-class'>
        <div className='logo-name'>
        <img src={LogoDailyScribe} className='logo'/>
        <h1>Daily Scribe</h1>
        </div>
        {isLoggedIn ? (
          <Navbar className='navbar-css'>
            <Nav>
              <Nav.Link>Entries</Nav.Link>
              <Nav.Link>Settings</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar>
        ) : (
          <Navbar className='navbar-css'>
            <Nav>
              <Nav.Link onClick={handleSignup}>Signup</Nav.Link>
              <Nav.Link onClick={handleForgetPassword}>Forget Password</Nav.Link>
              <Nav.Link>About</Nav.Link>
            </Nav>
          </Navbar>
        )}
      </div>

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <HomePage userName={userName}/> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} setIsForgetPass={setIsForgetPass} isForgetPass={isForgetPass} setUsername={setUsername} isNewUser={isNewUser} setIsNewUser={setIsNewUser}/>}
          />
        </Routes>
      </Router>

      <div className='footer-class'>
        <div className='version-author'>
          <p className='version-no'>Version 1.0.0 | </p>
          <p className='version-no'>Arnav Katyayan | </p>
          <p className='version-no'>All Rights Reserved </p>
        </div>
      </div>
    </>
  );
}

export default App;
