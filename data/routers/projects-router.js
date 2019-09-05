const express = require('express');
const projDb = require('../helpers/projectModel');

const router = express.Router();

// custom error middleware
const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

// get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await projDb.get();
    res.status(201).json(projects)
  } catch (err) {sendUserError(500, 'Poject with that ID does not exist', err)}
});

// get a project by specific id
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

// post a new project
router.post('/', async (req, res) => {
  try {
    const newProject =  await projDb.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {sendUserError(500, 'Error adding post', err)}
});

// delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await projDb.remove(req.params.id);
    if(project > 0) {
      res.status(200).json({ message: 'the project has been deleted.' })
    } else {
      res.status(404).json({ message: 'the project with that id can not be found' })
    }
  } catch (err) {sendUserError(500, 'the project could not be removed', err)}
});

// update project
router.put('/:id', async (req, res) => {
  try{
    const project = await projDb.update(req.params.id, req.body);
    if(project) {
      res.status(200).json(project)
    } else {
      res.status(404).json({ message: 'the project could not be found' })
    }
  } catch (err) {sendUserError(500, 'Error updating project!')}
});

// find the specific actions of a specific project

router.get('/actions/:projectId', (req, res) => {
  const { projectId } = req.params;
  projDb.getProjectActions(projectId)
  .then(projectAction => {
    if(projectAction === 0) {
      return sendUserError(404, 'Project has no Actions', res);
    }
    res.json(projectAction)
  })
  .catch(err => {
    return sendUserError(500, 'Database Failure', err)
  })
});


module.exports = router;
