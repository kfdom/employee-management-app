const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const Team = require('../../models/Team');
const Role = require('../../models/Role');

//GET ALL USERS
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//GET SINGLE USERS
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, address, role, team, imageURL, id } = req.body;

    try {
      const newTeam = await Team.findOne({ team });
      const newRole = await Role.findOne({ role });
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
        userFields.role = newRole._id;
        userFields.team = newTeam._id;

        updateUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: userFields },
          { new: true }
        );

        return res.json(updateUser);
      }

      //Create
      user = new User({
        name,
        email,
        address,
        role: newRole._id,
        team: newTeam._id,
        imageURL
      });

      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
