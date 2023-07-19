import * as React from "react";
import "./FilterOptions.css";
import { useState } from "react";

export default function FilterOptions() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [showDietaryOptions, setShowDietaryOptions] = useState(false);
  const [showCusines, setShowCusines] = useState(false);
  const [showMealTypes, setShowMealTypes] = useState(false);
  const [showTimeRange, setShowTimeRange] = useState(false);
  const [selectedSubOptionsList, setSelectedSubOptionsList] = useState([]);


  

  const [filterState, setFilterState] = useState({
    cuisine: "",
    diet: "",
    type: "",
    maxReadyTime: ""
  })

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedSubOption(""); // Reset selected suboption when switching categories

    // Toggle the state for each category
    setShowDietaryOptions(option === "dietary");
    setShowCusines(option === "cuisine");
    setShowMealTypes(option === "meal");
    setShowTimeRange(option === "time");
  };

  const handleSubOptionClick = (subOption) => {

    setSelectedSubOption(subOption);
    if (selectedOption === "dietary"){
        setFilterState((f) => ({ ...f, diet: subOption}));
    }  
    if (selectedOption === "cuisine"){
        setFilterState((f) => ({ ...f, cuisine: subOption}));
    } 
    if (selectedOption === "meal"){
        setFilterState((f) => ({ ...f, type: subOption}));
    }
    if (selectedOption === "time"){
        if(subOption === "< 15 mins")
        setFilterState((f) => ({ ...f, maxReadyTime: 15}))

        if(subOption === "< 30 mins")
        setFilterState((f) => ({ ...f, maxReadyTime: 30}))

        if(subOption === "< 45 mins")
        setFilterState((f) => ({ ...f, maxReadyTime: 45}))

        if(subOption === "< 1 hr")
        setFilterState((f) => ({ ...f, maxReadyTime: 60}))

        if(subOption === "< 2 hr")
        setFilterState((f) => ({ ...f, maxReadyTime: 120}))
    } 
    // setSelectedSubOptionsList((prevList) => {
    //     if (!prevList.includes(subOption)) {
    //       return [...prevList, subOption];
    //     }
    //     return prevList;
    //   });
     
  };

  console.log(filterState)
  

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
            <button
              className={selectedSubOption === "Vegan" ? "active" : ""}
              onClick={() => handleSubOptionClick("Vegan")}
            >
              Vegan
            </button>
            <button
              className={selectedSubOption === "Kosher" ? "active" : ""}
              onClick={() => handleSubOptionClick("Kosher")}
            >
              Kosher
            </button>
            <button
              className={selectedSubOption === "Halal" ? "active" : ""}
              onClick={() => handleSubOptionClick("Halal")}
            >
              Halal
            </button>
            <button
              className={selectedSubOption === "Gluten-free" ? "active" : ""}
              onClick={() => handleSubOptionClick("Gluten-free")}
            >
              Gluten-free
            </button>
            <button
              className={selectedSubOption === "Vegetarian" ? "active" : ""}
              onClick={() => handleSubOptionClick("Vegetarian")}
            >
              Vegetarian
            </button>
          </div>
        )}
        {showCusines && (
          <div className="DietaryOptions">
            <button
              className={selectedSubOption === "Italian" ? "active" : ""}
              onClick={() => handleSubOptionClick("Italian")}
            >
              Italian
            </button>
            <button
              className={selectedSubOption === "Greek" ? "active" : ""}
              onClick={() => handleSubOptionClick("Greek")}
            >
              Greek
            </button>
            <button
              className={selectedSubOption === "Spanish" ? "active" : ""}
              onClick={() => handleSubOptionClick("Spanish")}
            >
              Spanish
            </button>
            <button
              className={selectedSubOption === "Chinese" ? "active" : ""}
              onClick={() => handleSubOptionClick("Chinese")}
            >
              Chinese
            </button>
            <button
              className={selectedSubOption === "Japanese" ? "active" : ""}
              onClick={() => handleSubOptionClick("Japanese")}
            >
              Japanese
            </button>
            <button
              className={selectedSubOption === "Indian" ? "active" : ""}
              onClick={() => handleSubOptionClick("Indian")}
            >
              Indian
            </button>
            <button
              className={selectedSubOption === "Mexican" ? "active" : ""}
              onClick={() => handleSubOptionClick("Mexican")}
            >
              Mexican
            </button>
            <button
              className={selectedSubOption === "Turkish" ? "active" : ""}
              onClick={() => handleSubOptionClick("Turkish")}
            >
              Turkish
            </button>
            <button
              className={selectedSubOption === "American" ? "active" : ""}
              onClick={() => handleSubOptionClick("American")}
            >
              American
            </button>
            <button
              className={selectedSubOption === "French" ? "active" : ""}
              onClick={() => handleSubOptionClick("French")}
            >
              French
            </button>
            <button
              className={selectedSubOption === "Latin American" ? "active" : ""}
              onClick={() => handleSubOptionClick("Latin American")}
            >
              Latin American
            </button>
          </div>
        )}

        {showMealTypes && (
          <div className="DietaryOptions">
            <button
              className={selectedSubOption === "Breakfast" ? "active" : ""}
              onClick={() => handleSubOptionClick("Breakfast")}
            >
              Breakfast
            </button>
            <button
              className={selectedSubOption === "Main Course" ? "active" : ""}
              onClick={() => handleSubOptionClick("Main Course")}
            >
              Main Course
            </button>
            <button
              className={selectedSubOption === "Dessert" ? "active" : ""}
              onClick={() => handleSubOptionClick("Dessert")}
            >
              Dessert
            </button>
            <button
              className={selectedSubOption === "Appetizer" ? "active" : ""}
              onClick={() => handleSubOptionClick("Appetizer")}
            >
              Appetizer
            </button>
            <button
              className={selectedSubOption === "Snack" ? "active" : ""}
              onClick={() => handleSubOptionClick("Snack")}
            >
              Snack
            </button>
          </div>
        )}
        {showTimeRange && (
          <div className="DietaryOptions">
            <button
              className={selectedSubOption === "< 15 mins" ? "active" : ""}
              onClick={() => handleSubOptionClick("< 15 mins")}
            >
              &lt; 15 mins
            </button>
            <button
              className={selectedSubOption === "< 30 mins" ? "active" : ""}
              onClick={() => handleSubOptionClick("< 30 mins")}
            >
              &lt; 30 mins
            </button>
            <button
              className={selectedSubOption === "< 45 mins" ? "active" : ""}
              onClick={() => handleSubOptionClick("< 45 mins")}
            >
              &lt; 45 mins
            </button>
            <button
              className={selectedSubOption === "< 1 hr" ? "active" : ""}
              onClick={() => handleSubOptionClick("< 1 hr")}
            >
              &lt; 1 hr
            </button>
            <button
              className={selectedSubOption === "< 2 hr" ? "active" : ""}
              onClick={() => handleSubOptionClick("< 2 hr")}
            >
              &lt; 2 hr
            </button> 
          </div>
        )}
        <div className="selected-options">
  {Object.keys(filterState)?.map((key) => {
    if (filterState[key] !== "") {
      return (
        <button key={key} className="active">
          {filterState[key]}
        </button>
      );
    }
    return null;
  })}
</div>
      </div>
    </>
  );
}
