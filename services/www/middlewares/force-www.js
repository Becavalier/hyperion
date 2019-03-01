module.exports = (req, res, next) => {
  if (req.isProd && req.host.indexOf("www.") !== 0) {
    res.redirect(307, `${req.protocol}://www.${req.host}:${req.port}${req.originalUrl}`);
  } else {
    next();
  }
};
