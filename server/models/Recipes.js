module.exports = (sequelize, DataTypes) => {
    const Recipes = sequelize.define("Recipes", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: 'Name is required' },
        },
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: {
            args: [['','vegan', 'vegetarian', 'lactose-free', 'peanuts-free', 'glucose-free']],
            msg: 'Invalid category',
          },
        },
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Quantity is required' },

        },
      },
      ingredients: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      products: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      totalCalories: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: { msg: 'Calories number is required' },
        },
      }, 

    });
  
    return Recipes;

  };
  

