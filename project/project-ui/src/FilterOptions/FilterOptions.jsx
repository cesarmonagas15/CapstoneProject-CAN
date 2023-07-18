import * as React from "react";
import "./FilterOptions.css";
import { useState } from "react";


export default function FilterOptions() {

    const [selectedOption, setSelectedOption] = useState("");
  const [showDietaryOptions, setShowDietaryOptions] = useState(false);
  const [showCusines, setShowCusines] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDietaryOptions(option === "dietary");
    setShowCusines(option === "cuisine")
  };

  return (
    <>
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
        {showCusines && (
          <div className="DietaryOptions">
            <button>Italian</button>
            <button>Greek</button>
            <button>Spanish</button>
            <button>Chinese</button>
            <button>Japanese</button>
            <button>Indian</button>
            <button>Mexican</button>
            <button>Turkish</button>
            <button>American</button>
            <button>French</button>
            <button>Latin American</button>
          </div>
        )}
      </div>
    
    </>
    
  );
}