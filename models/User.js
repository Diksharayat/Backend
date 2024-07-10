
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  uname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  birthday: Date,
  gender: String,
  contact: String,
  address: String,
  city: String,
  state: String,
  zip: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
