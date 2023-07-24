import * as React from "react"
import "./RecipeDetails.css"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import apiClient from "../../services/apiClient";


export default function RecipeDetails() {

    const {id} = useParams();
    const [recipe, setRecipe] = useState({});


    useEffect(()=> {
        const fetchRecipe = async () => {
            const {data, error}= await apiClient.getRecipeInformation(id); // recipe id
            console.log(data)
            if (data) setRecipe(data);
            if (error) console.error("Error fetching recipe:", error);
          };
          fetchRecipe();
    },[]);

    // let recipe = 
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
    //   };

      const navigate = useNavigate();
      const [checkedIngredients, setCheckedIngredients] = useState({});
      const clockIcon = <FontAwesomeIcon icon={faClock} />;
      const userIcon = <FontAwesomeIcon icon={faUser} />;
      const convertHtmlToText = (html) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        return tempElement.textContent || tempElement.innerText || '';
      };
      const formattedSummary = convertHtmlToText(recipe.summary).replace(/\.\s/g, '.\n\n');
  
      const handleIngredientCheck = (ingredientId) => {
          setCheckedIngredients((prevState) => ({
            ...prevState,
            [ingredientId]: !prevState[ingredientId],
          }));
        };

  return (
    <>
    <button className="back-button" onClick={() => navigate(-1)}>
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
    </button>

    <div className="recipe-details-container">
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <h1 className="recipe-details-recipe-title">{recipe.title}</h1>
      <hr className="recipe-title-divider"></hr>

      <div className="recipe-details-columns">

        <div className="recipe-details-col">

      <div className="recipe-summary-container">
        <p className="recipe-summary">{formattedSummary}</p>
      </div>

      <div className="serving-info">
        <ul className="serving-details">
          <li className="details-item">
            <div className="item-content">
              {clockIcon}
              <span className="value">{recipe.readyInMinutes}</span>
            </div>
            <span className="title">Minutes</span>
          </li>
          <li className="details-item">
            <div className="item-content">
              {userIcon}
              <span className="value">{recipe.servings}</span>
            </div>
            <span className="title">Servings</span>
          </li>
        </ul>
      </div>
      <div className="recipe-details-container-ingredients">
        <h3>Ingredients:</h3>
        <ul>
          {recipe.extendedIngredients?.map((ingredient) => (
            <li key={ingredient.id}>
              <label>
                <input
                  type="checkbox"
                  checked={checkedIngredients[ingredient.id] || false}
                  onChange={() => handleIngredientCheck(ingredient.id)}
                />
                {ingredient.original}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="instructions">
        <h3>Instructions:</h3>
        <p>{instructions}</p>
      </div> */}
    </div>

    <div className="recipe-details-col-tips">
        <h1>Tips</h1>
    </div>
    </div>
    </div>
    </>
  );
}