const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env.local' });
const fetchuser = require('../middleware/fetchUser')

const JWT_Secret = process.env.JWTSECRET

// Route 1: creating a user using POST "api/auth/createUser".

router.post('/createUser', [
    body('name', 'Enter a valid Name').isLength({ min: 5}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'The Password should be atleast 8 characters long').isLength({ min: 8})
], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Checking if user has a unique email
    try {
        let user = await User.findOne({email: req.body.email})

        if(user) {
            return res.status(400).json({error: "Sorry user with this email already exists."})
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
            id: user.id
            }
        }
        const token = jwt.sign(data, JWT_Secret)
        res.json({token})

    } catch (error) {
        console.log(error.Message);
        res.status(500).send("Failed to create user");
    }
    
})


// Route 1: Authenticating a user using POST "api/auth/login".
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({error: "Invalid Credentials"});
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({error: "Invalid Credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, JWT_Secret);
        res.json({token});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Error Occurred");
    }
});

// Route 3: getting logged in user details POST "api/auth/getUser". login required
router.post('/getUser', fetchuser ,
async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Error Occurred");
    }
})
module.exports = router