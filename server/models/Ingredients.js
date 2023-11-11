module.exports = (sequelize, DataTypes) => {
    const Ingredients = sequelize.define("Ingredients", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: 'Name is required' },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['meat', 'dairy', 'vegetables', 'carbohydrates', 'spices']],
            msg: 'Invalid category',
          },
        },
      },
      caloriesPerPortion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Calories per portion is required' },
        },
      }, 
      portion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['100g', 'tablespoon', 'teaspoon', 'piece']],
            msg: 'Invalid portion',
          },
        },
      },
    });
  
    return Ingredients;
  };
  