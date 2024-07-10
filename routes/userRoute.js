const express = require('express');
const user_route = express.Router();
const { registerUserController, loginUserController, contactFormController, updateProfileDetailsController, getUserByIdController,  } = require('../controllers/userController');


user_route.post("/register",registerUserController);
user_route.post("/login",loginUserController);
user_route.post("/contact",contactFormController );
user_route.put('/update-profile', updateProfileDetailsController)
user_route.get('/user/:userId', getUserByIdController)


 module.exports=user_route;
