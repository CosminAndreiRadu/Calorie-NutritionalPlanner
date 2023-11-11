const express = require('express')
const router = express.Router()

const {validateToken} = require("../middlewares/AuthMiddleware")

const {Profiles} = require('../models')


router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const profile = await Profiles.findOne({where: {UserId : userId}});
    if (!profile) return res.json()
    else res.json(profile);


}); 


router.put('/:userId', async (req,res) => {
    const userId = req.params.userId;
    const {age, weight, activeStatus} = req.body;

    const profile = await Profiles.findOne({where: {UserId : userId}});
    profile.age = age;
    profile.weight = weight;
    profile.activeStatus = activeStatus;

    let BMR = 0;

    if (profile.gender === "male") {
        BMR += 10* profile.weight + 6.25 * profile.height - 5* profile.age + 5;
    } else {
        BMR += 10* profile.weight + 6.25 * profile.height - 5* profile.age - 161;
    }

    switch (profile.metabolismType) {
        case "endomorph":
            BMR *= 0.95;
            break;
        case "mezomorph":
            BMR *= 1;
            break;
        case "ectomorph":
            BMR *= 1.05;
            break;
    }

    let activityScore = 0;
    switch (profile.activeStatus) {
        case "less":
            activityScore = 1.2;
            break;
        case "weekly":
            activityScore = 1.27;
            break;
        case "2-3/week":
            activityScore = 1.375;
            break;
        case "4-5/week":
            activityScore = 1.55;
            break;
        case "daily":
            activityScore = 1.725;
            break;
        case "performance":
            activityScore = 1.9;
            break;
    }
    profile.score = parseFloat(BMR * activityScore) ;
    await profile.save();
    res.json(profile);

});



router.post("/", validateToken , async (req, res) => {
    const { name, age, gender, height, weight, activeStatus, metabolismType, constraints, score,userId} = req.body;
    const profile = {name: name, age: age, gender: gender, height: height, weight: weight, activeStatus: activeStatus, metabolismType: metabolismType, constraints: constraints, score: score, UserId: userId };
        
    

    let BMR = 0;

    if (profile.gender === "male") {
        BMR += 10* profile.weight + 6.25 * profile.height - 5* profile.age + 5;
    } else {
        BMR += 10* profile.weight + 6.25 * profile.height - 5* profile.age - 161;
    }

    switch (profile.metabolismType) {
        case "endomorph":
            BMR *= 0.95;
            break;
        case "mezomorph":
            BMR *= 1;
            break;
        case "ectomorph":
            BMR *= 1.05;
            break;
    }

    let activityScore = 0;
    switch (profile.activeStatus) {
        case "less":
            activityScore = 1.2;
            break;
        case "weekly":
            activityScore = 1.27;
            break;
        case "2-3/week":
            activityScore = 1.375;
            break;
        case "4-5/week":
            activityScore = 1.55;
            break;
        case "daily":
            activityScore = 1.725;
            break;
        case "performance":
            activityScore = 1.9;
            break;
    }
    profile.score = parseFloat(BMR * activityScore) ;

    const prof = await Profiles.create(profile);
    prof.UserId = userId;
    await prof.save();
    res.json(prof);

  });


module.exports = router;