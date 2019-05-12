const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

const Role = require('../../models/Role');

router.post(
  '/',
  [
    check('role', 'Role is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const { role } = req.body;

    try {
      let newRole = new Role({
        role
      });

      await newRole.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
