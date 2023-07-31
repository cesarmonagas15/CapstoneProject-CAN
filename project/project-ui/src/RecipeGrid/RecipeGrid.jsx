import React, { useState, useEffect } from "react";
import "./RecipeGrid.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import apiClient from "../../services/apiClient";
import RecipeCardLoader from "../Loaders/RecipeCardLoader";
import Pagination from "materialui-pagination-component";

export default function RecipeGrid({
  user,
  filterState,
  selectedIngredients,
  searchFilter,
  ingredientsForAPI,
}) {
  const [recipes, setRecipes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getRecipeIds = async () => {
      setLoading(true); // Begin loading
      const RecipeIdsRes = await apiClient.searchRecipes({
        maxReadyTime: filterState.maxReadyTime,
        cuisine: filterState.selectedSubOptions.cuisine,
        type: filterState.selectedSubOptions.meal,
        diet: filterState.selectedSubOptions.dietary,
        includeIngredients: selectedIngredients,
        query: searchFilter,
        number: 12,
        offset: offset,
      });
      if (RecipeIdsRes.error) {
        console.error("Error fetching recipe IDS:", RecipeIdsRes.error);
        setLoading(false); // End loading if there was an error
        return;
      }
      const RecipesIds = RecipeIdsRes.data.results.map((result) => result.id);
      setTotalPages(Math.ceil(RecipeIdsRes.data.totalResults/12)) // calculating total number of pages for 

      const recipeRes = await apiClient.getBulkRecipeInformation(RecipesIds);
      if (recipeRes.error) {
        setRecipes([]);
        setLoading(false); // End loading if there was an error
        return;
      }
      setRecipes(recipeRes.data);
      setLoading(false); // End loading after we set the recipes
    };
    getRecipeIds();
  }, [filterState, ingredientsForAPI, searchFilter, offset]);

  useEffect(() => {

    setOffset(0)
    
  }, [filterState, ingredientsForAPI, searchFilter]);

  const handleNextOffset = () => {
    setOffset(offset + 12);
  };

  const handlePreviousOffset = () => {
    if (offset - 12 >= 0) {
      setOffset(offset - 12);
    }
  };

  const [page, setPage] = useState(1);
 
  const handleOnChange = (pageValue) => {
    // Since the materialui-pagination-component uses 1-based indexing, we need to adjust the page value.
    const page = pageValue - 1;
    const newOffset = page * 12;
    setOffset(newOffset);
  };

  return (
    <>
      <div className="recipes">
        <div className="recipe-grid">
          {loading
            ? Array(12)
                .fill()
                .map((_, index) => <RecipeCardLoader key={index} />)
            : recipes.map((recipe) => (
                <RecipeCard user={user} recipe={recipe} key={recipe.id} />
              ))}
        </div>
        <div className="nextPage-buttons">
          {/* <button onClick={handlePreviousOffset}>Previous</button>
          <button>1</button>
          <button onClick={handleNextOffset}>Next</button> */}

          <Pagination
      variant="text" // Valid options are ["text", "outlined"].
      selectVariant="select" // Valid options are ["button", "tab", "select"].
      navigationVariant="icon" // Valid options are ["icon", "text"].
      pageWindowVariant="standard" // Valid options are ["standard", "ellipsis"].
      color="primary" // Passed down to Material-UI components.
      indicatorColor="primary" // Passed down to Material-UI Tabs.
      hideNavigation={false} // Hides the first, last, previous, & next page navigation buttons.
      hideFirst={false} // Hides the first page navigation button.
      hideLast={false} // Hides the last page navigation button.
      hidePrevious={false} // Hides the previous page navigation button.
      hideNext={false} // Hides the next page navigation button.
      disableFirst={false} // Disables the first page navigation button.
      disableLast={false} // Disables the last page navigation button.
      disablePrevious={false} // Disables the previous page navigation button.
      disableNext={false} // Disables the next page navigation button.
      page={offset / 12 + 1} // Convert offset to page number for materialui-pagination-component
      totalPages={totalPages % 500}
      onChange={handleOnChange}
      elevation={null} // Passed down to Material-UI Paper component.
      
    />
        </div>
      </div>
    </>
  );
}

