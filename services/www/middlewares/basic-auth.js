const auth = require('basic-auth');
const crypto = require('crypto');
const querystring = require('querystring'); 

const md5 = value => crypto.createHash('md5').update(value).digest('hex');
checkCredential = credentials => 
  md5(`${credentials.name}${credentials.pass}`).toUpperCase() === '9BD727858548C1F1172381CE208A2FC6';

module.exports = (app) => {
  app.get('/auth-graphql', async (req, res, next) => {
    const { query } = req;
    // only available for "GET" currently;
    const credentials = auth(req);
    if (credentials && checkCredential(credentials)) {
      const authToken = Math.round(Math.random() * 10e10);
      req.session.authToken = authToken;
      res.redirect(302, `/graphql?${querystring.stringify(query)}`);
    } else {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="YHSPY"');
      res.json({ result: 'Access denied.' });
    }
  });
};
