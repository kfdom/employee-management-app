const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  }
});

module.exports = Role = mongoose.model('role', RoleSchema);
