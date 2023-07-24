import { useState , useEffect} from 'react'
import axios from "axios";
import './App.css'
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home/Home';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import Navbar from './Navbar/Navbar';
import LoginPage from './LoginPage/LoginPage';
import Dashboard from './Dashboard/Dashboard';
import RecipeDetails from './RecipeDetails/RecipeDetails';

function App() {
  const [appState, setAppState] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect( () => {
    // check if user is logged in when user first accesses webpage
    const token = localStorage.getItem("token");

    const decode = async () => {
    if (token) {
      // decode in the backend
      const response = await axios.post("http://localhost:3001/auth/token", {token});
      setAppState(response.data.decodedToken);
      setIsLoggedIn(true)
    }}

    decode();
  }, [])

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
          <Route
            path="/dashboard"
            element={
                <Dashboard
                  appState={appState}
                />
            }
          />

          <Route
              path="/recipe-details/:id"
              element={<RecipeDetails/>}
          />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
