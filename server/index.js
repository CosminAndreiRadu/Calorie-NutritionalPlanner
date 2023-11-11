const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = require("./models");


//Routers
const ingredientsRouter = require("./routes/Ingredients");
app.use("/ingredients", ingredientsRouter);
const productsRouter = require("./routes/Products");
app.use("/products", productsRouter);
const recipesRouter = require("./routes/Recipes");
app.use("/recipes", recipesRouter);
const usersRouter = require("./routes/Users");
app.use("/authentication", usersRouter);
const profilesRouter = require("./routes/Profiles");
app.use("/profiles", profilesRouter);
const mealplansRouter = require("./routes/MealPlans");
app.use("/mealplans", mealplansRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server port 3001");
    });
});



