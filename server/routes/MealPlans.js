const express = require('express')
const router = express.Router()
const { Op } = require('sequelize');


const {MealPlans} = require('../models')
const {Recipes} = require('../models')
const {Profiles} = require('../models')

router.get('/all/:userId', async (req, res) => {
    const userId = req.params.userId;
    const listOfMealPlans = await MealPlans.findAll({
        where: { UserId: userId}
       });
    res.json(listOfMealPlans);

});

router.post('/generate',  async (req, res) => {
    const {recipeIds, name, type, userId} = req.body;

    const listOfRecipes = await Recipes.findAll();  
    const recipesArray = [];

    listOfRecipes.forEach((recipe) => {

      const id = recipe.id;
      if (recipeIds.includes(id)) {
        recipesArray.push(recipe);

      }
    });
    const mealPlan = {name: name, type: type, recipes: recipesArray, UserId: userId};
    const generatedMealPlan = await MealPlans.create(mealPlan);



    res.json(mealPlan);




})

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const mealPlan = await MealPlans.findByPk(id);
    res.json(mealPlan);
  });

router.get('/getRecipesFromMealPlan/:id', async (req, res) => {
    const mealPlanId = req.params.id;
    const mealPlan = await MealPlans.findOne({
         where: {id : mealPlanId} 
      });
    const recipeList = mealPlan.recipes;
    res.json(recipeList);
  });

module.exports = router;