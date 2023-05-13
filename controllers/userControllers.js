const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = "newtonSchool";
const saltRounds = 10;

exports.signupUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with given Email already registered', status: 'fail' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email: email,
      password: hashedPassword,
      name: name,
      role: role
    });
    await newUser.save();

    res.status(200).json({ message: 'User SignedUp successfully', status: 'success' });
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong', status: 'fail' });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User with this E-mail does not exist !!', status: 'fail' });
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(403).json({ message: 'Invalid Password, try again !!', status: 'fail' });
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ status: 'success', token: token });
  } catch (error) {
    res.status(404).json({ message: 'Something went wrong', status: 'fail' });
  }
}

module.exports = { loginUser , signupUser };


// const Users   = require("../models/user.js");
// const jwt = require("jsonwebtoken");
// const bcrypt  = require('bcrypt');

// const saltRounds = 10;
// const JWT_SECRET = "newtonSchool";

// /*
// loginUser Controller

// Get request json file structure
//     obj =  {
//         email:email,
//         password: password,
//     }


// You need to complete the controller for user loginUser.
// you need to login the user.
// Complete the schema and to look the user schema look ../models/user.js
// password is hashed using bcrypt saving it.


// Response on different scenario

// 1. Invalid Password

// 403 Status code with 
// json = {
//         "message": 'Invalid Password, try again !!',
//         "status": 'fail'
//     }


// 2. Email Doesnot Exist

// 404 Status code with 
// json = {
//         "message": 'User with this E-mail does not exist !!',
//         "status": 'fail'
//     }

// 3. Success Login

// //JWT token that will contain payload containing { userId }
// generate a JSON web token (JWT) with the user's { userId } as the payload,
// sign it with a JWT_SECRET key, and set the expiration time to 1 hour
// //Don't change JWT_SECRET Secret Key.

// 200 Status code with 
// json = {
//   status: 'success',
//   token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.eyJ1c2VySWQiOi'
// }



// */

// const loginUser =async (req, res) => {

//     const email  = req.body.email;
//     const password = req.body.password;

//     //Write your code here.

// }



// /*

// Post request json file structure
//     obj =  {
//         name:name,
//         email:email,
//         password: password,
//         role: role
//     }


// You need to complete the controller for user signupUser.
// you need to register the user.
// If any user with given mail allready exist than throw error.
// Complete the schema and to look the user schema look ../models/user.js
// you should hash the password using bcrypt before saving it.



// Response on different scenario

// 1. On success reg

// 200 Status code with 
// json = {
//     "message": 'User SignedUp successfully',
//     "status": 'success'
// }

// 2. if user with given email all ready exist.

// 409 Status code with 
// json = {
//     "status": 'fail',
//     "message": 'User with given Email allready register'.
// }

// 3. if something went wrong

// 404 Status code with 
// json = {
//     "status": 'fail',
//     "message": 'Something went wrong'
// }

// */

// const signupUser = async (req, res) => {

//     const {email, password, name, role} = req.body;

//      //Write your code here.

// }

// module.exports = { loginUser , signupUser };

