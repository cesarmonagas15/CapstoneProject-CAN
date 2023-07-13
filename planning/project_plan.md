# Project Plan

Pod Members: **Cesar, Ana, Nara**

## Problem Statement

 “Food waste in our homes makes up about 39% of all food waste - about 42 billion pounds of food waste.”
 
## Project Solution

Provide a  platform that empowers adults to combat food waste by offering a unique recipe filtering system based on ingredients available in their pantries. Through a partnership with Food Shift, a leading food recovery organization, we provide users with valuable resources to act against food waste.


## User Roles and Personas

### User Roles
- Registered user
- Unregistered user

### User Personas
- College student
- Working adult

## User Stories

-  a. As an unregistered user, I want to register and login, and see authorized content.
-  b. As a registered user, I want to search recipes and filter through specific ingredients, to save money and cook with available ingredients at home.
-  c. As a registered user, I want to search recipes that align with my dietary restrictions, to easily find attractive options that adapt to my lifestyle.
-  d. As an unregistered user, I want to see and search trending recipes so I can get ideas for meals.
-  e. As an unregistered user, I want to access available resources on actions to take against food waste so that I can learn and educate myself.
-  f. As a registered user, I want to search recipes that align with my dietary restrictions, to easily find attractive options that adapt to my lifestyle.
-  g. As a registered user, I want to be able to save recipes so that I can easily look at them later.

## Pages/Screens

### Unregistered Users:
- Home Page
- Sign in
- Register
- Get Involved (Food Shift)
- About us (creator stories)
- Latest Recipes
- Recipe Details 

### Registered Users:
- Home Page
- Sign In
- Register
- User Dashboard
- Get Involved (Food Shift)
- About us (creator stories)
- Latest Recipes
- Recipe Details /


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
