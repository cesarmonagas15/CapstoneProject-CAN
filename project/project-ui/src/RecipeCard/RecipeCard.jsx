import "./RecipeCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import fallback from "./fallback.png";

export default function RecipeCard({ recipe, user }) {
  const clockIcon = <FontAwesomeIcon icon={faClock} />;
  const userIcon = <FontAwesomeIcon icon={faUser} />;
  const ingredientIcon = <FontAwesomeIcon icon={faPenToSquare} />;

  return (
    <div className="recipe-card">
      <Link to={"/recipe-details/" + recipe.id}>
      <img className={recipe.image ? "recipe-img" : "fallback-img"} src={recipe.image ? recipe.image : fallback} alt={recipe.title} />
      </Link>
      <div className="recipe-title-heart">
        <h2 className="recipe-title">{recipe.title}</h2>
        <FavoriteButton recipe={recipe} user={user} />
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
