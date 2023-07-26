import React from "react";
import "./RecipeNutritionFacts.css";

export default function RecipeNutritionFacts({percentCarbs, percentFat, percentProtein}) {
  return (
    <div className="nutrition-facts-container">
      <h2>Nutrition Facts</h2>
      <div className="nutrition-facts-content">
        <div className="nutrition-item">
          <strong>Caloric Breakdown</strong>
        </div>
        <div className="nutrition-item">
          <strong>Protein</strong>
          <span> {percentProtein} % </span>
        </div>
        <div className="nutrition-item">
          <strong>Fat</strong>
          <span>{percentFat} %</span>
        </div>
        <div className="nutrition-item">
          <strong>Carbs</strong>
          <span>{percentCarbs} %</span>
        </div>
      </div>
    </div>
  );
};
