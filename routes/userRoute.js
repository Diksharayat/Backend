const express = require('express');
const user_route = express.Router();
const { registerUserController, loginUserController } = require('../controllers/userController');


user_route.post("/register",registerUserController);
user_route.post("/login",loginUserController);


 module.exports=user_route;