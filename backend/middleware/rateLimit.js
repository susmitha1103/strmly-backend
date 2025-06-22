const rateLimit = require('express-rate-limit');

const limit = rateLimit({
  windowMs: 15*60*1000,
  max: 50,
  message:{mesage: "too many requests, please try again later"}
});

module.exports = limit;