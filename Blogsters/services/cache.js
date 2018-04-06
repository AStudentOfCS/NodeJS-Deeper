const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

// PROBLEM -1- resolving
const exec = mongoose.Query.prototype.exec;

// Toggable cache
mongoose.Query.prototype.cache = function() {
  this.useCache = true;
  return this;
};

// Using 'function' keyword make 'this' refer to Query.prototype.exec
// Not using () => {}
mongoose.Query.prototype.exec = async function() {
  // modified Query prototype
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  // PROBLEM -3- resolving
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  // See if we have a value for 'key' in redis
  const cacheValue = await client.get(key);

  // If YES, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d)) // Hydrating array
      : new this.model(doc); // Hydrating model
  }

  // If NO, issue the modified query and store the result in redis
  const result = await exec.apply(this, arguments);

  // exec function returns Mongoose Documents
  // Redis handles JSON
  client.set(key, JSON.stringify(result));

  return result;
};
