const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./database/db.json"); // Đường dẫn tới file JSON của bạn
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = server;
