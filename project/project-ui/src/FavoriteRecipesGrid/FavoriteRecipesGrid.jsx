import React, { useState, useEffect } from "react";
import "./FavoriteRecipesGrid.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import apiClient from "../../services/apiClient";
import RecipeCardLoader from "../Loaders/RecipeCardLoader";

export default function FavoriteRecipesGrid({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Start loading

      // Fetch favorite recipe IDs
      const favoriteRes = await apiClient.getFavoriteRecipes(user.id);
      if (favoriteRes.error) {
        console.error("Error fetching favorite recipe IDs:", favoriteRes.error);
        setLoading(false); // End loading if there was an error
        return;
      }

      const favoriteIds = favoriteRes.data.map(
        (favorite) => favorite.recipe_id
      );

      // Fetch the favorite recipes using the IDs
      const recipeRes = await apiClient.getBulkRecipeInformation(favoriteIds);
      if (recipeRes.error) {
        console.error("Error fetching favorite recipes:", recipeRes.error);
        setLoading(false); // End loading if there was an error
        return;
      }

      setRecipes(recipeRes.data);
      setLoading(false); // End loading
    };

    fetchRecipes();
  }, [user]);

  return (
    <>
      <div className="favorite-recipes-grid">
        {loading
          ? Array(12)
              .fill()
              .map((_, index) => <RecipeCardLoader key={index} />)
          : recipes.map((recipe) => (
              <RecipeCard user={user} recipe={recipe} key={recipe.id} />
            ))}
      </div>
    </>
  );
}
