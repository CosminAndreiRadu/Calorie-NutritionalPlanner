const express = require('express')
const router = express.Router()
const { Op } = require('sequelize');


const {Products} = require('../models')
const {Ingredients} = require('../models')

router.get('/', async (req, res) => {
    const listOfProducts = await Products.findAll()
    // listOfIngredients.forEach((ingredient, index) => {
    //     console.log(`${index + 1}. ${ingredient.name}`);
    //   });
    res.json(listOfProducts)

});


router.post("/", async (req, res) => {
    const product = req.body;
    const listOfIngredients = await Ingredients.findAll();
    let sumOfCalories = 0;
  
    listOfIngredients.forEach((ingredient) => {
      const name = String(ingredient.name);
      if (name in product.ingredients) {
        const quantity = parseFloat(product.ingredients[name]);
        const caloriesPerPortion = ingredient.caloriesPerPortion;
        sumOfCalories += quantity * caloriesPerPortion;
      }
    });
    product.totalCalories = sumOfCalories
    await Products.create(product);
    res.json(product.totalCalories);
  });

  router.post("/createAll", async (req, res) => {
    const products = req.body.products; // Assuming you have an array of ingredients in the request body
    const listOfIngredients = await Ingredients.findAll();
    const createdProducts = await Promise.all(
        products.map(async (product) => {
            let sumOfCalories = 0;
            listOfIngredients.forEach((ingredient) => {
              const name = String(ingredient.name);
              if (name = product.ingredients) {
                const quantity = parseFloat(product.ingredients[name]);
                const caloriesPerPortion = ingredient.caloriesPerPortion;
                sumOfCalories += quantity * caloriesPerPortion;
              }
            });
            product.totalCalories = sumOfCalories
            const createdProduct = await Products.create(product);
            return createdProduct;
        })
    );
    
    res.json(createdProducts);
});

  router.delete("/delete/:name", async (req, res) => {
    const productName = req.params.name;

    const product = await Products.findOne({
        where: {name : productName}
    });
    await product.destroy();
    res.json("Delete product: "+ productName+ " Worked");
});

router.get("/find/:name", async (req, res) => {
    const productName = req.params.name;
    const product = await Products.findOne({
       where: {name : productName} 
    });

    res.json(product)
});

router.get("/findById/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await Products.findOne({
       where: {id : productId} 
    });

    res.json(product)
});
  
router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Products.findByPk(id);
  res.json(product);
});

router.get('/getIngredientsFromProduct/:id', async (req, res) => {
  const prodId = req.params.id;
    const product = await Products.findOne({
       where: {id : prodId} 
    });
   const usedIngredients = Object.keys(product.ingredients);
  // const listOfIngredients = await Ingredients.findAll()
   const listOfIngredients = await Ingredients.findAll({
    where: { name: { [Op.in]: usedIngredients}}
   });
   res.json(listOfIngredients)
});

module.exports = router;