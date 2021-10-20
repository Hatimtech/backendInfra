// Document.js
const mongoose = require('mongoose');
const DocumentSchema = new mongoose.Schema({
  bank_id: { type: String, required: true, unique: false},
  contract: { type: String, required: true},
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Document', DocumentSchema);
