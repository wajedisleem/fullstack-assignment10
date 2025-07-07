const express = require('express');
const router = express.Router();

// empty for assignment 10.1, Add code below for assignment 10.2


const {sequelize} = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const result = await sequelize.query('SELECT NOW()');
    res.send(`Connected: ${result[0][0].now}`);
  } catch (err) {
    res.status(500).send('Database connection failed');
  }
});



module.exports = router;