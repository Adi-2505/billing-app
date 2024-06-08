const mongoose = require('mongoose')


const usageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    matrix1: {
        type: Number,
        required: true,
    },
    matrix2: {
        type: Number,
        required: true,
    },
    matrix3: {
        type: Number,
        required: true,
    },
})

const Usage = mongoose.model('Usage', usageSchema);

module.exports = Usage;