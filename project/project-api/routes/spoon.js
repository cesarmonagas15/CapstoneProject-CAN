const express = require("express")
const router = express.Router()
const axios = require('axios');
const { SPOONACULAR_API_KEY } = require('../config');



router.get('/recipes/random/:num', async (req, res) => {
    const num = req.params.num;
    try {
      const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/random?number=${num}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': SPOONACULAR_API_KEY,
        },
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
      const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': SPOONACULAR_API_KEY,
        },
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
    const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SPOONACULAR_API_KEY,
      },
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
    const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${queryStr}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SPOONACULAR_API_KEY,
      },
    });

    res.send(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching recipe data');
  }
});



  

module.exports = router


