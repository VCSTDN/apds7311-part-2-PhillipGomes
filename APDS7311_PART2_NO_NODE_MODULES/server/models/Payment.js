const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userCode: {
    type: String,
    required: true
  },
  senderAccount: {
    type: String,
    required: true
  },
  receiverAccount: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
