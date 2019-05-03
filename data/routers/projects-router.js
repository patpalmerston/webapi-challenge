const express = require('express');
const projDb = require('../helpers/projectModel');

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

router.get('/', async (req, res) => {
  try {
    const projects = await projDb.get();
    res.status(201).json(projects)
  } catch (err) {sendUserError(500, 'Poject with that ID does not exist', err)}
});


module.exports = router;
