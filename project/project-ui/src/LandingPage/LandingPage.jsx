import React, { useState } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import AboutTeam from "../AboutTeam/AboutTeam";
import searchRecipes from "./searchRecipes.png";
import filters from "./filters.png";
import filters2 from "./filters2.png";
import savedRecipe from "./saved-recipe.png";
import savedOne from "./saved-one.png";
import recipeDetails from "./recipe-details.png";

export default function LandingPage({ user }) {
  const [currentBlock, setCurrentBlock] = useState(1);
  const totalBlocks = 5;

  const handleNext = () => {
    setCurrentBlock((prevBlock) => (prevBlock === totalBlocks ? 1 : prevBlock + 1));
  };

  const handlePrev = () => {
    setCurrentBlock((prevBlock) => (prevBlock === 1 ? totalBlocks : prevBlock - 1));
  };

  return (
    <>
      <div className="leaves-wrapper">
      <div className="landing-div">
          <div className="landing-horizontal"></div>
          <div className="paragraphs-button">
            <div className="main-title">
              <h1 className="main-header">BEST FOOD FOR YOUR TASTE</h1>
            </div>
            <div className="small-title">
              <p className="small-hero">Use this website to find recipes with ingredients at home</p>
            </div>
            <div className="search-buttons">
              <Link to="/Recipes">
                <button className="searchRecipes">Search for recipes</button>
              </Link>
            </div>
          </div>
          <div className="landing-image">
            <img
              src="https://www.tourcollierville.com/wp-content/uploads/2021/03/Salad-Plate.png"
              alt="salad"
              className="hero-landing-img"
            />
          </div>
        </div>
        <div className="features-">
        <div className="row">
              <h1>Come live the experience</h1>
            </div>

        <div className="benefits-and-features">
            
      <div className="feature">
        <i className="fas fa-search"></i>
        <img src={searchRecipes} className="img-search-1" />
        <h3>Find Delicious Recipes</h3>
        
        <p>Discover a wide range of mouth-watering recipes from various cuisines.</p>
      </div>
      <div className="feature">
        <i className="fas fa-clock"></i>
        <img src={filters2} className="img-search-2" />
        <h3>Save Time Cooking</h3>
        <p>Get quick and easy-to-follow recipes that fit your busy schedule.</p>
      </div>
      <div className="feature">
        <i className="fas fa-heart"></i>
        <img src={savedOne} className="img-search-1" />
        <h3>Personalized Favorites</h3>
        <p>Save and organize your favorite recipes for easy access later.</p>
      </div>
      <div className="feature">
        <i className="fas fa-heart"></i>
        <img src={recipeDetails} className="img-search-2" />
        <h3>Recipe Details</h3>
        <p>Save and organize your favorite recipes for easy access later.</p>
      </div>
    </div>
    </div>

        <AboutTeam />
      </div>
    </>
  );
}
