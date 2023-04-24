const { https } = require('firebase-functions');
const { default: next } = require('next');
// const customNextConfig = join("src", require('next.config').distDir)

const isDev = process.env.NODE_ENV !== 'production';


const server = next({
  dev: isDev,
  //location of .next generated after running -> yarn build
  conf: {
    distDir: '.next',
    images: {
      domains: ['fantsy-net.web.app', 'firebasestorage.googleapis.com', 'europe-west3-fantsy-net.cloudfunctions.net'],
    }
  },
  // conf: customNextConfig,
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});