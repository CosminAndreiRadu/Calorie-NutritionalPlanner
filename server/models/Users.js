module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: 'E-mail is required' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Password is required' },
        },
      },

    });
  

    Users.associate = (models) => {
      Users.hasOne(models.Profiles, {
        onDelete: "cascade",
      });
    
      Users.hasMany(models.MealPlans, {
        onDelete: "cascade",
      });
    };
    

    return Users;
  };
  