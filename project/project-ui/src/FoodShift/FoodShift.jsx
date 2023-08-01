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
        <h1>Reducing <a className="bolded-orange">Wasted Food</a> and Enabling <a className="bolded-green">Food Rescue</a></h1>
        <p>
          Food Shift is a non-profit organization dedicated to reducing wasted food and enabling food rescue. Food Shift reduces wasted food, nourishes neighbors, 
          and creates community opportunities. Its social enterprise kitchen recovers 
          food that would otherwise go to waste and upcycles or redistributes it with the help 
          of Food Shift's apprentices who are overcoming employment 
          discrimination. Creating and implementing solutions is the focus of Food Shift's holistic
           vision for regenerative communities and the environment
        </p>
        <p className="quote">
          "We integrate insights from our experience serving hyperlocally to develop and 
          implement holistic solutions to prevent wasted food through our advocacy and 
          consulting practice, maximizing food use for health, budget, community and the 
          planet. Rooted in values of justice, equity, diversity, and inclusion, we address 
          the root causes at the intersection of climate change and food justice, for the 
          people, by the people and with the people."
        </p>
        <img className="quote-image" src="https://foodshift.net/wp-content/uploads/2020/05/Homepage-Pic-1-1600x500-1.jpg" alt="Food Shift Image" />

        <h2>Our Shared Mission</h2>
        <p>
          At CanKitchen, we are passionate about making a positive impact on
          the food system. We believe that no edible food should go to waste
          when there are people struggling with hunger. Our shared mission with
          Food Shift is to create a sustainable and equitable food ecosystem
          where surplus food is rescued, and no one goes to bed hungry.
        </p>

        <h2>Our Partnership</h2>
        <p>
          We are excited to announce our affiliation with Food Shift. CanKitchen has decided
          to support Food Shift in an effort to combine our resources to amplify our impact
          and reach more communities.
        </p>
        <p>
          The CanKitchen platform was exclusively developed by the CAN team, and Food Shift
           bears no involvement or liability in its development.
        </p>

        <div className="buttons-container">
        <a
          className="foodshift-button"
          rel="noopener noreferrer"
          onClick={() => window.open('https://foodshift.net', '_blank')}
        >
          Visit FoodShift Website
        </a>
        <a
          className="donate-button"
          rel="noopener noreferrer" 
          onClick={() => window.open('https://foodshift.net/donate', '_blank')}
        >
          Donate Now
        </a>
        </div>

      </div>
    </>
  );
}
