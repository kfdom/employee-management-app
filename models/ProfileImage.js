const mongoose = require('mongoose');

const ProfileImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  }
});

module.exports = ProfileImage = mongoose.model('profileImg', ProfileImageSchema);
