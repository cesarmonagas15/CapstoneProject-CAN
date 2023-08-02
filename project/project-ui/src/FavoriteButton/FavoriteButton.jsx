import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../services/apiClient";
import "./FavoriteButton.css";
import Popup from "../Modal/Modal";

export default function FavoriteButton({ recipe, user }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heartIcon = isFavorited ? (
    <FontAwesomeIcon icon={faHeartSolid} color="#ff6600" />
  ) : (
    <FontAwesomeIcon icon={faHeartRegular} />
  );

  const checkIfFavorited = async () => {
    if (!user || !user.id) return;
    const response = await apiClient.getFavoriteRecipes(user.id);
    if (response.error) {
      console.error("Error fetching favorite recipes", response.error);
      setIsFavorited(false);
      return;
    }
    const data = response.data || [];
    const isFav =
      Array.isArray(data) &&
      data.some((favRecipe) => favRecipe.recipe_id === recipe.id);
    setIsFavorited(isFav);
  };

  useEffect(() => {
    if (!user) return;
    checkIfFavorited();
  }, [recipe, user]);

  const handleClick = async () => {
    setIsClicked(true);
    if (user && user.id) {
      // If user is signed in...
      if (isFavorited) {
        await apiClient.removeFavoriteRecipe(user.id, recipe.id);
      } else {
        await apiClient.addFavoriteRecipe(user.id, recipe.id);
      }
      checkIfFavorited();
      setTimeout(() => setIsClicked(false), 300);
    } else {
      // If user is not signed in...
      setIsModalOpen(true);
      // Open the sign-in popup
    }
  };

  return (
    <>
      <button
        className={`heart-icon-button ${isClicked ? "clicked" : ""}`}
        onClick={handleClick}
        type="primary"
      >
        {heartIcon}
      </button>
      <Popup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}
