const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const pwa =
    process.env.NODE_ENV === 'development'
        ? {}
        : withPWA({
              pwa: {
                  dest: '/public',
                  runtimeCaching,
              },
          });

module.exports = {
    reactStrictMode: true,
    ...pwa,
};
