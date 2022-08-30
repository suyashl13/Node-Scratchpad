const mongoose = require('mongoose')

const DishSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true,
    },
    type: {
        type: String,
        maxLength: 50,
        required: true,
    },
    cost: Number,
}, { timestamps: true });

module.exports = mongoose.model('dish', DishSchema);