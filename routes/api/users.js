const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

//GET ALL USERS
router.get('/', async (req, res) => {
  try {
    User.aggregate([
      { $lookup: { from: 'teams', localField: 'team', foreignField: '_id', as: 'teamdesc' } },
      { $lookup: { from: 'roles', localField: 'role', foreignField: '_id', as: 'roledesc' } },
      { $lookup: { from: 'profileimgs', localField: 'image', foreignField: '_id', as: 'filename' } }
    ]).exec((err, newUsers) => {
      if (err) return res.status(404).json({ msg: 'User not found' });
      console.log('newUsers', newUsers);
      res.json(newUsers);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//GET SINGLE USERS
router.get('/:id', async (req, res) => {
  try {
    User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      { $lookup: { from: 'teams', localField: 'team', foreignField: '_id', as: 'teamdesc' } },
      { $lookup: { from: 'roles', localField: 'role', foreignField: '_id', as: 'roledesc' } },
      { $lookup: { from: 'profileimgs', localField: 'image', foreignField: '_id', as: 'filename' } }
    ]).exec((err, newUser) => {
      if (err) return res.status(404).json({ msg: 'User not found' });
      res.json(newUser[0]);
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

//CREATE OR UPDATE USER
router.post(
  '/',
  [
    check('image', 'Profile Image is required')
      .not()
      .isEmpty(),
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('address', 'Address is required')
      .not()
      .isEmpty(),
    check('role', 'Role is required')
      .not()
      .isEmpty(),
    check('team', 'Team is required')
      .not()
      .isEmpty()
    //upload.single('userImg')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, address, role, team, image, id } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user && !id) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      if (user) {
        // Update
        const userFields = {};
        userFields.name = name;
        userFields.email = email;
        userFields.address = address;
        userFields.role = role;
        userFields.team = team;
        userFields.image = image;

        updateUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: userFields },
          { new: true }
        );

        return res.json(updateUser);
      }

      //Create
      let newUser = new User({
        name,
        email,
        address,
        role,
        team,
        image
      });

      await newUser.save();
      return res.json(newUser._id);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.delete('/:id', async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const id = req.params.id;

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not found!' }] });
    }

    User.deleteOne({ _id: mongoose.Types.ObjectId(id) }).exec();

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
