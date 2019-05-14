const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

const Team = require('../../models/Team');

router.get('/', async (req, res) => {
  try {
    let teams = await Team.find();
    res.json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    check('team', 'Team is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const { team } = req.body;

    try {
      let newTeam = new Team({
        team
      });

      await newTeam.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
