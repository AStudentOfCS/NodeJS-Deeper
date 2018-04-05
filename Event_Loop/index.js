const express = require('express');
const app = express();

// Node Server is Single Thread -- Blocking the Event Loop
// while run 'doWork' function, server do nothing until the first request is handle
function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get('/', (req, res) => {
  doWork(5000);
  res.send('Hi there');
});

app.listen(3000);
