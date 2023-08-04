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
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import homepageMobile from "./homepage-mobile.png";

export default function LandingPage({ user }) {
  const [currentBlock, setCurrentBlock] = useState(1);
  const totalBlocks = 5;

  const handleNext = () => {
    setCurrentBlock((prevBlock) =>
      prevBlock === totalBlocks ? 1 : prevBlock + 1
    );
  };

  const handlePrev = () => {
    setCurrentBlock((prevBlock) =>
      prevBlock === 1 ? totalBlocks : prevBlock - 1
    );
  };

  const carouselData = [
    {
      image: searchRecipes,
      title: "Find Delicious Recipes",
      text: "Discover a wide range of mouth-watering recipes from various cuisines.",
    },
    {
      image: filters2,
      title: "Save Time Cooking",
      text: "Get quick and easy-to-follow recipes that fit your busy schedule.",
    },
    {
      image: savedOne,
      title: "Personalized Favorites",
      text: "Save and organize your favorite recipes for easy access later.",
    },
    {
      image: recipeDetails,
      title: "Recipe Details",
      text: "Save and organize your favorite recipes for easy access later.",
    },
  ];

  return (
    <div className="leaves-wrapper">
      <div className="landing-div">
        <div className="landing-horizontal"></div>
        <div className="paragraphs-button">
          <div className="main-title">
            <h1 className="main-header">Maximize Your Ingredients</h1>
          </div>
          <div className="small-title">
            <p className="small-hero">
              Matching your ingredients to amazing recipes
            </p>
          </div>
          <div className="search-buttons">
            <Link to="/Recipes">
              <button className="searchRecipes">Search for recipes</button>
            </Link>
          </div>
        </div>
        {/* <div className="landing-image">
            <img
              src="https://www.tourcollierville.com/wp-content/uploads/2021/03/Salad-Plate.png"
              alt="salad"
              className="hero-landing-img"
            />
          </div> */}
      </div>
      <div className="features-">
        <div id="features-title-container">
          <h1 id="features-title">Come live the experience</h1>
        </div>
      </div>
      <CarouselComponent carouselData={carouselData} />

      <AboutTeam />
    </div>
  );
}
