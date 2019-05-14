const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true
  }
});

module.exports = Team = mongoose.model('team', TeamSchema);
