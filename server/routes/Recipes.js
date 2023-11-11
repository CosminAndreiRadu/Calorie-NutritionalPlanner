const express = require('express')
const router = express.Router()
const { Op } = require('sequelize');

const {Recipes} = require('../models')
const {Products} = require('../models')
const {Ingredients} = require('../models')

router.get('/', async (req, res) => {
    const listOfRecipes = await Recipes.findAll()
    // listOfIngredients.forEach((ingredient, index) => {
    //     console.log(`${index + 1}. ${ingredient.name}`);
    //   });
    res.json(listOfRecipes)

});

router.get('/portion/:id', async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipes.findOne({
    where: {id : id}
  });
  let portion = recipe.totalCalories;
  let portions;
  switch(true) {
    case recipe.quantity >= 0.4 && recipe.quantity < 0.8:
      portions = 2;
      break;
    case recipe.quantity >= 0.8 && recipe.quantity < 1.2:
      portions = 3;
      break;
    case recipe.quantity >= 1.2 && recipe.quantity < 1.6:
      portions = 4;
      break;
    case recipe.quantity >= 1.6 && recipe.quantity < 2.0:
      portions = 5;
      break;
    case recipe.quantity >= 2.0 && recipe.quantity < 2.4:
      portions = 6;
      break;
    case recipe.quantity >= 2.4 && recipe.quantity < 2.8:
      portions = 7;
      break;
    default:
      portions = 1;
      break;
  }
  // res.json(portion/portions);

  portion = portion / portions;

  const portionObject = await {portion: portion, portions: portions};

  res.json(portionObject);

});


router.post("/", async (req, res) => {
    const recipe = req.body;
    const listOfIngredients = await Ingredients.findAll();
    const listOfProducts = await Products.findAll();
    let sumOfCalories = 0;
  
    listOfIngredients.forEach((ingredient) => {
      const name = String(ingredient.name);
      if (name in recipe.ingredients) {
        const quantity = parseFloat(recipe.ingredients[name]);
        const caloriesPerPortion = ingredient.caloriesPerPortion;
        sumOfCalories += quantity * caloriesPerPortion;
      }
    });
    listOfProducts.forEach((product) => {
        const name = String(product.name);
        if (name in recipe.products) {
          const quantity = parseFloat(recipe.products[name]);
          const caloriesPerPortion = product.totalCalories;
          sumOfCalories += quantity * caloriesPerPortion;
        }
      });
    recipe.totalCalories = sumOfCalories
    await Recipes.create(recipe);
    res.json(recipe.totalCalories);
  });

  router.post("/createAll", async (req, res) => {
    const recipes = req.body.recipes; // Assuming you have an array of ingredients in the request body
    const listOfIngredients = await Ingredients.findAll();
    const listOfProducts = await Products.findAll();
    const createdRecipes = await Promise.all(
        recipes.map(async (recipe) => {
            let sumOfCalories = 0;
            listOfIngredients.forEach((ingredient) => {
              const name = String(ingredient.name);
              if (name in recipe.ingredients) {
                const quantity = parseFloat(recipe.ingredients[name]);
                const caloriesPerPortion = ingredient.caloriesPerPortion;
                sumOfCalories += quantity * caloriesPerPortion;
              }
            });
            listOfProducts.forEach((product) => {
                const name = String(product.name);
                if (name in recipe.products) {
                  const quantity = parseFloat(recipe.products[name]);
                  const caloriesPerPortion = product.caloriesPerPortion;
                  sumOfCalories += quantity * caloriesPerPortion;
                }
              });
            recipe.totalCalories = sumOfCalories
            const createdRecipes = await Recipes.create(recipe);
            return createdRecipes;
        })
    );
    
    res.json(createdProducts);
});

  router.delete("/delete/:name", async (req, res) => {
    const recipeName = req.params.name;

    const recipe = await Recipes.findOne({
        where: {name : recipeName}
    });
    await recipe.destroy();
    res.json("Delete recipe: "+ recipeName + " Worked");
});

router.get("/find/:name", async (req, res) => {
    const recipeName = req.params.name;
    const recipe = await Recipes.findOne({
       where: {name : recipeName} 
    });

    res.json(recipe)
});

router.get("/findById/:id", async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await Recipes.findOne({
       where: {id : recipeId} 
    });

    res.json(recipe)
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipes.findByPk(id);
  res.json(recipe);
});
  
router.get('/getIngredientsFromRecipe/:id', async (req, res) => {
  const recipeId = req.params.id;
    const recipe = await Recipes.findOne({
       where: {id : recipeId} 
    });
   const usedIngredients = Object.keys(recipe.ingredients);
   const listOfIngredients = await Ingredients.findAll({
    where: { name: { [Op.in]: usedIngredients}}
   });
   res.json(listOfIngredients)
});

router.get('/getProductsFromRecipe/:id', async (req, res) => {
  const recipeId = req.params.id;
    const recipe = await Recipes.findOne({
       where: {id : recipeId} 
    });
   const usedProducts = Object.keys(recipe.products);
  // const listOfIngredients = await Ingredients.findAll()
   const listOfProducts = await Products.findAll({
    where: { name: { [Op.in]: usedProducts}}
   });
   res.json(listOfProducts)
});

module.exports = router;