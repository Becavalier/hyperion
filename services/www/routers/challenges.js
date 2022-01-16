const fs = require('fs');
const path = require('path');
const endPoint = '.well-known/acme-challenge';

module.exports = app => {
  app.get(`/${endPoint}/:fileName`, (req, res) => {
    const { fileName } = req.params;
    const dest = path.resolve(__dirname, `../../../public/${endPoint}`, fileName);
    res.send(fs.readFileSync(dest));
  });
};
