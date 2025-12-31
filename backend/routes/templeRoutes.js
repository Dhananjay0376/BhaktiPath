const express = require('express');
const router = express.Router();
const Temple = require('../models/Temple');

// GET all temples
router.get('/', async (req, res) => {
    try {
        const temples = await Temple.find();
        res.json(temples);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one temple
router.get('/:id', async (req, res) => {
    try {
        const temple = await Temple.findById(req.params.id);
        if (!temple) return res.status(404).json({ message: 'Temple not found' });
        res.json(temple);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new temple (Admin)
router.post('/', async (req, res) => {
    const temple = new Temple(req.body);
    try {
        const newTemple = await temple.save();
        res.status(201).json(newTemple);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
