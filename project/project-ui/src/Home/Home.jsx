import React, { useState, useEffect } from "react";
import "./Home.css";
import FilterOptions from "../FilterOptions/FilterOptions";
import PantryFilter from "../PantryFilter/PantryFilter";
import RecipeGrid from "../RecipeGrid/RecipeGrid";

export default function Home() {
  

  return (
    <div className="HomeContainer">
      <div className="Hero">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
          alt="Hero Image"
        />
        <div className="HeroOverlay">
          <div className="SearchInput">
            <input type="text" placeholder="🔍 Search for recipe names" />
            <button>Filter</button>
          </div>
        </div>
      </div>

      <FilterOptions />
      
      <div className="home-content">
        <RecipeGrid />

        <PantryFilter />
      </div>
    </div>
  );
}
