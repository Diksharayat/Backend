const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String, 
    required: true
  }
});

// Define Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
