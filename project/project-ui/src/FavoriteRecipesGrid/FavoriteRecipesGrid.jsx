import React, { useState, useEffect } from "react";
import "./FavoriteRecipesGrid.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import apiClient from "../../services/apiClient";

export default function FavoriteRecipesGrid({ user }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      // Fetch favorite recipe IDs
      const favoriteRes = await apiClient.getFavoriteRecipes(user.id);
      if (favoriteRes.error) {
        console.error("Error fetching favorite recipe IDs:", favoriteRes.error);
        return;
      }

      const favoriteIds = favoriteRes.data.map(
        (favorite) => favorite.recipe_id
      );

      // Fetch the favorite recipes using the IDs
      const recipeRes = await apiClient.getBulkRecipeInformation(favoriteIds);
      if (recipeRes.error) {
        console.error("Error fetching favorite recipes:", recipeRes.error);
        return;
      }

      setRecipes(recipeRes.data);
    };

    fetchRecipes();
  }, [user]);

  return (
    <>
      <div className="favorite-recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard user={user} recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </>
  );
}
