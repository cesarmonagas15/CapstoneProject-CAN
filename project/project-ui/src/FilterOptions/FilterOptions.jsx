import * as React from "react";
import "./FilterOptions.css";
import { useState } from "react";

export default function FilterOptions({filterState, setFilterState}) {

    const [selectedOption, setSelectedOption] = useState("");
    const [selectedSubOption, setSelectedSubOption] = useState("");
    const [showDietaryOptions, setShowDietaryOptions] = useState(false);
    const [showCusines, setShowCusines] = useState(false);
    const [showMealTypes, setShowMealTypes] = useState(false);
    const [showTimeRange, setShowTimeRange] = useState(false);
  
    // const [filterState, setFilterState] = useState({
    //   maxReadyTime: "",
    //   selectedSubOptions: {
    //     dietary: [],
    //     cuisine: [],
    //     meal: [],
    //   },
    // });
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
  
      // Toggle the state for each category
      setShowDietaryOptions(option === "dietary");
      setShowCusines(option === "cuisine");
      setShowMealTypes(option === "meal");
      setShowTimeRange(option === "time");
    };
  
    const handleSubOptionClick = (subOption) => {
      if (selectedOption === "time") {
        setSelectedSubOption((prevSubOption) => (prevSubOption === subOption ? "" : subOption));
        setFilterState((prevState) => ({
          ...prevState,
          maxReadyTime: selectedSubOption === subOption ? "" : subOption,
        }));
      } else {
        setFilterState((prevState) => {
          const selectedOptions = prevState.selectedSubOptions[selectedOption];
          const isAlreadySelected = selectedOptions.includes(subOption);
  
          // If the subOption is already selected, remove it, otherwise add it
          const updatedSelectedSubOptions = isAlreadySelected
            ? selectedOptions.filter((item) => item !== subOption)
            : [...selectedOptions, subOption];
  
          return {
            ...prevState,
            selectedSubOptions: {
              ...prevState.selectedSubOptions,
              [selectedOption]: updatedSelectedSubOptions,
            },
          };
        });
      }
    };
  
    const handleSelectedFilterClick = (subOption, category) => {
      setFilterState((prevState) => ({
        ...prevState,
        selectedSubOptions: {
          ...prevState.selectedSubOptions,
          [category]: prevState.selectedSubOptions[category].filter((item) => item !== subOption),
        },
      }));
    };

    const handleClearFilter = () => {

        setFilterState({
            maxReadyTime: "",
            selectedSubOptions: {
              dietary: [],
              cuisine: [],
              meal: [],
            },
          })
    }

    const handleClearTime = () => {

        setFilterState((prevState) => ({
            ...prevState,
            maxReadyTime: ""
        }))
    }

    // Helper function to check if there are any selected sub-options in filterState
    const hasSelectedSubOptions = () => {
        for (const category in filterState.selectedSubOptions) {
            if (filterState.selectedSubOptions[category].length > 0 || filterState.maxReadyTime != "") {
                return true;
            }
        }

    return false;
    };

    
  
    console.log(filterState);
  
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

    const filterTitle = 
    <>
    <h3>Selected Filters:</h3>
    </>

    const clearFilterButton = 
    <>
    {<button id="clear-cart" className="selected-options-button" onClick={handleClearFilter}> Clear </button>}
    </>
  
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
        {hasSelectedSubOptions() && filterTitle}
          {Object.keys(filterState.selectedSubOptions).map((category) => {
            if (category !== "time") {
              return filterState.selectedSubOptions[category].map((subOption) => (
                <button
                  key={subOption}
                  className="selected-options-button"
                  onClick={() => handleSelectedFilterClick(subOption, category)}
                >
                  {subOption}
                </button>
              ));
            }
            return null; // Skip rendering the "time" category
          })}
  
          {/* Display maxReadyTime if it has a value */}
          {filterState.maxReadyTime && (
            <button className="selected-options-button" onClick={handleClearTime}>{filterState.maxReadyTime}</button>
          )}
          {hasSelectedSubOptions() && clearFilterButton}
        </div>
      </>
    );
  }


