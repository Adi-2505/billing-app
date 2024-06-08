const mongoose = require('mongoose')

const billingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing