module.exports = {
  globDirectory: "docs/",
  globPatterns: [
    '**/*.{html,json,js,css}'
  ],
  swDest: "docs/sw.js",
  skipWaiting: true,
  runtimeCaching: [{
    urlPattern: /\.(?:png|jpg|jpeg|svg|woff2)$/,
    handler: 'CacheFirst',
  }, {
    urlPattern: /\.(?:html|js|css|json)$/,
    handler: 'NetworkFirst',
  }],
};