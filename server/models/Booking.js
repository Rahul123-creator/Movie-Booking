const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: Number,
        required: true
    },
    movieTitle: {
        type: String,
        required: true
    },
    theatre: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: {
        type: [String],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);