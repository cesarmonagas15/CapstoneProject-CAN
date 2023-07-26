import * as React from "react"
import "./RecipeDetails.css"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import apiClient from "../../services/apiClient";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import RecipeNutritionFacts from "../RecipeNutritionFacts/RecipeNutritionFacts";



export default function RecipeDetails() {

    const {id} = useParams();
    const [recipe, setRecipe] = useState({});


    useEffect(()=> {
        const fetchRecipe = async () => {
            const {data, error}= await apiClient.getRecipeInformation(id); // recipe id
            if (data) setRecipe(data);
            if (error) console.error("Error fetching recipe:", error);
          };
          fetchRecipe();
    },[]);

      const navigate = useNavigate();
      const [checkedIngredients, setCheckedIngredients] = useState({});
      const clockIcon = <FontAwesomeIcon icon={faClock} />;
      const userIcon = <FontAwesomeIcon icon={faUser} />;
      const thumbsUp = <FontAwesomeIcon icon={faThumbsUp} />;
      const convertHtmlToText = (html) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        return tempElement.textContent || tempElement.innerText || '';
      };
      const formattedSummary = convertHtmlToText(recipe.summary).replace(/\.\s/g, '.\n\n');
  
      const handleIngredientCheck = (ingredientId) => {
          setCheckedIngredients((prevState) => ({
            ...prevState,
            [ingredientId]: !prevState[ingredientId],
          }));
        };

        const [doneInstructions, setDoneInstructions] = useState({});
        const handleInstructionClick = (index) => {
          // Create a new copy of the doneInstructions object to avoid mutation
          const newDoneInstructions = { ...doneInstructions }
          // Toggle the "done" state for the clicked instruction index
          newDoneInstructions[index] = !newDoneInstructions[index];
          // Update the state with the new "done" instructions
          setDoneInstructions(newDoneInstructions);
        };
          const percentCarbs = recipe?.nutrition?.caloricBreakdown?.percentCarbs || '';
          const percentFat = recipe?.nutrition?.caloricBreakdown?.percentFat || '';
          const percentProtein = recipe?.nutrition?.caloricBreakdown?.percentProtein || '';
        
  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 0 448 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </button>

      <div className="recipe-details-container">
        <div className="recipe-image">
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <h1 className="recipe-details-recipe-title">{recipe.title}</h1>
        <hr className="recipe-title-divider"></hr>

        <div className="recipe-details-columns">
          <div className="recipe-details-col">
            <div className="recipe-summary-container">
              <p className="recipe-summary">{formattedSummary}</p>
            </div>

            <div className="serving-info">
              <ul className="serving-details">
                <li className="details-item">
                  <div className="item-content">
                    {clockIcon}
                    <span className="details-value">{recipe.readyInMinutes}</span>
                  </div>
                  <span className="title">Minutes</span>
                </li>
                <li className="details-item">
                  <div className="item-content">
                    {userIcon}
                    <span className="details-value">{recipe.servings}</span>
                  </div>
                  <span className="title">Servings</span>
                </li>
                { recipe.aggregateLikes & recipe.aggregateLikes > 1 ?
                <li className="details-item">
                <div className="item-content">
                  {thumbsUp}
                  <span className="details-value">{recipe.aggregateLikes}</span>
                  </div>
                  <span className="title">Likes</span>
                </li>
                :
                <></>
                }
              </ul>
            </div>
            <div className="recipe-details-container-ingredients">
              <h3>Ingredients:</h3>
              <ul className="ingredients-box">
                {recipe.extendedIngredients?.map((ingredient) => (
                  <li key={ingredient.id}
                      className={checkedIngredients[ingredient.id] ? "checked" : ""}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={checkedIngredients[ingredient.id] || false}
                        onChange={() => handleIngredientCheck(ingredient.id)}
                      />
                      {ingredient.original}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="recipe-details-col-nutrution-facts">
            <div className="recipe-details-nutrition-facts-container">
            <RecipeNutritionFacts 
              percentCarbs = {percentCarbs}
              percentFat = {percentFat}
              percentProtein = {percentProtein}
               />
            </div>
          </div>
        </div>
                <div className="instructions-container">
        {recipe.analyzedInstructions ? (
              <div className="instructions">
                <h3>Instructions:</h3>
                <ul className="instruction-list">
                  {recipe.analyzedInstructions[0].steps?.map(
                    (instruction, index) => (
                      <li
                        key={instruction.number}
                        onClick={() => handleInstructionClick(index)}
                        className={doneInstructions[index] ? "done" : ""} // Apply 'done' class conditionally
                      >
                        <span>{instruction.number}</span>
                        {instruction.step}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <></>
            )}
            </div>
            { recipe.sourceUrl? (
            <div className="view-full-container">
              <button 
                className="view-full-button"
                onClick={() => { window.open(recipe.sourceUrl, '_blank')}}>
                View Full Recipe
              </button>
            </div>
            )
            :
            <></>
              }

      </div>
    </>
  );
}