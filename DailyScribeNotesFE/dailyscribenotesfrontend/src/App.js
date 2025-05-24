import './App.css';
import LoginPage from './LoginPage';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './HomePage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });
  const [userName, setUsername] = useState("");

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
   
    }

  return (
    <>
      <div className='header-class'>
        <h1>Daily Scribe</h1>
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
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername}/>}
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
