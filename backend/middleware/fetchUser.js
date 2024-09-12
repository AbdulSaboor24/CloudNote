const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env.local' });

const JWT_Secret = process.env.JWTSECRET

const fetchuser = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: "Please authenticate using a valid token." });
    }

    try {
        const data = jwt.verify(token, JWT_Secret);
        req.user = data.user;
        next();
    } catch (error){
        return res.status(401).send({ message: "Please authenticate using a valid token." });
    }
}

module.exports = fetchuser;