import * as React from "react";
import "./PantryFilter.css";
import { useState, useEffect } from "react";


export default function PantryFilter() {

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
    <>
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
    
    </>
    
  );
}