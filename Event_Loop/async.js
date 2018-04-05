const https = require('https');

const start = Date.now();

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

// using OS's async features
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
