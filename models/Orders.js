const mongoose = require('mongoose');

const UserOrderSchema = new mongoose.Schema({
  uname: String,
  email: String,
  address: String,
  userId: String,
  
  orders: [{
    // orderId: { type: String, required: true }, // Unique identifier for each sub-order
    items: [{ 
      name: String,
      quantity: Number,
      price: Number,
    }],
    total: Number,
    date: { type: Date, default: Date.now },
  }]
});

const Orders = mongoose.model('orders', UserOrderSchema);

module.exports = Orders;
