import * as React from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import canKitchenLogoActive from "./CanKitchen-activeLogo.png";
// import profile-logo from "./profile-logo.svg";

export default function Navbar({
  isLoggedIn,
  setIsLoggedIn,
  setAppState,
  appState,
}) {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAppState({});
    setIsLoggedIn(false);
    navigate("/");
  };
  const loggedIn = (
    <>
      <Link to="/dashboard">
        <button className="user-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user"
          >
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
          </svg>
          <span className="name">{appState.firstName}</span>
        </button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </>
  );

  const notLoggedIn = (
    <>
      <Link to="/login">
        <button>Sign In</button>
      </Link>

      <Link to="/register">
        <button>Register</button>
      </Link>
    </>
  );

  const [shrinkNavbar, setShrinkNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set a scroll thresholds
      const addShrinkThreshold = 100;
      const removeShrinkThreshold = 50;

      if (!shrinkNavbar && window.scrollY > addShrinkThreshold) {
        setShrinkNavbar(true);
      } else if (shrinkNavbar && window.scrollY < removeShrinkThreshold) {
        setShrinkNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shrinkNavbar]); // Note that `shrinkNavbar` is now a dependency

  return (
    <nav className={`navbar ${shrinkNavbar ? "shrink" : ""}`}>
      <div className="logo">
        <Link to="/">
          <img className="logo-image" src={canKitchenLogoActive} alt="logo" />
        </Link>
      </div>

      <div className="links">
        <Link to="/Recipes">
          <a href="/recipes">Recipes</a>
        </Link>
        <Link to="/AboutUs">
          <a href="/about">About Us</a>
        </Link>

        <Link to="/FoodShift">
          <a href="/food-shift">Food Shift</a>
        </Link>
      </div>
      <div className="buttons">
        <div className="content">{isLoggedIn ? loggedIn : notLoggedIn}</div>
      </div>
    </nav>
  );
}
