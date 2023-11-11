const express = require('express')
const router = express.Router()

const {Ingredients} = require('../models')

router.get('/', async (req, res) => {
    const listOfIngredients = await Ingredients.findAll()
    // listOfIngredients.forEach((ingredient, index) => {
    //     console.log(`${index + 1}. ${ingredient.name}`);
    //   });
    res.json(listOfIngredients)
});

router.get("/find/:name", async (req, res) => {
    const ingredientName = req.params.name;
    const ingredient = await Ingredients.findOne({
       where: {name : ingredientName} 
    });

    res.json(ingredient)
});

// router.get("/findById/:id", async (req, res) => {
//     const ingredientId = req.params.id;
//     const ingredient = await Ingredients.findOne({
//        where: {id : ingredientId} 
//     });

//     res.json(ingredient["caloriesPerPortion"])
// });

router.post("/", async (req, res) => {
    const ingredient = req.body;
    await Ingredients.create(ingredient);
    res.json(ingredient);

});

router.post("/createAll", async (req, res) => {
    const ingredients = req.body.ingredients; // Assuming you have an array of ingredients in the request body
    
    const createdIngredients = await Promise.all(
        ingredients.map(async (ingredient) => {
            const createdIngredient = await Ingredients.create(ingredient);
            return createdIngredient;
        })
    );
    
    res.json(createdIngredients);
});

router.delete("/delete/:name", async (req, res) => {
    const ingredientName = req.params.name;

    const ingredient = await Ingredients.findOne({
        where: {name : ingredientName}
    });
    await ingredient.destroy();
    res.json("Delete ingredient: "+ ingredientName+ " Worked");
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const ingredient = await Ingredients.findByPk(id);
    res.json(ingredient);
});



module.exports = router;