// let recipes = [
//   {
//     vegetarian: false,
//     vegan: false,
//     glutenFree: false,
//     dairyFree: false,
//     veryHealthy: false,
//     cheap: false,
//     veryPopular: false,
//     sustainable: false,
//     lowFodmap: false,
//     weightWatcherSmartPoints: 15,
//     gaps: "no",
//     preparationMinutes: 5,
//     cookingMinutes: 30,
//     aggregateLikes: 163,
//     healthScore: 27,
//     creditsText: "Jen West",
//     sourceName: "Pink When",
//     pricePerServing: 195.54,
//     extendedIngredients: [
//       {
//         id: 10120420,
//         aisle: "Pasta and Rice",
//         image: "farfalle.png",
//         consistency: "SOLID",
//         name: "bow tie pasta",
//         nameClean: "farfalle",
//         original: "3 cups bow tie pasta",
//         originalName: "bow tie pasta",
//         amount: 3.0,
//         unit: "cups",
//         meta: [],
//         measures: {
//           us: {
//             amount: 3.0,
//             unitShort: "cups",
//             unitLong: "cups",
//           },
//           metric: {
//             amount: 180.0,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//       {
//         id: 1033,
//         aisle: "Cheese",
//         image: "parmesan.jpg",
//         consistency: "SOLID",
//         name: "parmigiano reggiano",
//         nameClean: "parmesan",
//         original: "½ cup Parmigiano Reggiano",
//         originalName: "Parmigiano Reggiano",
//         amount: 0.5,
//         unit: "cup",
//         meta: [],
//         measures: {
//           us: {
//             amount: 0.5,
//             unitShort: "cups",
//             unitLong: "cups",
//           },
//           metric: {
//             amount: 50.0,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//       {
//         id: 20420,
//         aisle: "Pasta and Rice",
//         image: "fusilli.jpg",
//         consistency: "SOLID",
//         name: "recipe makers chicken bruschetta pasta",
//         nameClean: "pasta",
//         original: "Kraft Recipe Makers Chicken Bruschetta Pasta",
//         originalName: "Kraft Recipe Makers Chicken Bruschetta Pasta",
//         amount: 5.0,
//         unit: "servings",
//         meta: ["kraft"],
//         measures: {
//           us: {
//             amount: 5.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//           metric: {
//             amount: 5.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//         },
//       },
//       {
//         id: 10010062,
//         aisle: "Meat",
//         image: "pork-chops.jpg",
//         consistency: "SOLID",
//         name: "pork chops",
//         nameClean: "pork chops",
//         original: "1-1/2 lb. pork chops",
//         originalName: "pork chops",
//         amount: 1.5,
//         unit: "lb",
//         meta: [],
//         measures: {
//           us: {
//             amount: 1.5,
//             unitShort: "lb",
//             unitLong: "pounds",
//           },
//           metric: {
//             amount: 680.389,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//     ],
//     id: 715538,
//     title: "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
//     readyInMinutes: 35,
//     servings: 5,
//     sourceUrl: "http://www.pinkwhen.com/make-dinner-tonight/",
//     image: "https://spoonacular.com/recipeImages/715538-556x370.jpg",
//     imageType: "jpg",
//     summary:
//       'What to make for dinner tonight?? Bruschetta Style Pork & Pasta takes roughly <b>35 minutes</b> from beginning to end. This recipe serves 5 and costs $1.96 per serving. This main course has <b>591 calories</b>, <b>45g of protein</b>, and <b>13g of fat</b> per serving. If you have bow tie pasta, parmigiano reggiano, recipe makers chicken bruschetta pasta, and a few other ingredients on hand, you can make it. 163 people have made this recipe and would make it again. It is brought to you by Pink When. Plenty of people really liked this Mediterranean dish. With a spoonacular <b>score of 90%</b>, this dish is outstanding. Similar recipes are <a href="https://spoonacular.com/recipes/dinner-tonight-grilled-romesco-style-pork-209128">Dinner Tonight: Grilled Romesco-Style Pork</a>, <a href="https://spoonacular.com/recipes/dinner-tonight-chickpea-bruschetta-31868">Dinner Tonight: Chickpea Bruschetta</a>, and <a href="https://spoonacular.com/recipes/dinner-tonight-shrimp-bruschetta-from-da-zaccaria-209251">Dinner Tonight: Shrimp Bruschetta from \'da Zaccaria</a>.',
//     cuisines: ["Mediterranean", "Italian", "European"],
//     dishTypes: ["lunch", "main course", "main dish", "dinner"],
//     diets: [],
//     occasions: [],
//     winePairing: {},
//     instructions:
//       "wash and rinse pork chops and place into the skillet.cut them into bite sized pieces and add half of the Basil Garlic simmer sauce.boil your water and start working on cooking your bow-tie pasta.when you have finished with boiling and draining your pasta, add it to the pork along with the rest of the Basil Garlic Simmering Sauce, mixing lightly.Next you will top with the Chunky Bruschetta Finishing Sauce, cover with Parmesan, and cover. Cooking on low heat 2 to 3 minutes or until heated through.",
//     analyzedInstructions: [
//       {
//         name: "",
//         steps: [
//           {
//             number: 1,
//             step: "wash and rinse pork chops and place into the skillet.cut them into bite sized pieces and add half of the Basil Garlic simmer sauce.boil your water and start working on cooking your bow-tie pasta.when you have finished with boiling and draining your pasta, add it to the pork along with the rest of the Basil Garlic Simmering Sauce, mixing lightly.Next you will top with the Chunky Bruschetta Finishing Sauce, cover with Parmesan, and cover. Cooking on low heat 2 to 3 minutes or until heated through.",
//             ingredients: [
//               {
//                 id: 10120420,
//                 name: "farfalle",
//                 localizedName: "farfalle",
//                 image: "farfalle.png",
//               },
//               {
//                 id: 10010062,
//                 name: "pork chops",
//                 localizedName: "pork chops",
//                 image: "pork-chops.jpg",
//               },
//               {
//                 id: 1033,
//                 name: "parmesan",
//                 localizedName: "parmesan",
//                 image: "parmesan.jpg",
//               },
//               {
//                 id: 11215,
//                 name: "garlic",
//                 localizedName: "garlic",
//                 image: "garlic.png",
//               },
//               {
//                 id: 2044,
//                 name: "basil",
//                 localizedName: "basil",
//                 image: "basil.jpg",
//               },
//               {
//                 id: 20420,
//                 name: "pasta",
//                 localizedName: "pasta",
//                 image: "fusilli.jpg",
//               },
//               {
//                 id: 0,
//                 name: "sauce",
//                 localizedName: "sauce",
//                 image: "",
//               },
//               {
//                 id: 14412,
//                 name: "water",
//                 localizedName: "water",
//                 image: "water.png",
//               },
//               {
//                 id: 10010219,
//                 name: "pork",
//                 localizedName: "pork",
//                 image: "pork-tenderloin-raw.png",
//               },
//             ],
//             equipment: [
//               {
//                 id: 404645,
//                 name: "frying pan",
//                 localizedName: "frying pan",
//                 image: "pan.png",
//               },
//             ],
//             length: {
//               number: 2,
//               unit: "minutes",
//             },
//           },
//         ],
//       },
//     ],
//     report: null,
//     tips: {
//       health: [
//         'You can easily replace regular noodles with whole wheat noodles to add a little extra fiber, protein, vitamins, and minerals to this dish. Just don\'t make the mistake of assuming that because the pasta is whole wheat, you can eat as much as you want. The calories and the <a href="http://www.quickanddirtytips.com/health-fitness/healthy-eating/truth-about-whole-grains?page=all">effect on your blood sugar</a> is not so drastically different! ',
//         'The great thing about parmesan cheese is that a little goes a long way, especially if you\'re buying <a href="http://www.forbes.com/sites/larryolmsted/2012/11/19/the-dark-side-of-parmesan-cheese-what-you-dont-know-might-hurt-you/">the real deal</a>.',
//       ],
//       price: [
//         "Most dairy products stay good well past their sell-by date. Instead of throwing out perfectly safe food that is just a few days or maybe even a week or two old, make sure the product smells fine, has a normal texture, and doesn't taste funny. Sniff testing isn't exactly rocket science and it can keep you from wasting food (and money).",
//       ],
//       cooking: [
//         'The best method for cooking pasta is pretty controversial, but most sources seem to reach a consensus. Check out our lesson on <a href="https://spoonacular.com/academy/how-to-cook-pasta">how to cook pasta</a> in the academy.',
//         'If parmesan plays a big role in the flavor of your dish (or if you\'re a serious foodie or serious about avoiding additivies) it might be worth your time to track down <a href="http://www.forbes.com/sites/larryolmsted/2012/11/19/the-dark-side-of-parmesan-cheese-what-you-dont-know-might-hurt-you">"true" parmesan</a>, Parmigiano Reggiano.',
//       ],
//       green: [
//         "Parmesan cheese is traditionally made using rennet, an animal-derived enzyme. For this reason, true parmesan cheese is not suitable for vegetarians. You might be able to find a vegetarian hard cheese to substitute.",
//       ],
//     },
//     openLicense: 2,
//     suspiciousDataScore: 0.0,
//     approved: 2,
//     unknownIngredients: [],
//     userTags: [],
//     originalId: null,
//     spoonacularSourceUrl:
//       "https://spoonacular.com/what-to-make-for-dinner-tonight-bruschetta-style-pork-pasta-715538",
//   },
//   {
//     vegetarian: false,
//     vegan: false,
//     glutenFree: false,
//     dairyFree: false,
//     veryHealthy: false,
//     cheap: false,
//     veryPopular: false,
//     sustainable: false,
//     lowFodmap: false,
//     weightWatcherSmartPoints: 16,
//     gaps: "no",
//     preparationMinutes: -1,
//     cookingMinutes: -1,
//     aggregateLikes: 209,
//     healthScore: 18,
//     creditsText: "Full Belly Sisters",
//     license: "CC BY-SA 3.0",
//     sourceName: "Full Belly Sisters",
//     pricePerServing: 157.06,
//     extendedIngredients: [
//       {
//         id: 1001,
//         aisle: "Milk, Eggs, Other Dairy",
//         image: "butter-sliced.jpg",
//         consistency: "SOLID",
//         name: "butter",
//         nameClean: "butter",
//         original: "1 tbsp butter",
//         originalName: "butter",
//         amount: 1.0,
//         unit: "tbsp",
//         meta: [],
//         measures: {
//           us: {
//             amount: 1.0,
//             unitShort: "Tbsp",
//             unitLong: "Tbsp",
//           },
//           metric: {
//             amount: 1.0,
//             unitShort: "Tbsp",
//             unitLong: "Tbsp",
//           },
//         },
//       },
//       {
//         id: 10011135,
//         aisle: "Produce",
//         image: "cauliflower.jpg",
//         consistency: "SOLID",
//         name: "cauliflower florets",
//         nameClean: "cauliflower florets",
//         original:
//           "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
//         originalName:
//           "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
//         amount: 2.0,
//         unit: "cups",
//         meta: ["frozen", "thawed", "cut into bite-sized pieces"],
//         measures: {
//           us: {
//             amount: 2.0,
//             unitShort: "cups",
//             unitLong: "cups",
//           },
//           metric: {
//             amount: 200.0,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//       {
//         id: 1038,
//         aisle: "Cheese",
//         image: "parmesan.jpg",
//         consistency: "SOLID",
//         name: "cheese",
//         nameClean: "pecorino romano",
//         original: "2 tbsp grated cheese (I used romano)",
//         originalName: "grated cheese (I used romano)",
//         amount: 2.0,
//         unit: "tbsp",
//         meta: ["grated", "(I used romano)"],
//         measures: {
//           us: {
//             amount: 2.0,
//             unitShort: "Tbsps",
//             unitLong: "Tbsps",
//           },
//           metric: {
//             amount: 2.0,
//             unitShort: "Tbsps",
//             unitLong: "Tbsps",
//           },
//         },
//       },
//       {
//         id: 1034053,
//         aisle: "Oil, Vinegar, Salad Dressing",
//         image: "olive-oil.jpg",
//         consistency: "LIQUID",
//         name: "extra virgin olive oil",
//         nameClean: "extra virgin olive oil",
//         original: "1-2 tbsp extra virgin olive oil",
//         originalName: "extra virgin olive oil",
//         amount: 1.0,
//         unit: "tbsp",
//         meta: [],
//         measures: {
//           us: {
//             amount: 1.0,
//             unitShort: "Tbsp",
//             unitLong: "Tbsp",
//           },
//           metric: {
//             amount: 1.0,
//             unitShort: "Tbsp",
//             unitLong: "Tbsp",
//           },
//         },
//       },
//       {
//         id: 11215,
//         aisle: "Produce",
//         image: "garlic.png",
//         consistency: "SOLID",
//         name: "garlic",
//         nameClean: "garlic",
//         original: "5-6 cloves garlic",
//         originalName: "garlic",
//         amount: 5.0,
//         unit: "cloves",
//         meta: [],
//         measures: {
//           us: {
//             amount: 5.0,
//             unitShort: "cloves",
//             unitLong: "cloves",
//           },
//           metric: {
//             amount: 5.0,
//             unitShort: "cloves",
//             unitLong: "cloves",
//           },
//         },
//       },
//       {
//         id: 10720420,
//         aisle: "Pasta and Rice",
//         image: "spaghetti.jpg",
//         consistency: "SOLID",
//         name: "pasta",
//         nameClean: "linguine",
//         original: "6-8 ounces pasta (I used linguine)",
//         originalName: "pasta (I used linguine)",
//         amount: 6.0,
//         unit: "ounces",
//         meta: ["(I used linguine)"],
//         measures: {
//           us: {
//             amount: 6.0,
//             unitShort: "oz",
//             unitLong: "ounces",
//           },
//           metric: {
//             amount: 170.097,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//       {
//         id: 1032009,
//         aisle: "Spices and Seasonings",
//         image: "red-pepper-flakes.jpg",
//         consistency: "SOLID",
//         name: "couple of pepper flakes",
//         nameClean: "red pepper flakes",
//         original: "couple of pinches red pepper flakes, optional",
//         originalName: "couple of red pepper flakes, optional",
//         amount: 2.0,
//         unit: "pinches",
//         meta: ["red"],
//         measures: {
//           us: {
//             amount: 2.0,
//             unitShort: "pinches",
//             unitLong: "pinches",
//           },
//           metric: {
//             amount: 2.0,
//             unitShort: "pinches",
//             unitLong: "pinches",
//           },
//         },
//       },
//       {
//         id: 1102047,
//         aisle: "Spices and Seasonings",
//         image: "salt-and-pepper.jpg",
//         consistency: "SOLID",
//         name: "salt and pepper",
//         nameClean: "salt and pepper",
//         original: "salt and pepper, to taste",
//         originalName: "salt and pepper, to taste",
//         amount: 2.0,
//         unit: "servings",
//         meta: ["to taste"],
//         measures: {
//           us: {
//             amount: 2.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//           metric: {
//             amount: 2.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//         },
//       },
//       {
//         id: 11291,
//         aisle: "Produce",
//         image: "spring-onions.jpg",
//         consistency: "SOLID",
//         name: "scallions",
//         nameClean: "spring onions",
//         original: "3 scallions, chopped, white and green parts separated",
//         originalName: "scallions, chopped, white and green parts separated",
//         amount: 3.0,
//         unit: "",
//         meta: ["white", "green", "separated", "chopped"],
//         measures: {
//           us: {
//             amount: 3.0,
//             unitShort: "",
//             unitLong: "",
//           },
//           metric: {
//             amount: 3.0,
//             unitShort: "",
//             unitLong: "",
//           },
//         },
//       },
//       {
//         id: 14106,
//         aisle: "Alcoholic Beverages",
//         image: "white-wine.jpg",
//         consistency: "LIQUID",
//         name: "white wine",
//         nameClean: "dry white wine",
//         original: "2-3 tbsp white wine",
//         originalName: "white wine",
//         amount: 2.0,
//         unit: "tbsp",
//         meta: [],
//         measures: {
//           us: {
//             amount: 2.0,
//             unitShort: "Tbsps",
//             unitLong: "Tbsps",
//           },
//           metric: {
//             amount: 2.0,
//             unitShort: "Tbsps",
//             unitLong: "Tbsps",
//           },
//         },
//       },
//       {
//         id: 99025,
//         aisle: "Pasta and Rice",
//         image: "breadcrumbs.jpg",
//         consistency: "SOLID",
//         name: "bread crumbs",
//         nameClean: "whole wheat breadcrumbs",
//         original: "1/4 cup whole wheat bread crumbs (I used panko)",
//         originalName: "whole wheat bread crumbs (I used panko)",
//         amount: 0.25,
//         unit: "cup",
//         meta: ["whole wheat", "(I used panko)"],
//         measures: {
//           us: {
//             amount: 0.25,
//             unitShort: "cups",
//             unitLong: "cups",
//           },
//           metric: {
//             amount: 27.0,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//     ],
//     id: 716429,
//     title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
//     readyInMinutes: 45,
//     servings: 2,
//     sourceUrl:
//       "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
//     image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
//     imageType: "jpg",
//     summary:
//       'You can never have too many main course recipes, so give Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs a try. One serving contains <b>543 calories</b>, <b>17g of protein</b>, and <b>16g of fat</b>. For <b>$1.57 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe serves 2. A mixture of butter, white wine, pasta, and a handful of other ingredients are all it takes to make this recipe so yummy. 209 people have tried and liked this recipe. It is brought to you by fullbellysisters.blogspot.com. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 83%</b>, which is tremendous. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1230187">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229807">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, and <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229669">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>.',
//     cuisines: [],
//     dishTypes: ["side dish", "lunch", "main course", "main dish", "dinner"],
//     diets: [],
//     occasions: [],
//     winePairing: {
//       pairedWines: [],
//       pairingText:
//         "No one wine will suit every pasta dish. Pasta in a tomato-based sauce will usually work well with a medium-bodied red, such as a montepulciano or chianti. Pasta with seafood or pesto will fare better with a light-bodied white, such as a pinot grigio. Cheese-heavy pasta can pair well with red or white - you might try a sangiovese wine for hard cheeses and a chardonnay for soft cheeses. We may be able to make a better recommendation if you ask again with a specific pasta dish.",
//       productMatches: [],
//     },
//     instructions: "",
//     analyzedInstructions: [],
//     report: null,
//     tips: {
//       health: [
//         'If you can, choose grassfed butter for a <a href="http://www.marksdailyapple.com/grass-fed-butter/#axzz3B6O62GgG">better nutritional profile</a>&mdash;more vitamins, a favorable omega 3/6 ratio, etc.',
//         "To make baked goods lighter and sneak in some extra nutrition, you can swap half the butter or oil (sometimes even all of it!) with an equal amount of unsweetened applesauce.",
//         "Believe it or not, some sources say you can substitute avocado puree for butter when making brownies. Try it and let us know how it turns out!",
//         "Before you pass up garlic because you don't want the bad breath that comes with it, keep in mind that the compounds that cause garlic breath also offer a lot of health benefits. Garlic has anti-inflammatory, antioxidant, antibacterial, and antiviral properties. If you really want to get the most health benefits out of your garlic, choose Spanish garlic, which contains the most allicin (one of garlic's most beneficial compounds).",
//         "If you are cooking with wine, be aware that the amount of alcohol that evaporates could be much less than you think. In fact, <a href=\"http://old.post-gazette.com/magazine/19980903alcohol8.asp\">researchers found</a> that anywhere between 4 and 49 percent of the alcohol in a dish might remain depending on the cooking method, length of cooking, etc. If you're concerned about the amount of alcohol you're consuming, keep an eye on how much wine is going into your dish!",
//         'You can easily replace regular noodles with whole wheat noodles to add a little extra fiber, protein, vitamins, and minerals to this dish. Just don\'t make the mistake of assuming that because the pasta is whole wheat, you can eat as much as you want. The calories and the <a href="http://www.quickanddirtytips.com/health-fitness/healthy-eating/truth-about-whole-grains?page=all">effect on your blood sugar</a> is not so drastically different! ',
//       ],
//       price: [
//         "Most dairy products stay good well past their sell-by date. Instead of throwing out perfectly safe food that is just a few days or maybe even a week or two old, make sure the product smells fine, has a normal texture, and doesn't taste funny. Sniff testing isn't exactly rocket science and it can keep you from wasting food (and money).",
//       ],
//       cooking: [
//         'The best method for cooking pasta is pretty controversial, but most sources seem to reach a consensus. Check out our lesson on <a href="https://spoonacular.com/academy/how-to-cook-pasta">how to cook pasta</a> in the academy.',
//         'When buying wine for cooking, it is certainly not a bad idea to buy a wine you would enjoy drinking (some wine for the dish, some wine for the chef?) But if your favorite wines cost a small fortune, save them for drinking and purchase a cheaper?though still good quality!?wine for cooking. Just don\'t buy "cooking wine" with added salt, food coloring, etc. ',
//         "Don't have any wine in the house? Red wine vinegar and white wine vinegar can be used to deglaze pans. Chicken/beef broth or grape juice can also be used in place of wine in a pinch, especially if a recipe only calls for a small amount.",
//         'Butter\'s incredible flavor has made it an extremely popular cooking fat, but it is important to know that butter has the lowest smoke point of almost any cooking fat. This means butter literally starts to smoke at a lower temperature than most other fats between 250-350 degrees Fahrenheit. So while butter is great for cooking at lower temperatures, you should probably use canola oil, coconut oil, or  <a href="https://spoonacular.com/academy/vegetable-oil">another oil with a higher smoke point</a> for frying and other high temperature cooking.',
//         "Here's a trick for peeling garlic quickly. Put the garlic clove on your cutting board. Take a knife with a thick blade and place the blade flat across the garlic clove (the clove should be closer to the handle than the middle of the blade). Whack down on the flat side of the blade with your free hand to smoosh the garlic a bit. Done correctly, the skin will peel right off.",
//         'Extra-virgin olive oil is the least refined type of olive oil and therefore contains more of the beneficial compounds that get lost during processing. However, its minimal processing could also mean it has a lower smoke point than other olive oils. Once an oil starts to smoke, it begins to break down, producing a bad flavor and potentially harmful compounds. Unfortunately, the smoke point of an oil depends on so many factors that it is hard to say what the smoke point of an oil really is. For extra-virgin olive oil, it could be anywhere between 200-400 degrees Fahrenheit. Most people recommend using extra-virgin olive oil to add flavor to a finished dish or in cold dishes to be on the safe side. More refined olive oils, canola oil,  coconut oil, and <a href="https://spoonacular.com/academy/butter">clarified butter/ghee</a> are better options for high temperature cooking.',
//       ],
//       green: [],
//     },
//     openLicense: 2,
//     suspiciousDataScore: 37.03575,
//     approved: 2,
//     unknownIngredients: [],
//     userTags: [],
//     originalId: null,
//     spoonacularSourceUrl:
//       "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
//   },
//   {
//     vegetarian: false,
//     vegan: false,
//     glutenFree: false,
//     dairyFree: false,
//     veryHealthy: false,
//     cheap: false,
//     veryPopular: false,
//     sustainable: false,
//     lowFodmap: false,
//     weightWatcherSmartPoints: 8,
//     gaps: "no",
//     preparationMinutes: -1,
//     cookingMinutes: -1,
//     aggregateLikes: 1,
//     healthScore: 27,
//     creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
//     license: "CC BY 3.0",
//     sourceName: "Foodista",
//     pricePerServing: 162.85,
//     extendedIngredients: [
//       {
//         id: 10218364,
//         aisle: "Bakery/Bread;Pasta and Rice;Ethnic Foods",
//         image: "flour-tortilla.jpg",
//         consistency: "SOLID",
//         name: "warm flour tortillas",
//         nameClean: "flour tortilla",
//         original: "warm flour tortillas",
//         originalName: "warm flour tortillas",
//         amount: 12.0,
//         unit: "servings",
//         meta: [],
//         measures: {
//           us: {
//             amount: 12.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//           metric: {
//             amount: 12.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//         },
//       },
//       {
//         id: 11165,
//         aisle: "Produce",
//         image: "cilantro.png",
//         consistency: "SOLID",
//         name: "cilantro",
//         nameClean: "cilantro",
//         original: "1/2 cup fresh cilantro, chopped",
//         originalName: "fresh cilantro, chopped",
//         amount: 0.5,
//         unit: "cup",
//         meta: ["fresh", "chopped"],
//         measures: {
//           us: {
//             amount: 0.5,
//             unitShort: "cups",
//             unitLong: "cups",
//           },
//           metric: {
//             amount: 8.0,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//       {
//         id: 11215,
//         aisle: "Produce",
//         image: "garlic.png",
//         consistency: "SOLID",
//         name: "clv garlic",
//         nameClean: "garlic",
//         original: "6 large clv garlic, minced",
//         originalName: "clv garlic, minced",
//         amount: 6.0,
//         unit: "large",
//         meta: ["minced"],
//         measures: {
//           us: {
//             amount: 6.0,
//             unitShort: "large",
//             unitLong: "larges",
//           },
//           metric: {
//             amount: 6.0,
//             unitShort: "large",
//             unitLong: "larges",
//           },
//         },
//       },
//       {
//         id: 1009037,
//         aisle: "Refrigerated",
//         image: "guacamole.jpg",
//         consistency: "SOLID",
//         name: "guacamole",
//         nameClean: "guacamole",
//         original: "guacamole",
//         originalName: "guacamole",
//         amount: 12.0,
//         unit: "servings",
//         meta: [],
//         measures: {
//           us: {
//             amount: 12.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//           metric: {
//             amount: 12.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//         },
//       },
//       {
//         id: 99186,
//         aisle: "Meat",
//         image: "diced-ham.jpg",
//         consistency: "SOLID",
//         name: "cubes",
//         nameClean: "diced ham",
//         original: "inch cubes",
//         originalName: "cubes",
//         amount: 1.0,
//         unit: "inch",
//         meta: [],
//         measures: {
//           us: {
//             amount: 1.0,
//             unitShort: "inch",
//             unitLong: "inch",
//           },
//           metric: {
//             amount: 1.0,
//             unitShort: "inch",
//             unitLong: "inch",
//           },
//         },
//       },
//       {
//         id: 9150,
//         aisle: "Produce",
//         image: "lemon.png",
//         consistency: "SOLID",
//         name: "lemon",
//         nameClean: "lemon",
//         original: "1 large lemon",
//         originalName: "lemon",
//         amount: 1.0,
//         unit: "large",
//         meta: [],
//         measures: {
//           us: {
//             amount: 1.0,
//             unitShort: "large",
//             unitLong: "large",
//           },
//           metric: {
//             amount: 1.0,
//             unitShort: "large",
//             unitLong: "large",
//           },
//         },
//       },
//       {
//         id: 4582,
//         aisle: "Oil, Vinegar, Salad Dressing",
//         image: "vegetable-oil.jpg",
//         consistency: "LIQUID",
//         name: "oil",
//         nameClean: "cooking oil",
//         original: "oil for frying",
//         originalName: "oil for frying",
//         amount: 12.0,
//         unit: "servings",
//         meta: ["for frying"],
//         measures: {
//           us: {
//             amount: 12.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//           metric: {
//             amount: 12.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//         },
//       },
//       {
//         id: 9200,
//         aisle: "Produce",
//         image: "orange.png",
//         consistency: "SOLID",
//         name: "oranges",
//         nameClean: "orange",
//         original: "3 large oranges, divided",
//         originalName: "oranges, divided",
//         amount: 3.0,
//         unit: "large",
//         meta: ["divided"],
//         measures: {
//           us: {
//             amount: 3.0,
//             unitShort: "large",
//             unitLong: "larges",
//           },
//           metric: {
//             amount: 3.0,
//             unitShort: "large",
//             unitLong: "larges",
//           },
//         },
//       },
//       {
//         id: 10211821,
//         aisle: "Produce",
//         image: "bell-pepper-orange.png",
//         consistency: "SOLID",
//         name: "bell pepper",
//         nameClean: "bell pepper",
//         original: "pepper to taste",
//         originalName: "pepper to taste",
//         amount: 12.0,
//         unit: "servings",
//         meta: ["to taste"],
//         measures: {
//           us: {
//             amount: 12.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//           metric: {
//             amount: 12.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//         },
//       },
//       {
//         id: 13943,
//         aisle: "Meat",
//         image: "beef-shoulder-roast.png",
//         consistency: "SOLID",
//         name: "shoulder roast",
//         nameClean: "beef shoulder roast",
//         original: "1 boneless pork blade or shoulder roast (3 to 4 lb",
//         originalName: "boneless pork blade or shoulder roast (3 to 4 lb",
//         amount: 1.0,
//         unit: "",
//         meta: ["boneless"],
//         measures: {
//           us: {
//             amount: 1.0,
//             unitShort: "",
//             unitLong: "",
//           },
//           metric: {
//             amount: 1.0,
//             unitShort: "",
//             unitLong: "",
//           },
//         },
//       },
//       {
//         id: 2047,
//         aisle: "Spices and Seasonings",
//         image: "salt.jpg",
//         consistency: "SOLID",
//         name: "salt",
//         nameClean: "table salt",
//         original: "Salt to taste",
//         originalName: "Salt to taste",
//         amount: 12.0,
//         unit: "servings",
//         meta: ["to taste"],
//         measures: {
//           us: {
//             amount: 12.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//           metric: {
//             amount: 12.0,
//             unitShort: "servings",
//             unitLong: "servings",
//           },
//         },
//       },
//       {
//         id: 1001009,
//         aisle: "Cheese",
//         image: "shredded-cheddar.jpg",
//         consistency: "SOLID",
//         name: "cheddar cheese",
//         nameClean: "shredded cheddar cheese",
//         original: "1 1/2 cups shredded Cheddar cheese",
//         originalName: "shredded Cheddar cheese",
//         amount: 1.5,
//         unit: "cups",
//         meta: ["shredded"],
//         measures: {
//           us: {
//             amount: 1.5,
//             unitShort: "cups",
//             unitLong: "cups",
//           },
//           metric: {
//             amount: 169.5,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//     ],
//     id: 651575,
//     title: "Mexican Carnitas",
//     readyInMinutes: 45,
//     servings: 12,
//     sourceUrl: "http://www.foodista.com/recipe/Y3VQVMF2/mexican-carnitas",
//     image: "https://spoonacular.com/recipeImages/651575-556x370.jpg",
//     imageType: "jpg",
//     summary:
//       'Mexican Carnitas might be a good recipe to expand your main course recipe box. This recipe makes 12 servings with <b>355 calories</b>, <b>29g of protein</b>, and <b>15g of fat</b> each. For <b>$1.63 per serving</b>, this recipe <b>covers 27%</b> of your daily requirements of vitamins and minerals. This recipe from Foodista requires shoulder roast, cilantro, oranges, and cubes. 1 person were impressed by this recipe. This recipe is typical of Mexican cuisine. From preparation to the plate, this recipe takes about <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 71%</b>. This score is pretty good. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/mexican-carnitas-1471495">Mexican Carnitas</a>, <a href="https://spoonacular.com/recipes/mexican-carnitas-410776">Mexican Carnitas</a>, and <a href="https://spoonacular.com/recipes/authentic-mexican-pork-carnitas-1046493">Authentic Mexican Pork Carnitas</a>.',
//     cuisines: ["Mexican"],
//     dishTypes: ["lunch", "main course", "main dish", "dinner"],
//     diets: [],
//     occasions: [],
//     winePairing: {
//       pairedWines: ["pinot noir", "riesling", "sparkling rose"],
//       pairingText:
//         "Mexican works really well with Pinot Noir, Riesling, and Sparkling rosé. Acidic white wines like riesling or low-tannin reds like pinot noir can work well with Mexican dishes. Sparkling rosé is a safe pairing too. One wine you could try is Charles de Cazanove Tete de Cuvee Brut. It has 4.7 out of 5 stars and a bottle costs about 40 dollars.",
//       productMatches: [
//         {
//           id: 3492114,
//           title: "Charles de Cazanove Tete de Cuvee Brut",
//           description:
//             "The fine bubbles form a large string against a golden background. A fruity nose and delicious, persistent barley sugar and brioche flavors. A very lively wine that is very versatile. This is a bright, easygoing Champagne for any party!This champagne pairs well with shellfish, pork dishes, mild and soft cheeses, and rich fish.Blend: 10% Chardonnay, 30% Pinot Meunier, 60% Pinot Noir",
//           price: "$39.9900016784668",
//           imageUrl:
//             "https://spoonacular.com/productImages/3492114-312x231.jpg",
//           averageRating: 0.9399999976158142,
//           ratingCount: 21.0,
//           score: 0.9243749976158142,
//           link: "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fcharles-de-cazanove-tete-de-cuvee-brut%2F1077710",
//         },
//       ],
//     },
//     instructions:
//       "<ol><li>Place meat in a medium-size roasting pan. Sprinkle with garlic & cilantro. Season with salt & pepper.</li><li>Squeeze the juice from 1 orange & the lemon over the meat.</li><li>Slice the remaining oranges & place over the meat.</li><li>Cover & bake at 350 degrees for about 2 hours or until meat is tender.</li><li>With a slotted spoon, remove meat & drain well on paper towels.</li><li>Heat a small amount of oil in a skillet & fry meat, 1 lb at a time until brown & crispy.</li><li>Serve warm in flour tortillas garnished with cheese, salsa, & guacamole.</li><li>YIELD: 12-16 servings</li></ol>",
//     analyzedInstructions: [
//       {
//         name: "",
//         steps: [
//           {
//             number: 1,
//             step: "Place meat in a medium-size roasting pan.",
//             ingredients: [
//               {
//                 id: 1065062,
//                 name: "meat",
//                 localizedName: "meat",
//                 image: "whole-chicken.jpg",
//               },
//             ],
//             equipment: [
//               {
//                 id: 404629,
//                 name: "roasting pan",
//                 localizedName: "roasting pan",
//                 image: "roasting-pan.jpg",
//               },
//             ],
//           },
//           {
//             number: 2,
//             step: "Sprinkle with garlic & cilantro. Season with salt & pepper.Squeeze the juice from 1 orange & the lemon over the meat.Slice the remaining oranges & place over the meat.Cover & bake at 350 degrees for about 2 hours or until meat is tender.With a slotted spoon, remove meat & drain well on paper towels.",
//             ingredients: [
//               {
//                 id: 1102047,
//                 name: "salt and pepper",
//                 localizedName: "salt and pepper",
//                 image: "salt-and-pepper.jpg",
//               },
//               {
//                 id: 11165,
//                 name: "cilantro",
//                 localizedName: "cilantro",
//                 image: "cilantro.png",
//               },
//               {
//                 id: 9200,
//                 name: "orange",
//                 localizedName: "orange",
//                 image: "orange.png",
//               },
//               {
//                 id: 11215,
//                 name: "garlic",
//                 localizedName: "garlic",
//                 image: "garlic.png",
//               },
//               {
//                 id: 1019016,
//                 name: "juice",
//                 localizedName: "juice",
//                 image: "apple-juice.jpg",
//               },
//               {
//                 id: 9150,
//                 name: "lemon",
//                 localizedName: "lemon",
//                 image: "lemon.png",
//               },
//               {
//                 id: 1065062,
//                 name: "meat",
//                 localizedName: "meat",
//                 image: "whole-chicken.jpg",
//               },
//             ],
//             equipment: [
//               {
//                 id: 404636,
//                 name: "slotted spoon",
//                 localizedName: "slotted spoon",
//                 image: "slotted-spoon.jpg",
//               },
//               {
//                 id: 405895,
//                 name: "paper towels",
//                 localizedName: "paper towels",
//                 image: "paper-towels.jpg",
//               },
//               {
//                 id: 404784,
//                 name: "oven",
//                 localizedName: "oven",
//                 image: "oven.jpg",
//               },
//             ],
//             length: {
//               number: 120,
//               unit: "minutes",
//             },
//           },
//           {
//             number: 3,
//             step: "Heat a small amount of oil in a skillet & fry meat, 1 lb at a time until brown & crispy.",
//             ingredients: [
//               {
//                 id: 1065062,
//                 name: "meat",
//                 localizedName: "meat",
//                 image: "whole-chicken.jpg",
//               },
//               {
//                 id: 4582,
//                 name: "cooking oil",
//                 localizedName: "cooking oil",
//                 image: "vegetable-oil.jpg",
//               },
//             ],
//             equipment: [
//               {
//                 id: 404645,
//                 name: "frying pan",
//                 localizedName: "frying pan",
//                 image: "pan.png",
//               },
//             ],
//           },
//           {
//             number: 4,
//             step: "Serve warm in flour tortillas garnished with cheese, salsa, & guacamole.",
//             ingredients: [
//               {
//                 id: 10218364,
//                 name: "flour tortilla",
//                 localizedName: "flour tortilla",
//                 image: "flour-tortilla.jpg",
//               },
//               {
//                 id: 1009037,
//                 name: "guacamole",
//                 localizedName: "guacamole",
//                 image: "guacamole.jpg",
//               },
//               {
//                 id: 1041009,
//                 name: "cheese",
//                 localizedName: "cheese",
//                 image: "cheddar-cheese.png",
//               },
//               {
//                 id: 6164,
//                 name: "salsa",
//                 localizedName: "salsa",
//                 image: "salsa.png",
//               },
//             ],
//             equipment: [],
//           },
//         ],
//       },
//     ],
//     report: null,
//     tips: {
//       health: [
//         "Before you pass up garlic because you don't want the bad breath that comes with it, keep in mind that the compounds that cause garlic breath also offer a lot of health benefits. Garlic has anti-inflammatory, antioxidant, antibacterial, and antiviral properties. If you really want to get the most health benefits out of your garlic, choose Spanish garlic, which contains the most allicin (one of garlic's most beneficial compounds).",
//         'Be conscious of your choice of <a href="https://spoonacular.com/academy/vegetable-oil">cooking oils</a>. Some studies have shown that vegetable oils like safflower oil, sunflower oil, and canola oil might actually <a href="http://www.ctvnews.ca/health/some-vegetable-oils-may-increase-risk-of-heart-disease-1.1537586">contribute to heart disease</a>. Olive oil is a good alternative for low temperature cooking, while coconut oil is a recent favorite for high temperature cooking. Do your research!',
//         'Although the body needs salt to survive, most of us get too much. The problem with consuming too much salt (what chemists call "sodium chloride") is actually the <a href="https://spoonacular.com/academy/sodium">sodium</a> part, which is why people concerned about high blood pressure go on low-sodium diets. If you are trying to reduce salt in your diet, you can try salt substitutes like potassium chloride or try to make do with less salt by using more black pepper, herbs, and spices.',
//       ],
//       price: [
//         'If you find meat (especially grassfed and/or organic meat!) on sale, stock up and <a href"http://www.foodsafety.gov/keep/charts/storagetimes.html">freeze it</a>. Ground meat will stay good 3-4 months, while steaks, chops, etc., will be fine for at least 4 months.',
//         "Most dairy products stay good well past their sell-by date. Instead of throwing out perfectly safe food that is just a few days or maybe even a week or two old, make sure the product smells fine, has a normal texture, and doesn't taste funny. Sniff testing isn't exactly rocket science and it can keep you from wasting food (and money).",
//       ],
//       cooking: [
//         "Here's a trick for peeling garlic quickly. Put the garlic clove on your cutting board. Take a knife with a thick blade and place the blade flat across the garlic clove (the clove should be closer to the handle than the middle of the blade). Whack down on the flat side of the blade with your free hand to smoosh the garlic a bit. Done correctly, the skin will peel right off.",
//         "The average fresh lemon contains between 2 to 3 tablespoons of lemon juice (just in case you are substituting bottled lemon juice).",
//       ],
//       green: [
//         'Choose organic, grassfed beef whenever possible. If you\'re worried about your grocery budget, try eating a few <a href="http://spoonacular.com/vegetarian+dinner">vegetarian meals</a> so you can afford better meat!',
//         "According to the Non-GMO Project, about 90% of the canola oil in the United States is made from genetically modified rapeseed, so if this issue is important to you be sure to buy certified organic or certified GMO-free canola oil!",
//         "Did you know you can freeze shredded cheese? If you don't finish it up, don't throw it out!",
//       ],
//     },
//     openLicense: 2,
//     suspiciousDataScore: 0.0,
//     approved: 2,
//     unknownIngredients: [],
//     userTags: [],
//     originalId: null,
//     spoonacularSourceUrl: "https://spoonacular.com/mexican-carnitas-651575",
//   },
//   {
//     vegetarian: false,
//     vegan: false,
//     glutenFree: true,
//     dairyFree: false,
//     veryHealthy: false,
//     cheap: false,
//     veryPopular: true,
//     sustainable: false,
//     lowFodmap: false,
//     weightWatcherSmartPoints: 14,
//     gaps: "no",
//     preparationMinutes: 25,
//     cookingMinutes: 40,
//     aggregateLikes: 503,
//     healthScore: 22,
//     creditsText: "Jen West",
//     sourceName: "Pink When",
//     pricePerServing: 263.47,
//     extendedIngredients: [
//       {
//         id: 5062,
//         aisle: "Meat",
//         image: "chicken-breasts.png",
//         consistency: "SOLID",
//         name: "chicken breasts",
//         nameClean: "chicken breast",
//         original: "4 boneless chicken breasts",
//         originalName: "boneless chicken breasts",
//         amount: 4.0,
//         unit: "",
//         meta: ["boneless"],
//         measures: {
//           us: {
//             amount: 4.0,
//             unitShort: "",
//             unitLong: "",
//           },
//           metric: {
//             amount: 4.0,
//             unitShort: "",
//             unitLong: "",
//           },
//         },
//       },
//       {
//         id: 9144,
//         aisle: "Produce",
//         image: "jackfruit.jpg",
//         consistency: "SOLID",
//         name: "monterrey jack",
//         nameClean: "jackfruit",
//         original: "2 cups shredded Monterrey Jack",
//         originalName: "shredded Monterrey Jack",
//         amount: 2.0,
//         unit: "cups",
//         meta: ["shredded"],
//         measures: {
//           us: {
//             amount: 2.0,
//             unitShort: "cups",
//             unitLong: "cups",
//           },
//           metric: {
//             amount: 330.0,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//       {
//         id: 6016,
//         aisle: "Canned and Jarred",
//         image: "cream-of-chicken-soup.jpg",
//         consistency: "LIQUID",
//         name: "cream of chicken soup",
//         nameClean: "condensed cream of chicken soup",
//         original: "1 (10oz) cream of chicken soup",
//         originalName: "cream of chicken soup",
//         amount: 10.0,
//         unit: "oz",
//         meta: [],
//         measures: {
//           us: {
//             amount: 10.0,
//             unitShort: "oz",
//             unitLong: "ounces",
//           },
//           metric: {
//             amount: 283.495,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//       {
//         id: 6147,
//         aisle: "Canned and Jarred",
//         image: "cream-of-mushroom-soup.png",
//         consistency: "LIQUID",
//         name: "cream of mushroom soup",
//         nameClean: "condensed cream of mushroom soup",
//         original: "1 (10oz) cream of mushroom soup",
//         originalName: "cream of mushroom soup",
//         amount: 10.0,
//         unit: "oz",
//         meta: [],
//         measures: {
//           us: {
//             amount: 10.0,
//             unitShort: "oz",
//             unitLong: "ounces",
//           },
//           metric: {
//             amount: 283.495,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//       {
//         id: 11282,
//         aisle: "Produce",
//         image: "brown-onion.png",
//         consistency: "SOLID",
//         name: "onion",
//         nameClean: "onion",
//         original: "1 onion, finely chopped",
//         originalName: "onion, finely chopped",
//         amount: 1.0,
//         unit: "",
//         meta: ["finely chopped"],
//         measures: {
//           us: {
//             amount: 1.0,
//             unitShort: "",
//             unitLong: "",
//           },
//           metric: {
//             amount: 1.0,
//             unitShort: "",
//             unitLong: "",
//           },
//         },
//       },
//       {
//         id: 20444,
//         aisle: "Pasta and Rice",
//         image: "uncooked-white-rice.png",
//         consistency: "SOLID",
//         name: "rice",
//         nameClean: "rice",
//         original: "1 cup uncooked rice",
//         originalName: "uncooked rice",
//         amount: 1.0,
//         unit: "cup",
//         meta: ["uncooked"],
//         measures: {
//           us: {
//             amount: 1.0,
//             unitShort: "cup",
//             unitLong: "cup",
//           },
//           metric: {
//             amount: 185.0,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//       {
//         id: 6164,
//         aisle: "Pasta and Rice;Ethnic Foods",
//         image: "salsa.png",
//         consistency: "SOLID",
//         name: "salsa",
//         nameClean: "salsa",
//         original: "1 cup salsa",
//         originalName: "salsa",
//         amount: 1.0,
//         unit: "cup",
//         meta: [],
//         measures: {
//           us: {
//             amount: 1.0,
//             unitShort: "cup",
//             unitLong: "cup",
//           },
//           metric: {
//             amount: 260.0,
//             unitShort: "ml",
//             unitLong: "milliliters",
//           },
//         },
//       },
//       {
//         id: 1001009,
//         aisle: "Cheese",
//         image: "shredded-cheddar.jpg",
//         consistency: "SOLID",
//         name: "cheddar cheese",
//         nameClean: "shredded cheddar cheese",
//         original: "2 cups shredded Cheddar Cheese",
//         originalName: "shredded Cheddar Cheese",
//         amount: 2.0,
//         unit: "cups",
//         meta: ["shredded"],
//         measures: {
//           us: {
//             amount: 2.0,
//             unitShort: "cups",
//             unitLong: "cups",
//           },
//           metric: {
//             amount: 226.0,
//             unitShort: "g",
//             unitLong: "grams",
//           },
//         },
//       },
//     ],
//     id: 715438,
//     title: "Mexican Casserole",
//     readyInMinutes: 65,
//     servings: 6,
//     sourceUrl: "http://www.pinkwhen.com/mexican-casserole/",
//     image: "https://spoonacular.com/recipeImages/715438-556x370.jpg",
//     imageType: "jpg",
//     summary:
//       'The recipe Mexican Casserole could satisfy your Mexican craving in about <b>1 hour and 5 minutes</b>. This main course has <b>581 calories</b>, <b>48g of protein</b>, and <b>21g of fat</b> per serving. This recipe serves 6 and costs $2.63 per serving. It is brought to you by Pink When. 503 people were impressed by this recipe. It will be a hit at your <b>Autumn</b> event. A mixture of cheddar cheese, monterrey jack, salsa, and a handful of other ingredients are all it takes to make this recipe so scrumptious. It is a good option if you\'re following a <b>gluten free</b> diet. Overall, this recipe earns a <b>spectacular spoonacular score of 88%</b>. Try <a href="https://spoonacular.com/recipes/mexican-casserole-1620683">Mexican Casserole</a>, <a href="https://spoonacular.com/recipes/mexican-casserole-513196">Mexican Casserole</a>, and <a href="https://spoonacular.com/recipes/mexican-casserole-703344">Mexican Casserole</a> for similar recipes.',
//     cuisines: ["Mexican"],
//     dishTypes: ["side dish", "lunch", "main course", "main dish", "dinner"],
//     diets: ["gluten free"],
//     occasions: ["fall", "winter"],
//     winePairing: {
//       pairedWines: ["pinot noir", "riesling", "sparkling rose"],
//       pairingText:
//         "Pinot Noir, Riesling, and Sparkling rosé are my top picks for Mexican. Acidic white wines like riesling or low-tannin reds like pinot noir can work well with Mexican dishes. Sparkling rosé is a safe pairing too. The Bodegas Naveran Brut Vintage Rosado with a 4.9 out of 5 star rating seems like a good match. It costs about 18 dollars per bottle.",
//       productMatches: [
//         {
//           id: 477090,
//           title: "Bodegas Naveran Brut Vintage Rosado",
//           description:
//             "An elegant premium Cava offeringbright citrus aromas and flavors,along with delicate, fine bubbles thatare the hallmark of a superbsparkling wine.FOOD PAIRINGS: This Naveran Brut Rosado will pair with soft cheeses, fresh fruit, white meats (pork and chicken) and even richly flavored red meats. This Cava is great for sipping on its own, especially for receptions and other “standing up” events.",
//           price: "$17.989999771118164",
//           imageUrl:
//             "https://spoonacular.com/productImages/477090-312x231.jpg",
//           averageRating: 0.9800000190734863,
//           ratingCount: 6.0,
//           score: 0.927368440126118,
//           link: "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fbodegas-naveran-brut-vintage-rosado-2017%2F553303",
//         },
//       ],
//     },
//     instructions:
//       "Take a large pot and ring water to a boil. When finished, place you chicken breasts in to boil for 20 minutes or until cooked. Take a smaller pan and cook rice as directed. Allow both rice and chicken time to cool when once fully cooked. Heat over to 350 degrees. Take cooled chicken breasts and shred, or cut into bite size pieces. Add into a large mixing bowl. Stir in cooked rice, 2 cups of Monterrey Jack cheese, and 1 cup of Cheddar. Stir in both soups, chopped onion, and salsa.Take a 9 x 13 baking dish and coat with non stick spray. Place mixture into the 9 x 13 dish and cover with the remaining cup of cheddar cheese. Bake for 40 minutes. Allow to cool before serving.",
//     analyzedInstructions: [
//       {
//         name: "",
//         steps: [
//           {
//             number: 1,
//             step: "Take a large pot and ring water to a boil. When finished, place you chicken breasts in to boil for 20 minutes or until cooked. Take a smaller pan and cook rice as directed. Allow both rice and chicken time to cool when once fully cooked.",
//             ingredients: [
//               {
//                 id: 5062,
//                 name: "chicken breast",
//                 localizedName: "chicken breast",
//                 image: "chicken-breasts.png",
//               },
//               {
//                 id: 5006,
//                 name: "whole chicken",
//                 localizedName: "whole chicken",
//                 image: "whole-chicken.jpg",
//               },
//               {
//                 id: 14412,
//                 name: "water",
//                 localizedName: "water",
//                 image: "water.png",
//               },
//               {
//                 id: 20444,
//                 name: "rice",
//                 localizedName: "rice",
//                 image: "uncooked-white-rice.png",
//               },
//             ],
//             equipment: [
//               {
//                 id: 404645,
//                 name: "frying pan",
//                 localizedName: "frying pan",
//                 image: "pan.png",
//               },
//               {
//                 id: 404752,
//                 name: "pot",
//                 localizedName: "pot",
//                 image: "stock-pot.jpg",
//               },
//             ],
//             length: {
//               number: 20,
//               unit: "minutes",
//             },
//           },
//           {
//             number: 2,
//             step: "Heat over to 350 degrees. Take cooled chicken breasts and shred, or cut into bite size pieces.",
//             ingredients: [
//               {
//                 id: 5062,
//                 name: "chicken breast",
//                 localizedName: "chicken breast",
//                 image: "chicken-breasts.png",
//               },
//             ],
//             equipment: [],
//           },
//           {
//             number: 3,
//             step: "Add into a large mixing bowl. Stir in cooked rice, 2 cups of Monterrey Jack cheese, and 1 cup of Cheddar. Stir in both soups, chopped onion, and salsa.Take a 9 x 13 baking dish and coat with non stick spray.",
//             ingredients: [
//               {
//                 id: 10220445,
//                 name: "cooked rice",
//                 localizedName: "cooked rice",
//                 image: "uncooked-white-rice.png",
//               },
//               {
//                 id: 1001025,
//                 name: "monterey jack cheese",
//                 localizedName: "monterey jack cheese",
//                 image: "shredded-cheese-white.jpg",
//               },
//               {
//                 id: 1009,
//                 name: "cheddar cheese",
//                 localizedName: "cheddar cheese",
//                 image: "cheddar-cheese.png",
//               },
//               {
//                 id: 11282,
//                 name: "onion",
//                 localizedName: "onion",
//                 image: "brown-onion.png",
//               },
//               {
//                 id: 6164,
//                 name: "salsa",
//                 localizedName: "salsa",
//                 image: "salsa.png",
//               },
//             ],
//             equipment: [
//               {
//                 id: 404646,
//                 name: "baking pan",
//                 localizedName: "baking pan",
//                 image: "roasting-pan.jpg",
//               },
//               {
//                 id: 405907,
//                 name: "mixing bowl",
//                 localizedName: "mixing bowl",
//                 image: "mixing-bowl.jpg",
//               },
//             ],
//           },
//           {
//             number: 4,
//             step: "Place mixture into the 9 x 13 dish and cover with the remaining cup of cheddar cheese.",
//             ingredients: [
//               {
//                 id: 1009,
//                 name: "cheddar cheese",
//                 localizedName: "cheddar cheese",
//                 image: "cheddar-cheese.png",
//               },
//             ],
//             equipment: [],
//           },
//           {
//             number: 5,
//             step: "Bake for 40 minutes. Allow to cool before serving.",
//             ingredients: [],
//             equipment: [
//               {
//                 id: 404784,
//                 name: "oven",
//                 localizedName: "oven",
//                 image: "oven.jpg",
//               },
//             ],
//             length: {
//               number: 40,
//               unit: "minutes",
//             },
//           },
//         ],
//       },
//     ],
//     report: null,
//     tips: {
//       health: [
//         "Many people will tell you to remove the skin on your chicken to cut down on fat. This is true, but if you like the taste, leave it on! You're only gaining a little fat for a lot of flavor. Plus, a little over half of the fat in chicken skin is monounsatured fat (that's a heart-healthy kind) and the notion that saturated fat is unhealthy is being <a href=\"http://www.nhs.uk/news/2014/03March/Pages/Saturated-fats-and-heart-disease-link-unproven.aspx\">questioned</a> too. So in our opinion: dig in, skin and all!",
//         'When buying canned soup, look for low-sodium versions to cut down on unnecessary <a href="https://spoonacular.com/academy/sodium">sodium</a>.',
//       ],
//       price: [
//         'If you find meat (especially grassfed and/or organic meat!) on sale, stock up and <a href"http://www.foodsafety.gov/keep/charts/storagetimes.html">freeze it</a>. Ground meat will stay good 3-4 months, while steaks, chops, etc., will be fine for at least 4 months.',
//         "Most dairy products stay good well past their sell-by date. Instead of throwing out perfectly safe food that is just a few days or maybe even a week or two old, make sure the product smells fine, has a normal texture, and doesn't taste funny. Sniff testing isn't exactly rocket science and it can keep you from wasting food (and money).",
//       ],
//       cooking: [
//         'If you normally <a href="http://www.npr.org/blogs/thesalt/2013/08/31/216948010/dont-panic-your-questions-on-not-washing-raw-chickens">rinse your chicken</a>?stop! You could be spreading bacteria around your kitchen and it isn\'t really necessary.',
//         "To keep your eyes from stinging and watering while cutting onions, trying popping the onion in the freezer for 15 minutes before you plan to start cooking. Chilling the onion slows the release of the enzyme responsible for teary eyes.",
//         'You should not store your onions with your potatoes because the gases they emit will make each other spoil faster. For more information about selecting and storing onions, check out <a href="https://spoonacular.com/academy/onions">this lesson about onions</a> in the academy.',
//       ],
//       green: [
//         'Choose pasture-raised chicken if it is available. If it is not at your supermarket, visit a <a href="http://www.localharvest.org/farmers-markets/">farmers\' market</a> and ask around.',
//         "Did you know you can freeze shredded cheese? If you don't finish it up, don't throw it out!",
//       ],
//     },
//     openLicense: 2,
//     suspiciousDataScore: 0.0,
//     approved: 2,
//     unknownIngredients: [],
//     userTags: [],
//     originalId: null,
//     spoonacularSourceUrl: "https://spoonacular.com/mexican-casserole-715438",
//   },
// ];
