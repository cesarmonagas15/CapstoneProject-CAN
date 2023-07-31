import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import FavoriteRecipesGrid from "../FavoriteRecipesGrid/FavoriteRecipesGrid";
export default function Dashboard({ appState }) {
  console.log(appState)


  const isLoggedIn = appState && appState.firstName;

  const content = isLoggedIn ? (
            <>
            <div className="user-dashboard">
              <div className="dashboard-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather-user"
                >
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
                </svg>
                <h1>Welcome, {appState.firstName}!</h1>
                {/* Add any other header content, like user information or navigation */}
              </div>

              <div className="recipes-section">
                <h2>Your Recipes</h2>
                <hr className="divider" />
                <br />
                {/* CHANGE TO FAV RECIPES */}
                <FavoriteRecipesGrid user={appState} />
              </div>
              <Link to="/">
                <div className="search-more-container">
                  <button className="search-more-btn">
                    <p className="search-more-btn-text">SEARCH MORE</p>
                  </button>
                </div>
              </Link>
            </div>
          </>

          ):(
          
            <div className="login-message">
              
              <p className="login-message-text">Login to see your dashboard</p>
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
            </div>

          );
  
  return (
    <>
    {content}
    </>
  );
}
