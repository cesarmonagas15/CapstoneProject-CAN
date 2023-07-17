import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("");
  const [showDietaryOptions, setShowDietaryOptions] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDietaryOptions(option === "dietary");
  };

  return (
    <div className="HomeContainer">
      <div className="Hero">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
          alt="Hero Image"
        />
        <div className="HeroOverlay">
          <div className="SearchInput">
            <input type="text" placeholder="🔍 Search for recipe names" />
            <button>Filter</button>
          </div>
        </div>
      </div>
      <div className="SubNavbar">
        <span
          className={selectedOption === "dietary" ? "active" : ""}
          onClick={() => handleOptionClick("dietary")}
        >
          Dietary Restrictions
        </span>
        <span
          className={selectedOption === "meal" ? "active" : ""}
          onClick={() => handleOptionClick("meal")}
        >
          Meal Types
        </span>
        <span
          className={selectedOption === "cuisine" ? "active" : ""}
          onClick={() => handleOptionClick("cuisine")}
        >
          Cuisine
        </span>
        <span
          className={selectedOption === "time" ? "active" : ""}
          onClick={() => handleOptionClick("time")}
        >
          Time Range
        </span>
      </div>
      <div className="subnavbar-options">
      {showDietaryOptions && (
        <div className="DietaryOptions">
          <button>Vegan</button>
          <button>Kosher</button>
          <button>Halal</button>
          <button>Gluten-free</button>
          <button>Vegetarian</button>
        </div>
        
      )}
      </div>
      <div className="product-grid">
        <h2>Latest Recipes</h2>


      </div>
    </div>
  );
}

