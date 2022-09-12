// import express
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");

// create an express app = server!!!!!!!!
const server = express();
server.use(morgan("dev"));
server.use(bodyParser.json());

const logger = (req, res, next) => {
  console.log("Logging...");
  next();
};
server.use(logger);

server.get("/users", logger, (request, response) => {
  console.log("request received");
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) throw err;
    if (request.method === "GET") {
      response.send(data);
     }
    });
});

server.post("/users", (request, response) => {
  console.log("body", request.body);
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      throw err
    } else {
      response.send(data);
    };
  })
  fs.writeFile(
    "users.json", JSON.stringify(request.body), (err) => {
      response.send(request.body);
    }
  );
});


  

  



// initialize the server
server.listen(3001, () => console.log("server running on port 3001"));