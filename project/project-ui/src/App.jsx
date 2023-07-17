import { useState } from 'react'
import './App.css'
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home/Home';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import Navbar from './Navbar/Navbar';

function App() {
  const [appState, setAppState] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    
    <div className="app">
      <BrowserRouter>
        <Navbar
          // isLoggedIn={isLoggedIn}
          // setIsLoggedIn={setIsLoggedIn}
          // setAppState={setAppState}
        />
      
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path="/login"
            element={
              <LoginPage
                // setAppState={setAppState}
                // setIsLoggedIn={setIsLoggedIn}
              />
            } */}
          {/* /> */}
          <Route
            path="/register"
            element={
              <RegistrationPage
                // setAppState={setAppState}
                // setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
