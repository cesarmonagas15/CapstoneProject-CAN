import "./RecipeCard.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

export default function RecipeCard({ recipe }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // new state for managing the "clicked" class

  const clockIcon = <FontAwesomeIcon icon={faClock} />;
  const userIcon = <FontAwesomeIcon icon={faUser} />;
  const ingredientIcon = <FontAwesomeIcon icon={faPenToSquare} />;
  const heartIcon = isFavorited ? (
    <FontAwesomeIcon icon={faHeartSolid} color="#ff6600" />
  ) : (
    <FontAwesomeIcon icon={faHeartRegular} />
  );

  const handleClick = () => {
    setIsClicked(true); // set isClicked to true when the button is clicked
    setIsFavorited(!isFavorited);
    setTimeout(() => setIsClicked(false), 300); // set isClicked to false after the animation duration
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
