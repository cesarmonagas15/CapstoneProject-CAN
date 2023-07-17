import * as React from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
// import profile-logo from "./profile-logo.svg";

export default function Navbar({ isLoggedIn, setIsLoggedIn, setAppState }) {

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
    <Link to="/Dashboard">
          <button>User Name</button>
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

  return (
    <nav>
      <div className="logo">
        {/* Logo image or text */}
        <a href="/">Logo</a>
      </div>
      <div className="links">
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
