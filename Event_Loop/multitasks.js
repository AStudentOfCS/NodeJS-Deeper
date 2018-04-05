// Customize threadpool size can change the underlying processes occurrence
// BUT not affect to HTTPS running on OS async features
process.env.UV_THREADPOOL_SIZE = 5;

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

// HTTPS -- Running under OS async features
function doRequest() {
  https
    .request('https://www.google.com', res => {
      res.on('data', () => {});

      res.on('end', () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

// Node-crypto -- Running under threadpool
function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}

doRequest(); // HTTPS  running outside Threadpool

// FS MODULE -- Running under threadpool but TAKE TIME to interact with Hard Drive
fs.readFile('multitasks.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
});
// For example: We call 'fs.readFile'
// -> Node gets some 'stats' on the file (require Hard Drive access)
// -> HD accessed, 'stats' returned
// -> Node requests to read the file
// -> HD accessed, file contents streamed back to app
// ---> Resovle this thread

// Running under threadpool
doHash();
doHash();
doHash();
doHash();
