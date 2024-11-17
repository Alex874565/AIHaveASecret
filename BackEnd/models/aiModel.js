const mongoose = require('mongoose');

const aiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    hints: {
        type: String,
        required: false
    },
    total_attacks: {
        type: Number,
        required: false,
        default: 0
    },
    successful_attacks: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = mongoose.model('AIs', aiSchema);