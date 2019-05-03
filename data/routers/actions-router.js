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
  } catch (err) {sendUserError(500, 'Project with that ID does not exist', err)}
});

router.get('/:id', async (req, res) => {
  try {
    const action = await actionDb.get(req.params.id);

    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ error: 'The project info could not be retrieved', err })
    }
  } catch (err) {sendUserError(500, 'The post info could not be retrieved.', err)}
});

router.post('/', async (req, res) => {
  try {
    const newAction =  await actionDb.insert(req.body);
    res.status(201).json(newAction);
  } catch (err) {sendUserError(500, 'Error adding Action', err)}
});


module.exports = router;
