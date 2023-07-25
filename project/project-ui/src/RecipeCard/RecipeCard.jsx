import "./RecipeCard.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import apiClient from "../../services/apiClient";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

export default function RecipeCard({ recipe, user }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const clockIcon = <FontAwesomeIcon icon={faClock} />;
  const userIcon = <FontAwesomeIcon icon={faUser} />;
  const ingredientIcon = <FontAwesomeIcon icon={faPenToSquare} />;
  const heartIcon = isFavorited ? (
    <FontAwesomeIcon icon={faHeartSolid} color="#ff6600" />
  ) : (
    <FontAwesomeIcon icon={faHeartRegular} />
  );

  // This function fetches the favorite recipes for the user,
  // and checks if the current recipe is in that list
  const checkIfFavorited = async () => {
    // If no user is logged in or user.id is not set, return immediately
    if (!user || !user.id) return;

    const response = await apiClient.getFavoriteRecipes(user.id); // Fetch the favorite recipes

    if (response.error) {
      console.error("Error fetching favorite recipes: hello", response.error);
      setIsFavorited(false); // Assuming if there's an error, the recipe isn't favorited
      return;
    }

    // Extract the data from the response
    const data = response.data || [];

    // Check if the current recipe is in the list of favorite recipes
    // We need to make sure that data is an array before using .some() on it
    const isFav =
      Array.isArray(data) &&
      data.some((favRecipe) => favRecipe.recipe_id === recipe.id);

    // Set the state accordingly
    setIsFavorited(isFav);
  };

  // Call the checkIfFavorited function when the component mounts and whenever recipe or user changes
  useEffect(() => {
    // If no user is logged in, return immediately
    if (!user) return;

    checkIfFavorited();
  }, [recipe, user]);

  const handleClick = async () => {
    setIsClicked(true);

    if (isFavorited) {
      // If the recipe is already favorited, remove it from favorites
      await apiClient.removeFavoriteRecipe(user.id, recipe.id);
    } else {
      // If the recipe is not favorited, add it to favorites
      await apiClient.addFavoriteRecipe(user.id, recipe.id);
    }

    // Re-check the favorite status of the recipe after it's added/removed
    checkIfFavorited();

    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <div className="recipe-card">
      <img className="recipe-img" src={recipe.image} alt={recipe.title} />
      <div className="recipe-title-heart">
        <h2 className="recipe-title">{recipe.title}</h2>
        <button
          className={`heart-icon-button ${isClicked ? "clicked" : ""}`}
          onClick={handleClick}
        >
          {heartIcon}
        </button>
      </div>
      <ul className="recipe-details">
        <li className="details-item">
          <div className="item-content">
            {clockIcon}
            <span className="value">{recipe.readyInMinutes}</span>
          </div>
          <span className="title">Minutes</span>
        </li>
        <li className="details-item">
          <div className="item-content">
            {userIcon}
            <span className="value">{recipe.servings}</span>
          </div>
          <span className="title">Servings</span>
        </li>
        <li className="details-item">
          <div className="item-content">
            {ingredientIcon}
            <span className="value">{recipe.extendedIngredients.length}</span>
          </div>
          <span className="title">Ingredients</span>
        </li>
      </ul>
    </div>
  );
}
