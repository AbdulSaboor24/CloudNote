const express = require('express');
const router = express.Router();
const User = require('../models/User')

// Creating a User using: POST "/api/auth/". doesn't require auth

router.get('/', (req, res)=>{
    res.send('Hello World')
    console.log(req.body);
    const user = User(req.body)
    user.save()
})

module.exports = router