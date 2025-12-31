const mongoose = require('mongoose');

const FoodPlaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Street Food', 'Restaurant', 'Satvik Bhojan', 'Cafe'], default: 'Restaurant' },
    cuisine: [String], // e.g., "North Indian", "Sweets"
    address: { type: String, required: true },
    location: { type: String }, // e.g. "Near Banke Bihari"
    openingHours: { type: String },
    priceRange: { type: String, enum: ['$', '$$', '$$$'], default: '$$' }, // Budget, Mid, Premium
    isVeg: { type: Boolean, default: true },
    coordinates: {
        lat: Number,
        lng: Number
    },
    images: [String]
}, { timestamps: true });

module.exports = mongoose.model('FoodPlace', FoodPlaceSchema);
