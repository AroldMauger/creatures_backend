const mongoose = require('mongoose');

// Définition du schéma de modèle de livre //
const BookSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  });

module.exports = mongoose.model('Book', BookSchema);

