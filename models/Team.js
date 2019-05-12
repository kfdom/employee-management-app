const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('team', TeamSchema);
