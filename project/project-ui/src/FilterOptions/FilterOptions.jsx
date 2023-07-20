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
      
        const [filterState, setFilterState] = useState({
          maxReadyTime: "",
          selectedSubOptions: {
            dietary: [],
            cuisine: [],
            meal: [],
          },
        });
      
        const handleOptionClick = (option) => {
          setSelectedOption(option);

          // Toggle the state for each category
          setShowDietaryOptions(option === "dietary");
          setShowCusines(option === "cuisine");
          setShowMealTypes(option === "meal");
          setShowTimeRange(option === "time");
        };
      
        const handleSubOptionClick = (subOption) => {
            const { selectedSubOptions } = filterState;
            const isActive =
              selectedOption !== "time" && selectedSubOptions[selectedOption].includes(subOption);
          
              if (selectedOption === "time") {
                // For the "time" category, toggle the selectedSubOption
                setSelectedSubOption((prevSubOption) => (prevSubOption === subOption ? "" : subOption));
          
                // Update maxReadyTime based on the selectedSubOption
                setFilterState((f) => ({
                  ...f,
                  maxReadyTime: selectedSubOption === subOption ? "" : subOption,
                }));
              } else {
              // For other categories, toggle the active state of the subOption
              const updatedSelectedSubOptions = isActive
                ? selectedSubOptions[selectedOption].filter((item) => item !== subOption)
                : [...selectedSubOptions[selectedOption], subOption];
          
              setFilterState((f) => ({
                ...f,
                selectedSubOptions: {
                  ...f.selectedSubOptions,
                  [selectedOption]: updatedSelectedSubOptions,
                },
              }));
            }
          };

  // Helper function to convert time option to minutes
//   const getMaxReadyTimeValue = (subOption) => {
//     switch (subOption) {
//       case "< 15 mins":
//         return 15;
//       case "< 30 mins":
//         return 30;
//       case "< 45 mins":
//         return 45;
//       case "< 1 hr":
//         return 60;
//       case "< 2 hr":
//         return 120;
//       default:
//         return "";
//     }
//   };
  

  console.log(filterState)
  

  const options = {
    dietary: ["Vegan", "Kosher", "Halal", "Gluten-free", "Vegetarian"],
    cuisine: [
      "Italian",
      "Greek",
      "Spanish",
      "Chinese",
      "Japanese",
      "Indian",
      "Mexican",
      "Turkish",
      "American",
      "French",
      "Latin American",
    ],
    meal: ["Breakfast", "Main Course", "Dessert", "Appetizer", "Snack"],
    time: [
      { label: "< 15 mins", value: 15 },
      { label: "< 30 mins", value: 30 },
      { label: "< 45 mins", value: 45 },
      { label: "< 1 hr", value: 60 },
      { label: "< 2 hr", value: 120 },
    ],
  };

  return (
    <>
      <div className="SubNavbar">
        {Object.keys(options).map((option) => (
          <span
            key={option}
            className={selectedOption === option ? "active" : ""}
            onClick={() => handleOptionClick(option)}
          >
            {option === "time" ? "Time Range" : option.charAt(0).toUpperCase() + option.slice(1)}
          </span>
        ))}
      </div>
      <div className="subnavbar-options">
        {showDietaryOptions &&
          options.dietary.map((subOption) => (
            <button
              key={subOption}
              className={filterState.selectedSubOptions["dietary"].includes(subOption) ? "active" : ""}
              onClick={() => handleSubOptionClick(subOption)}
            >
              {subOption}
            </button>
          ))}
        {showCusines &&
          options.cuisine.map((subOption) => (
            <button
              key={subOption}
              className={filterState.selectedSubOptions["cuisine"].includes(subOption) ? "active" : ""}
              onClick={() => handleSubOptionClick(subOption)}
            >
              {subOption}
            </button>
          ))}
        {showMealTypes &&
          options.meal.map((subOption) => (
            <button
              key={subOption}
              className={filterState.selectedSubOptions["meal"].includes(subOption) ? "active" : ""}
              onClick={() => handleSubOptionClick(subOption)}
            >
              {subOption}
            </button>
          ))}
        {showTimeRange &&
          options.time.map((subOption) => (
            <button
              key={subOption.value}
              className={selectedSubOption === subOption.value ? "active" : ""}
              onClick={() => handleSubOptionClick(subOption.value)}
            >
              {subOption.label}
            </button>
          ))}
      </div>
      <div className="selected-options">
        <h3>Selected Filters:</h3>
        {Object.keys(filterState.selectedSubOptions).map((category) => {
          if (category !== "time") {
            return filterState.selectedSubOptions[category].map((subOption) => (
              <button key={subOption} className="selected-options-button">
                {subOption}
              </button>
            ));
          }
          return null; // Skip rendering the "time" category
        })}

        {/* Display maxReadyTime if it has a value */}
        {filterState.maxReadyTime && (
          <button className="selected-options-button">{filterState.maxReadyTime}</button>
        )}
      </div>
    </>
  );
}


