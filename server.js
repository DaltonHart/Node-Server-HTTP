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
  if (request.method === "POST" && request.url === "/echo") {
    // start body content
    let body = [];
    request
      .on("data", chunk => {
        //load the body data and pull out check
        body.push(chunk);
      })
      .on("end", () => {
        // convert all body data into string to send with response
        body = Buffer.concat(body).toString();
        // send response with body
        response.end(body);
      });
  } else {
    response.statusCode = 404;
    response.end();
  }
});
