const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
var dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config()




const registerUserController = async (req, res) => {  
  const { uname, email, contact, password } = req.body;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  console.log(email, password, uname);

  try {


    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({ message: "user Already exists" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
   
    if (!uname || !email || !password) {
      return res.json("pls fill all the fields");
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const user = await User.create({
      uname,
      email,
      contact,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      message: "user registered",
      uname: user.uname,
      email: user.email,
      contact:user.contact,
      password: hashedPassword,
      id: user._id,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};




const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(401).json({ message: "Email and password are required" });
    }

    // Find user by email
    const userFound = await User.findOne({ email });

    // If user not found, return error
    if (!userFound) {
      return res.status(401).json({ message: "Check email and password" });
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Check Password" });
    }

    // If password matches, generate JWT token
    const token = jwt.sign(
      { userId: userFound._id, email: userFound.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with success message, token, and additional user data
    res.json({
      status: "success",
      message: "login successful",
      token: token,
      contact: userFound.contact, // Include contact information
      uname: userFound.uname // Include username
    });

  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Login failed" });
  }
};






module.exports={
  registerUserController,
  loginUserController,
 
}