const express = require('express');
const crypto = require('crypto');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
  const worker = new Worker(function() {
    // inside Worker threads -- this ref threads
    this.onmessage = function() {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  // Worker Interface in our App
  worker.onmessage = function(message) {
    console.log(message);
    res.send('' + message.data);
  };

  // Worker Interface in our App
  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('Its so fast');
});

app.listen(3000);
