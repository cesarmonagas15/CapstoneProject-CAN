import { useState , useEffect} from 'react'
import './App.css'
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home/Home';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import Navbar from './Navbar/Navbar';
import jwtDecode from "jwt-decode";
import LoginPage from './LoginPage/LoginPage';

function App() {
  const [appState, setAppState] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    // check if user is logged in when user first accesses webpage
    const token = localStorage.getItem("token");
    if (token) {
      // decode stored token
      const decodedToken = jwtDecode(token);
      setAppState(decodedToken);
      setIsLoggedIn(true)
    }
  }, []);

  return (
    
    <div className="app">
      <BrowserRouter>
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setAppState={setAppState}
          appState={appState}
        />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <LoginPage
                setAppState={setAppState}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegistrationPage
                setAppState={setAppState}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
