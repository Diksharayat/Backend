const express= require("express");
const { productsController, placeOrderController, getOrdersByUserIdController, categoryController, dishesController, deleteCategoryController, deleteDishController, editCategoryController, editDishController, getOrdersController, addCategoryController, addDishController } = require("../controllers/cartController");
const cart_route = express.Router();

cart_route.post("/placeOrder",placeOrderController);
cart_route.post("/add",addCategoryController);
cart_route.post("/categories/:categoryId/dishes",addDishController);
cart_route.get("/products",productsController);
cart_route.get("/category",categoryController);
cart_route.get("/categories/:categoryId/dishes",dishesController);
cart_route.put("/categories/:categoryId",editCategoryController);
cart_route.delete("/categories/:categoryId",deleteCategoryController);
cart_route.put("/dishes/:dishId",editDishController);
cart_route.delete('/dishes/:dishId', deleteDishController); 
cart_route.get('/orders/:userId', getOrdersByUserIdController);
cart_route.get('/orders', getOrdersController);

 module.exports=cart_route;