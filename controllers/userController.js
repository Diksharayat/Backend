const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
var dotenv = require('dotenv');
const User = require('../models/User');
const Contact = require('../models/contact');
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

    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(401).json({ message: "Check email and password" });
    }

   
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Check Password" });
    }

    const token = jwt.sign(
      { userId: userFound._id, email: userFound.email, contact: userFound.contact, 
        uname: userFound.uname  },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

  
    res.json({
      status: "success",
      message: "login successful",
      token: token,
      userId: userFound._id,
      contact: userFound.contact, 
      uname: userFound.uname 
    });

  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Login failed" });
  }
};



const updateProfileDetailsController = async (req, res) => {
  const { email } = req.body; 
  const { firstName, lastName, birthday, gender, phone, address, city, state, zip } = req.body;

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.birthday = birthday || user.birthday;
    user.gender = gender || user.gender;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.city = city || user.city;
    user.state = state || user.state;
    user.zip = zip || user.zip;

   
    const updatedUser = await user.save();

  
    res.json({
      status: "success",
      message: "Profile details updated",
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        birthday: updatedUser.birthday,
        gender: updatedUser.gender,
        phone: updatedUser.phone,
        address: updatedUser.address,
        city: updatedUser.city,
        state: updatedUser.state,
        zip: updatedUser.zip,
      },
    });

  } catch (error) {
    console.error("Error updating profile details:", error);
    res.status(500).json({ message: "Failed to update profile details" });
  }
};




const getUserByIdController = async (req, res) => {
  const { userId } = req.params;

  try {
  
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
  
    res.json({
      status: "success",
      user: {
        id: user._id,
        uname: user.uname,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        gender: user.gender,
        contact: user.contact,
        address: user.address,
        city: user.city,
        state: user.state,
        zip: user.zip
      }
     
    });
    
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};






const contactFormController = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    contact,
    tastedDishes,
    otherTastes,
    request
  } = req.body;

  try {
   
    const contacts = await Contact.create({
      firstName,
      lastName,
      email,
      contact,
      tastedDishes,
      otherTastes,
      request
    });

    res.json({
      status: "success",
      message: "Contact form submitted successfully",
      details: {
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        email: contacts.email,
        contact: contacts.phone,
        tastedDishes: contacts.tastedDishes,
        otherTastes: contacts.otherTastes,
        request: contacts.request
      }
    });

  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Failed to submit contact form" });
  }
};







module.exports={
  registerUserController,
  loginUserController,
  contactFormController,
  updateProfileDetailsController,
  getUserByIdController
 
 
}