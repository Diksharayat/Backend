const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    _id: String,
    id: Number,
    name: String,
    description: String,
    price: String,
    image: String
});

module.exports = mongoose.model('Dish', dishSchema);
