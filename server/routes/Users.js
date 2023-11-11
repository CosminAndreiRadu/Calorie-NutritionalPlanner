const express = require('express')
const router = express.Router()
const { Profiles } = require('../models'); 

const {Users} = require('../models')

const bcrypt = require("bcrypt")

const {sign} = require('jsonwebtoken')

router.get('/:email', async (req, res) => {
    const email = req.params.email;
    const user = await Users.findOne({where: {email : email}});
    res.json(user.id);

});


router.post("/", async (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            email: email,
            password: hash,
        })
    });
    res.json("REGISTRATION SUCCESSFULL");

});


router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await Users.findOne({where: {email: email}});
    if (!user) return res.json({error: "Invalid user"});
    
    bcrypt.compare(password, user.password).then(async (match) => {
        if (!match) return res.json({error: "Incorrect password"});


        const token = sign({email: user.email, id: user.id}, "secret");

        res.json(token);
    });
    


});



module.exports = router;