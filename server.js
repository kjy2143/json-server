const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const normalizePort = require('normalize-port');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = new Date().toLocaleString();
  }
  // Continue to JSON Server router
  next();
})
server.use(router);

const port = normalizePort(process.env.PORT || 3000);
server.listen(port, () => {
  console.log(`JSON Server is running, port(${port})`);
});
