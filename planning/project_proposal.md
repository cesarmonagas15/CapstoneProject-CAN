# Project Proposal

Pod Members: Nara Macias, Ana Camba, Cesar Monagas

## Problem Statement

"For today's health-conscious and time-pressed individuals, finding the right recipes based on the ingredients they already have at home can be a daunting task. This often leads to unnecessary food waste and meal repetition. The challenge is to develop an intuitive application that suggests diverse recipes using ingredients currently available at the user's home. This application should also cater to various dietary preferences, preparation times, and skill levels, effectively making meal planning more efficient and personalized, and significantly reducing food waste."

## Description

What is the main purpose of your project? What are the key features your site has to offer its users? How will your targeted audience use your website?

# Project Purpose

The primary purpose of our project is to simplify meal planning and preparation for users. We aim to reduce food waste and enable diverse cooking experiences by providing a platform that suggests recipes based on ingredients that users already have at home.

## Key Features

- **Ingredient-based Recipe Suggestions:** Users can enter the ingredients they have on hand, and the application will provide a variety of recipes that utilize these ingredients.

- **Dietary Preferences and Allergies Filter:** To ensure the recommendations are personalized, the application will allow users to specify their dietary preferences (such as vegan, gluten-free, etc.) and any allergies.

- **Cooking Skill Level and Preparation Time:** Users can filter recipes based on their cooking skill level (beginner, intermediate, advanced) and the time they have available for cooking.

- **Save and Share Recipes:** Users can save their favorite recipes for easy access later and share them with friends and family.

- **Grocery List Integration:** The application can create a grocery list based on selected recipes, ensuring users know exactly what they need for their meal prep.

## Target Audience Use

Our target audience includes health-conscious individuals, busy professionals, cooking enthusiasts, and individuals trying to reduce food waste. They can use our application to:

- Discover new recipes and diversify their diet.
- Plan their meals according to their schedule and cooking skill level.
- Quickly find recipes that cater to their dietary preferences and restrictions.
- Efficiently manage their groceries to minimize waste. 
- Share favorite recipes with friends and family.
- Enjoy a personalized, intuitive cooking experience right from their kitchen.




## Expected Features

1. **Ingredient-Based Recipe Search Engine**: We will be developing a search algorithm that matches user-inputted ingredients to a database of recipes. Each recipe within the database will have associated ingredients, enabling the algorithm to make relevant matches based on user input.

2. **User Profile and Preference Filters**: We aim to establish user profiles that can securely store and retrieve user-specific information about dietary preferences and allergies. This data will further help in filtering recipe suggestions accordingly. This process might involve setting up user authentication and the creation of a user profile database.

3. **Skill Level and Time Filters**: The search algorithm will also consider additional factors such as the user's cooking skill level and preparation time for its recipe suggestions. This will require adding these attributes to the database entries for each recipe and to the user profile.

4. **Recipe Save and Share Feature**: A feature that allows users to save their favorite recipes to their profile and share these recipes with others will be incorporated. This might involve adding a 'favorite recipe' list in the user database and integrating with APIs for sharing, such as Facebook or Twitter API.

5. **Grocery List Generator**: This feature will be capable of aggregating the ingredients from selected recipes and outputting a consolidated list. This would involve parsing the ingredients from each recipe and consolidating them into a single list, which could be in a printable or email-friendly format.



## Related Work

What similar apps and websites? How will your project stand out from these other websites?

Several apps and websites offer similar services, such as Allrecipes, SuperCook, and Epicurious. Our project will stand out by focusing on personalization, a wider range of filters to cater to various user preferences, an interactive and clean user interface, and integration with social media for easy recipe sharing.


## Open Questions

What questions do you still have? What topics do you need to research more for your project?

1. **API Research:** What available APIs can potentially support our application features? Do they have adequate documentation and community support? We need to explore APIs that offer recipe databases, ingredient information, and social sharing capabilities.

2. **Database and Dataset Research:** Which existing databases or datasets can we leverage for our recipe and ingredient information? How can we effectively integrate these resources with our system? The exploration of datasets providing comprehensive information about a variety of recipes and related ingredients is necessary.

3. **Audience Research:** Who exactly is our target audience? What are their specific needs and expectations from a recipe-finding application? Understanding our user base will help us tailor the user experience to meet their specific needs. A comprehensive user persona study will help us understand the preferences, cooking habits, and dietary needs of our target audience.

4. **Technological Requirements:** What specific technologies will we need to effectively implement our desired features? This could range from programming languages and frameworks to database management systems.

5. **Security Considerations:** How can we ensure user data is securely stored and accessed? We need to delve deeper into best practices for user data security, especially in relation to storing dietary preferences and allergy information.

