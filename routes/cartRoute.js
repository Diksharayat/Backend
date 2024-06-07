const express= require("express");
const { add_to_cart, get_cart_items, increment_quantity, decrement_quantity, delete_item, productsController, placeOrderControlller } = require("../controllers/cartController");
const cart_route = express.Router();

cart_route.post("/placeOrder",placeOrderControlller);
cart_route.get("/products",productsController);

cart_route.get('/cart',get_cart_items);
 cart_route.post('/cart/increment', increment_quantity);
cart_route.post('/cart/decrement', decrement_quantity);
cart_route.delete('/cart/delete', delete_item);



 module.exports=cart_route;