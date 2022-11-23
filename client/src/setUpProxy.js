const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://172.16.132.224:5000",
      changeOrigin: true,
    })
  );
};
