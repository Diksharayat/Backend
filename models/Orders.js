const mongoose = require('mongoose');

const UserOrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  orders: [{
    items: [{ 
      name: String,
      quantity: Number,
      price: Number
    }],
    total: Number
  }]
});
const Orders = mongoose.model('orders', UserOrderSchema);

module.exports = Orders;
