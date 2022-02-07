const { createProxyMiddleware } = require("http-proxy-middleware");

var backendUrl = "http://localhost:5000";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware("/api", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false, // if backendUrl is https, don't check SSL certificat
    })
  );
  app.use(
    "/BACKEND",
    createProxyMiddleware("/BACKEND", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false, // if backendUrl is https, don't check SSL certificat
    })
  );
  app.use(
    "/ClientConfiguration.js",
    createProxyMiddleware("/ClientConfiguration.js", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false,
    })
  );
  app.use(
    "/swagger",
    createProxyMiddleware("/swagger", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false,
    })
  );
  app.use(
    "/.well-known",
    createProxyMiddleware("/.well-known", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false,
    })
  );
  app.use(
    "/connect",
    createProxyMiddleware("/connect", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false,
    })
  );
  app.use(
    "/signin-oidc",
    createProxyMiddleware("/signin-oidc", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false,
    })
  );
  app.use(
    "/signin-oidc-google",
    createProxyMiddleware("/signin-oidc-google", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false,
    })
  );
  app.use(
    "/signin-oidc-test-moovapps",
    createProxyMiddleware("/signin-oidc-test-moovapps", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false,
    })
  );
  app.use(
    "/signin-oidc-statsh",
    createProxyMiddleware("/signin-oidc-statsh", {
      target: backendUrl,
      changeOrigin: true,
      logLevel: "debug",
      secure: false,
    })
  );
  app.use(
    "/hubs",
    createProxyMiddleware("/hubs", {
      target: backendUrl,
      ws: true,
      changeOrigin: true,
      logLevel: "debug",
      secure: false,
    })
  );
};
