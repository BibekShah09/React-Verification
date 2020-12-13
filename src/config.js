const serverUrl = window.location.origin;

const devConfig = {
  baseUrl: 'http://localhost:8848/api/v1',
};

const prodConfig = {
  baseUrl: `${serverUrl}/api/v1`,
};

if (process.env.NODE_ENV === 'production') {
  module.exports = prodConfig;
} else {
  module.exports = devConfig;
}
