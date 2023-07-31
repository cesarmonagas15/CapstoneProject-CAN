import React from "react";
import "./FoodShift.css";
import foodShiftLogo from "./Food-Shift_Logo.png";
import canKitchenLogoActive from "../Navbar/CanKitchen-activeLogo.png";

export default function FoodShift() {
  return (
    <>
      <div className="foodShift-hero">
        <img  class="foodshift-img"alt="foodShift logo" src={foodShiftLogo} />
        <img class="foodshift-img"alt="canKitchen logo" src={canKitchenLogoActive} />
      </div>

      <div className="content-container">
        <h1>Reducing Wasted Food and Enabling Food Rescue</h1>
        <p>
          FoodShift is a non-profit organization dedicated to reducing food
          waste and enabling food rescue. They work tirelessly to recover
          surplus food from various sources and redistribute it to those in
          need, ensuring that valuable resources are not wasted and that
          vulnerable communities receive the nourishment they require.
        </p>

        <h2>Our Shared Mission</h2>
        <p>
          At canKitchen, we are passionate about making a positive impact on
          the food system. We believe that no edible food should go to waste
          when there are people struggling with hunger. Our shared mission with
          FoodShift is to create a sustainable and equitable food ecosystem
          where surplus food is rescued, and no one goes to bed hungry.
        </p>

        <h2>Our Partnership</h2>
        <p>
          We are excited to announce our partnership with FoodShift. By
          combining our resources, expertise, and networks, we aim to amplify
          our impact and reach more communities in need. Together, we will work
          towards a future where food waste is minimized, and every individual
          has access to nutritious food.
        </p>
      </div>
    </>
  );
}
