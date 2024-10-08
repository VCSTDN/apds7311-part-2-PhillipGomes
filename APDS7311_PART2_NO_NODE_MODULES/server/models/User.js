const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userCode: {
    type: String,
    unique: true,
    default: function () {
      return Math.random().toString(36).substring(2, 10); // Generates random unique user code
    }
  }
});

// Encrypt password before saving
/*UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});*/

module.exports = mongoose.model('User', UserSchema);
