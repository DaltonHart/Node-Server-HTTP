const http = require("http");

const server = http.createServer();

server.listen(4000, () => {
  console.log("listening...");
});

server.on("request", (request, response) => {
  // Handle request error
  request.on("error", err => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  // Handle response error
  response.on("error", err => {
    console.error(err);
  });

  // establish a route
  if (request.method === "GET" && request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello World");
  } else if (request.method === "GET" && request.url === "/status") {
    response.writeHead(200, { "Content-type": "application/json" });
    response.end(JSON.stringify({status: 'online'}));
  } else {
    response.statusCode = 404;
    response.end();
  }
});
