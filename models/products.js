const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: String,
 
});

const Product = mongoose.model('foods', productSchema);

module.exports = Product;
