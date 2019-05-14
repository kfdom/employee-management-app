const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

const ProfileImage = require('../../models/ProfileImage');

router.get('/', async (req, res) => {
  try {
    let profileImg = await ProfileImage.find();
    res.json(profileImg);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    check('filename', 'Filename is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const { filename } = req.body;

    try {
      let newFile = new ProfileImage({
        filename
      });

      await newFile.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
