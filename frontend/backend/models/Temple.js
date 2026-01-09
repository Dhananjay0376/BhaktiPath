const mongoose = require('mongoose');

const TempleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true }, // e.g., "Vrindavan", "Mathura"
    description: { type: String },
    history: { type: String },
    timings: { type: String },
    aartiTimings: { type: String },
    entryRules: { type: String },
    bestTime: { type: String },
    festivals: [String],
    images: [String],
    latitude: { type: Number },
    longitude: { type: Number },
    nearbyFood: [{ type: String }], // Can be enhanced to reference FoodPlace model later
    nearbyHotels: [{ type: String }] // Can reference Hotel model later
}, { timestamps: true });

module.exports = mongoose.model('Temple', TempleSchema);
