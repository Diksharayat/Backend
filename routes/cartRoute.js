const express= require("express");
const { productsController, placeOrderController, getOrdersByUserIdController } = require("../controllers/cartController");
const cart_route = express.Router();

cart_route.post("/placeOrder",placeOrderController);
cart_route.get("/products",productsController);
cart_route.get('/orders/:userId', getOrdersByUserIdController);

 module.exports=cart_route;