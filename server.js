const express = require('express');
const configureMiddleware = require('././data/config/middleware');


const server = express();


configureMiddleware(server);



server.get('/', (req, res, next) => {
  res.send(`
  <h2>Welcome to the land of awesome<h2>
  <p>Lets do this!<p>
  `)
})


module.exports = server;


