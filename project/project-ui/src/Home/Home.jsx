import React, { useState, useEffect } from "react";
import "./Home.css";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("");
  const [showDietaryOptions, setShowDietaryOptions] = useState(false);
  const [showCusines, setShowCusines] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDietaryOptions(option === "dietary");
    setShowCusines(option === "cuisine")
  };

  console.log(selectedOption)
  console.log(showDietaryOptions)

  const [apiResponse, setApiResponse] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Simulating API response delay
      // await new Promise(resolve => setTimeout(resolve, 2000));
      const response = {
        ingredients: [
          "Flour",
          "Sugar",
          "Eggs",
          "Butter",
          "Baking powder",
          "Vanilla extract",
          "Milk",
          "Salt",
          "Chocolate chips",
          "Baking soda",
          "Cocoa powder",
          "Vegetable oil",
          "Yeast",
          "Honey",
          "Oats",
          "Cinnamon",
          "Nutmeg",
          "Lemon juice",
          "Garlic",
          "Onion",
          "Tomato sauce",
          "Basil leaves",
          "Ground beef",
          "Chicken breasts",
          "Shrimp",
          "Soy sauce",
          "Rice vinegar",
          "Red pepper flakes",
          "Cilantro",
          "Lime juice",
        ],
      };
      setApiResponse(response);
    };

    fetchData();
  }, []);

  const handleIngredientClick = (ingredient) => {
    const index = selectedIngredients.indexOf(ingredient);
    if (index === -1) {
      setSelectedIngredients((prevIngredients) => [
        ...prevIngredients,
        ingredient,
      ]);
    } else {
      setSelectedIngredients((prevIngredients) =>
        prevIngredients.filter((item) => item !== ingredient)
      );
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const filterIngredients = () => {
    if (!searchValue) {
      return apiResponse.ingredients.filter(
        (ingredient) => !selectedIngredients.includes(ingredient)
      );
    }
    return apiResponse.ingredients.filter(
      (ingredient) =>
        ingredient.toLowerCase().includes(searchValue) &&
        !selectedIngredients.includes(ingredient)
    );
  };

  const showSelectedIngredients = (
    <>
      <h4>Selected Ingredients:</h4>
    </>
  );

  const showSubmitButton = (
    <>
      <button className="submitIngredients">Submit Ingredients</button>
    </>
  );

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
      <h2 className="home-title">Latest Recipes</h2>
      <div className="home-content">
        <div className="product-grid">
          <h1>hey i am product grid</h1>
        </div>

        <div id="IngredientSearchCard">
          <input
            type="text"
            id="searchInput"
            placeholder="Search to add your ingredients..."
            onChange={handleSearchInputChange}
          />
          {selectedIngredients.length > 0 && showSelectedIngredients}
          <div id="buttons-container-wrapper">
            <div id="active-ingredients" className="buttons-container">
              {selectedIngredients.map((ingredient) => (
                <button
                  key={ingredient}
                  className="ingredient-button selected"
                  onClick={() => handleIngredientClick(ingredient)}
                >
                  {ingredient}
                </button>
              ))}
            </div>
            <h4>Available Ingredients:</h4>
            <div id="available-ingredients" className="buttons-container">
              {apiResponse &&
                filterIngredients().map((ingredient) => (
                  <button
                    key={ingredient}
                    className="ingredient-button"
                    onClick={() => handleIngredientClick(ingredient)}
                  >
                    {ingredient}
                  </button>
                ))}
            </div>
          </div>

          {selectedIngredients.length > 0 && showSubmitButton}
        </div>
      </div>
    </div>
  );
}
