const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();

// @route   POST /api/payment
// @desc    Process a payment
router.post('/', async (req, res) => {
  const { userCode, senderAccount, receiverAccount, amount } = req.body;

  try {
    const payment = new Payment({
      userCode,
      senderAccount,
      receiverAccount,
      amount
    });

    await payment.save();
    res.json({ msg: 'Payment processed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/payment/history/:userCode
// @desc    Get payment history for a user
router.get('/history/:userCode', async (req, res) => {
  try {
    console.log('Fetching payments for userCode:', req.params.userCode); // Debugging
    const payments = await Payment.find({ userCode: req.params.userCode });
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
