module.exports = (sequelize, DataTypes) => {
    const Profiles = sequelize.define("Profiles", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'name is required' },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Age is required' },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['male', 'female']],
                msg: 'Invalid gender',
                },
            notEmpty: { msg: 'Gender is required' },
        },
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Height in cm is required' },
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Weight in cm is required' },
        },
      },
      activeStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['performance', 'daily', '2-3/week', '4-5/day', 'weekly','less']],
                msg: 'Invalid status',
                },
            notEmpty: { msg: 'Status is required' },
        },
      },
      metabolismType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['endomorph', 'mezomorph', 'ectomorph']],
                msg: 'Invalid metabolism type',
                },
            notEmpty: { msg: 'Metabolism type is required' },
        },
      },
      constraints: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

    });


  
    return Profiles;
  };
  