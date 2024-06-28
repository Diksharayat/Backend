const express= require("express");
const {get_cart_items, productsController, placeOrderControlller } = require("../controllers/cartController");
const cart_route = express.Router();

cart_route.post("/placeOrder",placeOrderControlller);
cart_route.get("/products",productsController);
cart_route.get('/cart',get_cart_items);

 module.exports=cart_route;