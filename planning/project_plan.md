# Project Plan

Pod Members: **Cesar, Ana, Nara**

## Problem Statement and Description

Insert the latest summary of your problem statement and app description.

## User Roles and Personas

Include the most up-to-date user roles and personas.

## User Stories

List the current user stories you will implement.

## Pages/Screens

List all the pages and screens in the app. Include wireframes for at least 3 of them.

## Data Model

Users
| Column Name  | Type     | Description                     |
|--------------|----------|---------------------------------|
| id           | integer  | primary key                     |
| first_name   | text     | first name of user              |
| last_name    | text     | last name of user               |
| password     | integer  | password of user account        |
| username     | VARCHAR  | username                        |
| email        | VARCHAR  | email of user used to log in    |

Favorites
| Column Name | Type    | Description                               |
|-------------|---------|-------------------------------------------|
| recipe_id   | integer | matched id of recipe in API                |
| user_id     | integer | matches the id of user logged in and USER table |





## Endpoints

| CRUD   | HTTP Verb | Description                                                         | User Stories  | Spoonacular API Documentation                                                    |
|--------|-----------|---------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------|
| Create | POST      | Create a new user account                                           | a             |                                                                                  |
| Delete | DELETE    | User deletes a saved recipe from favorites in database based on user's id | g           |                                                                                  |
| Read   | GET       | Get the list of recipes with ingredients, preparation time, serving amount, procedures, and rating for landing/search page (search recipes) | b, c, e | Two steps:<br>1. First, get the ID of searched recipes (search recipes endpoint).<br>2. Then, use that ID to display the cards on the landing page with the "get recipe information bulk" endpoint.<br>GET `https://api.spoonacular.com/recipes/complexSearch`<br>GET `https://api.spoonacular.com/recipes/informationBulk` |
| Create | POST      | Authenticates user at log in page                                  | a             |                                                                                  |
| Create | POST      | Inserts to the database of favorite recipes a recipe with a specific user ID when they click the heart symbol of THAT recipe | g |                                                                                  |
| Read   | GET       | Get list of popular recipes for the beginning of the landing page before any search (get random recipes) | d | Only one step since information comes directly from one endpoint (random).<br>GET `https://api.spoonacular.com/recipes/random` |
| Read   | GET       | Get favorite recipes of the user based on the logged-in user's ID from the database (get recipe information bulk) | g | GET `https://api.spoonacular.com/recipes/informationBulk` |
| Read   | GET       | Get information of a specific recipe by ID in the product details page (get recipe information) |               | Display recipe details page<br>GET `https://api.spoonacular.com/recipes/{id}/information` |

***Don't forget to set up your Issues, Milestones, and Project Board!***
