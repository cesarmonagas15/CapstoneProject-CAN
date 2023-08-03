import * as React from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import canKitchenLogoActive from "./CanKitchen-activeLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button, ConfigProvider } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Navbar({
  isLoggedIn,
  setIsLoggedIn,
  setAppState,
  appState,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [shrinkNavbar, setShrinkNavbar] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAppState({});
    setIsLoggedIn(false);
    navigate("/");
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
  }, [shrinkNavbar]);

  const loggedIn = (
    <>
      <li>
        <Link to="/dashboard">
          <Button
            size="large"
            type="primary"
            icon={<UserOutlined />}
            className="user-button"
          >
            {appState.firstName}
          </Button>
        </Link>
      </li>

      <li>
        <Button size="large" onClick={handleLogout}>
          Logout
        </Button>
      </li>
    </>
  );

  const notLoggedIn = (
    <>
      <li>
        <Link to="/login">
          <Button colorPrimary="#ff6600" size="large" type="primary">
            Sign In
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/register">
          <Button size="large">Register</Button>
        </Link>
      </li>
    </>
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff6600",
        },
      }}
    >
      <nav className={`navbar ${shrinkNavbar ? "shrink" : ""}`}>
        <Link to="/">
          <img className="logo-image" src={canKitchenLogoActive} alt="logo" />
        </Link>

        <ul className={`sidemenu ${isSidebarOpen ? "open" : ""}`}>
          <li>
            <Link to="/Recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/AboutUs">About Us</Link>
          </li>
          <li>
            <Link to="/FoodShift">Food Shift</Link>
          </li>
          {isLoggedIn ? loggedIn : notLoggedIn}

          <i className="fa-solid fa-xmark" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faXmark} />
          </i>
        </ul>
        <i className="fa-solid fa-bars" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </i>
      </nav>
    </ConfigProvider>
  );
}
