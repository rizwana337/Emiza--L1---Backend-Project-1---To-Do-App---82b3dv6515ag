const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);

module.exports = router;



// const express = require("express");

// const { loginUser, signupUser } = require("../controllers/userControllers");

// const router = express.Router();

// router.get("/login", loginUser);
// router.post("/signup", signupUser)

// module.exports = router;
