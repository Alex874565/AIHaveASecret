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
    }
});

module.exports = mongoose.model('AIs', aiSchema);