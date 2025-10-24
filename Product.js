const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,          // removes extra spaces
  },
  price: {
    type: Number,
    required: true,
    min: 0,              // price cannot be negative
  },
  category: {
    type: String,
    required: true,
    trim: true,
  }
});

module.exports = mongoose.model('Product', productSchema);
