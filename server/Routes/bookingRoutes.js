const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

router.post('/', async (req, res) => {
    const {
        userId,
        movieId,
        movieTitle,
        theatre,
        date,
        time,
        seats,
        amount,
        paymentId
    } = req.body;

    try{
        const booking = new Booking({
            userId,
            movieId,
            movieTitle,
            theatre,
            date,
            time,
            seats,
            amount,
            paymentId
        });

        await booking.save();
        res.status(201).json({message: 'Booking confirmed', booking});
    } catch(err){
        res.status(500).json({error: "Booking failed"});
    }
});

router.get('/user/:userId', async (req, res) => {
    try{
        const bookings = await Booking.find({userId: req.params.userId});
        res.json(bookings);
    } catch(err){
        res.status(500).json({error: 'Could not fetch bookings'});
    }
});

module.exports = router;