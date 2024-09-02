// server.js
const jsonServer = require('json-server');
const corsMiddleware = require('./cors-middleware'); // Ensure the path is correct

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your db.json file
const middlewares = jsonServer.defaults();

// Use default middlewares (logger, static, cors, etc.)
server.use(middlewares);

// Use the custom CORS middleware
server.use(corsMiddleware);

// Use the router
server.use(router);

// Start the server
const PORT = 7000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
