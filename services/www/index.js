const express = require('express');
const https = require('https');
const path = require('path');
const http = require('http');
const fs = require('fs');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const constants = require('./constants');
const useBasicAuth = require('./middlewares/basic-auth');
const expressEnforcesSSL = require('express-enforces-ssl');
const setInterfaceEntrance = require('./graphql-server');
const setupChallengesRoute = require('./routers/challenges');

const app = express();

const isProd = process.env.state === 'production';
const port = isProd ? 443 : 80;

console.info(`[info] server selected port :${port}.`);

// set common middleware / global data;
const { models } = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../..', 'db.json'), {
    encoding: 'utf8'
  }
));
global.hexoMeta = {
  Post: models.Post, Tag: models.Tag
};

// helmet;
app.use(helmet());
app.use((req, res, next) => {
  req.isProd = isProd;
  req.port = port;
  next();
});

// session;
const sess = {
  secret: constants.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: constants.COOKIE_EXPIRE_TIME },
};
if (isProd) {
  app.use(session(sess));
}
// use session;
app.use(session(sess));
useBasicAuth(app);

// set static folder;
app.use(express.static(path.resolve(__dirname, '../..', 'public')));

// error handling;
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

app.use(errorHandler);

// setup other routes;
setupChallengesRoute(app);

if (isProd) {
  // force https;
  app.enable('trust proxy');
  app.use(expressEnforcesSSL());

  // listen 80;
  http.createServer(app).listen(80);
}

// gzip compress;
app.use(compression());

// set api routes;
setInterfaceEntrance(app);

// listen port;
app.listen = function(port) {
  let server = null;

  if (isProd) {
    server = https.createServer({
      key: fs.readFileSync(constants.PATH_SSL_PRIVATE_KEY),
      cert: fs.readFileSync(constants.PATH_SSL_CERT),
    }, this);
  } else {
    server = http.createServer(this);
  }  
  return server.listen.apply(server, [port]);
};

app.listen(port);
