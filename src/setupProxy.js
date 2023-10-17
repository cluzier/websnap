const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',  // your API path
    createProxyMiddleware({
      target: 'https://catfact.ninja',  // your API server
      changeOrigin: true,
      secure: false,
    })
  );
};
