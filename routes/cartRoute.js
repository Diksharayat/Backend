const express= require("express");
const { productsController, placeOrderController, getOrdersByUserIdController, categoryController, dishesController, deleteCategoryController, deleteDishController, editCategoryController, editDishController } = require("../controllers/cartController");
const cart_route = express.Router();

cart_route.post("/placeOrder",placeOrderController);
cart_route.get("/products",productsController);
cart_route.get("/category",categoryController);
cart_route.get("/categories/:categoryId/dishes",dishesController);
cart_route.put("/categories/:categoryId",editCategoryController);
cart_route.delete("/categories/:categoryId",deleteCategoryController);
cart_route.put("/categories/:categoryId/dishes/:dishId",editDishController);

cart_route.delete('/dish/:categoryId/:dishId', deleteDishController); 
cart_route.get('/orders/:userId', getOrdersByUserIdController);

 module.exports=cart_route;