const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const token = req.header("token");

    if (!token) return res.json({error: "Not logged in!"});

    try {
        const validToken = verify(token, "secret");
        if(validToken) {
            return next();
        }
    } catch (err) {
        return res.json({error: err});
    }
};

module.exports = {validateToken};