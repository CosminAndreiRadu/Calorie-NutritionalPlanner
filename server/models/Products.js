module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
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
            args: [['meat', 'dairy', 'vegetables', 'carbohydrates', 'spices', 'sugars']],
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
      totalCalories: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: { msg: 'Calories number is required' },
        },
      }, 

    });
  
    return Products;

  };
  

