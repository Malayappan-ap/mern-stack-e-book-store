const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    {
      title: String,
      author: String,
      price: Number,
      format: { type: String, enum: ['ebook', 'paperback'], default: 'paperback' },
    },
  ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
