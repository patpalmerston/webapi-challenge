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

router.get('/:id', async (req, res) => {
  try {
    const project = await projDb.get(req.params.id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'The project info could not be retrieved', err })
    }
  } catch (err) {sendUserError(500, 'The post info could not be retrieved.', err)}
});

router.post('/', async (req, res) => {
  try {
    const newProject =  await projDb.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {sendUserError(500, 'Error adding post', err)}
});

module.exports = router;
