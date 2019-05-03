const express = require('express');
const server = express();

server.use(express.json());




server.get('/', (req, res, next) => {
  res.send(`
  <h2>Welcome to the land of awesome<h2>
  <p>Lets do this!<p>
  `)
})


module.exports = server;


