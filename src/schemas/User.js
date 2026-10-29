const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 160 },
  email: { type: String, required: true, trim: true, lowercase: true },
  conta: { type: Number, required: true, unique: true, min: 1 },
  saldoCentavos: { type: Number, required: true, min: 0, validate: Number.isSafeInteger },
}, { timestamps: true });
module.exports = mongoose.model('User', schema);
