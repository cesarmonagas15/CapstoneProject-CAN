const express = require("express")
const router = express.Router()
const axios = require('axios');
const { SPOONACULAR_API_KEY, RAPID_SPOONACULAR_API_KEY } = require('../config');


const BASE_URL_SPOONACULAR = 'https://api.spoonacular.com/recipes/';
const BASE_URL_RAPIDAPI = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';

const HEADER_SPOONACULAR = {
  'Content-Type': 'application/json',
  'x-api-key': SPOONACULAR_API_KEY
};

const HEADER_RAPIDAPI = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': RAPID_SPOONACULAR_API_KEY,
  'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
};

router.get('/recipes/random/:num', async (req, res) => {
    const num = req.params.num;
    try {
      const apiResponse = await axios.get(`${BASE_URL_RAPIDAPI}random?number=${num}`, {
        headers:HEADER_RAPIDAPI,
      });
  
      res.send(apiResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching recipe data');
    }
  });

router.get('/recipes/:id/information', async (req, res) => {
    const id = req.params.id;
    try {
      const apiResponse = await axios.get(`${BASE_URL_RAPIDAPI}${id}/information?includeNutrition=true`, {
        headers: HEADER_RAPIDAPI,
      });
  
      res.send(apiResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching recipe data');
    }
});

router.get('/recipes/informationBulk/:ids', async (req, res) => {
  const ids = req.params.ids;
  try {
    const apiResponse = await axios.get(`${BASE_URL_RAPIDAPI}informationBulk?ids=${ids}`, {
      headers: HEADER_RAPIDAPI,
    });

    res.send(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching recipe data');
  }
});

router.get('/recipes/complexSearch', async (req, res) => {
  const params = req.query;
  let queryStr = '';
  Object.keys(params).forEach((key, index) => {
      if (params[key]) {
          queryStr += `${key}=${params[key]}${index !== Object.keys(params).length - 1 ? '&' : ''}`;
      }
  });
  
  try {
    const apiResponse = await axios.get(`${BASE_URL_RAPIDAPI}complexSearch?${queryStr}`, {
      headers: HEADER_RAPIDAPI,
    });

    res.send(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching recipe data');
  }
});



  

module.exports = router


