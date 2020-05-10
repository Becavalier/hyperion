module.exports = {
  globDirectory: "public/",
  globPatterns: [
    '**/*.{html,json,js,css}'
  ],
  swDest: "public/sw.js",
  skipWaiting: false,
  runtimeCaching: [{
    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
    handler: 'CacheFirst',
  }, {
    urlPattern: /\.(?:html|js|css|json)$/,
    handler: 'NetworkFirst',
  }],
};