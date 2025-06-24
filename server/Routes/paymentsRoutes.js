const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/create-order', async (req, res) => {
    const {amount} = req.body;

    const options = {
        amount: amount*100,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
    };

    try{
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch(err) {
        res.status(500).json({error: 'Error creating razorpay order'});
    }
});

module.exports=router;