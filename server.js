const express = require('express');
const configureMiddleware = require('././data/config/middleware');
const actionsRouter = require('./data/routers/actions-router');
const projectsRouter = require('./data/routers/projects-router.js');



const server = express();


configureMiddleware(server);

server.use('/api/actions', actionsRouter )
server.use('/api/projects', projectsRouter)

server.get('/', (req, res, next) => {
  res.send(`
  <h2>Welcome to the land of awesome<h2>
  <p>Lets do this!<p>
  `)
})


module.exports = server;


