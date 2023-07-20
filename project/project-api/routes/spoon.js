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
  

module.exports = router


