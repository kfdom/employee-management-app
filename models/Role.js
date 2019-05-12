const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('role', RoleSchema);
