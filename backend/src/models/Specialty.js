const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  path: { type: String, default: '/shop' },
}, { timestamps: true });

module.exports = mongoose.model('Specialty', specialtySchema);
