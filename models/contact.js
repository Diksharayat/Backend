const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    tastedDishes: {
        type: String,
        required: true
    },
    otherTastes: {
        type: String
    },
    request: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
