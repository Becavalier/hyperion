const fs = require('fs');
const challengeBase = '/var/www/challenges/';

module.exports = app => {
  app.get('/.well-known/acme-challenge/:fileName', (req, res) => {
    res.send(fs.readFileSync(`${challengeBase}${req.params.fileName}`));
  });
};
