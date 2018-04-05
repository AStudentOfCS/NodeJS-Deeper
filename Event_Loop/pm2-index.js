// Im a child, Im going to act like a server and do nothing else
const express = require('express');
const crypto = require('crypto');
const app = express();

app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('Hi there');
  });
});

app.get('/fast', (req, res) => {
  res.send('Its so fast');
});

app.listen(3000);
