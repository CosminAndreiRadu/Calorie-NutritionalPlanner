module.exports = (sequelize, DataTypes) => {
    const MealPlans = sequelize.define("MealPlans", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'name is required' },
        },

      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['cut', 'bulk', 'mantain']],
            msg: 'Invalid type',
            },
          notEmpty: { msg: 'type is required' },
        },
      },
      recipes: {
        type: DataTypes.JSON,
        allowNull: true,
      },

    });
  


    return MealPlans;
  };
  