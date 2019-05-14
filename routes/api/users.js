const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const User = require('../../models/User');
const Team = require('../../models/Team');
const Role = require('../../models/Role');

//GET ALL USERS
router.get('/', async (req, res) => {
  try {
    User.aggregate([
      { $lookup: { from: 'teams', localField: 'team', foreignField: '_id', as: 'teamdesc' } },
      { $lookup: { from: 'roles', localField: 'role', foreignField: '_id', as: 'roledesc' } }
    ]).exec((err, newUsers) => {
      if (err) return res.status(404).json({ msg: 'User not found' });

      res.json(newUsers);
    });

    // let users = await User.find().sort({ date: -1 });

    // let promise = new Promise((resolve, reject) => {
    //   users.forEach(async (user, index) => {
    //     users[index].team = await Team.findById(user.team);
    //     users[index].role = await Role.findById(user.role);
    //     if (index === users.length - 1) {
    //       setTimeout(() => {
    //         resolve(users); // resolve
    //       }, 100);
    //     }
    //   });
    // });

    // // wait for the promise to resolve
    // let result = await promise;

    // console.log('RESULT', result);

    //res.json(result);
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
      { $lookup: { from: 'roles', localField: 'role', foreignField: '_id', as: 'roledesc' } }
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
    console.log('FILE', req.file);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, address, role, team, imageURL, id } = req.body;

    try {
      // const newTeam = await Team.findOne({ team });
      // const newRole = await Role.findOne({ role });
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
        imageURL
      });

      await newUser.save();
      return res.json(newUser._id);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
