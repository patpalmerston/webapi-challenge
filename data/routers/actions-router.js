const express = require('express');
const actionDb = require('../helpers/actionModel');

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

router.get('/', async (req, res) => {
  try {
    const actions = await actionDb.get();
    res.status(201).json(actions)
  } catch (err) {sendUserError(500, 'Poject with that ID does not exist', err)}
});

module.exports = router;
