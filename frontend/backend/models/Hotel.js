const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Dharamshala', 'Budget', 'Premium', 'Resort'], default: 'Budget' },
    address: { type: String, required: true },
    priceRange: { type: String }, // e.g., "₹500 - ₹1000"
    amenities: [String], // e.g., "AC", "Wifi", "Parking"
    contact: { type: String },
    coordinates: {
        lat: Number,
        lng: Number
    },
    images: [String],
    bookingLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', HotelSchema);
