const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause "index.js" to be executed again but in child mode
  cluster.fork(); // create a child for  "/" route request
  cluster.fork(); // create another child for "/fast" route request
} else {
  // Im a child, Im going to act like a server and do nothing else
  const express = require('express');
  const app = express();

  // Node Server is Single Thread -- Blocking the Event Loop
  // while run 'doWork' function, server do nothing until the first request is handle
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  // using "Cluster Mode" to run this route
  app.get('/', (req, res) => {
    doWork(5000);
    res.send('Hi there');
  });

  // using "Cluster Mode" to run this route
  app.get('/fast', (req, res) => {
    res.send('Its so fast');
  });

  app.listen(3000);
}
