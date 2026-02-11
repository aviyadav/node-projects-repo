const http = require('http');

const routes = require('./routes');


// const server = http.createServer(routes); // for option 1
const server = http.createServer(routes.handler); // for option 2, 3, 4

console.log(routes.someText);

server.listen(3000);
