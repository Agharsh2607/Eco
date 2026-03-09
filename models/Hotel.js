const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name:String,
  location:String,
  price:Number,
  rating:Number,
  co2Savings:String,
  imageUrl:String,
  tags:[String]
});

module.exports = mongoose.model('Hotel',HotelSchema);
