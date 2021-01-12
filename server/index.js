// const { createServer } = require("http");
// const { parse } = require("url");
const next = require("next");
const express = require("express");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const filePath = "./data.json";
const fs = require("fs");
const path = require("path");

const moviesData = require("./data.json");

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  server.get("/api/v1/movies", (req, res) => {
    return res.json(moviesData);
  });
  server.get("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;
    const movie = moviesData.find((m) => m.id === id);

    return res.json(movie);
  });

  server.post("/api/v1/movies", (req, res) => {
    //todo add id
    const movie = req.body;
    moviesData.push(movie);

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(moviesData, null, 2);
    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json("Movie has been successfuly added");
    });
  });

  server.delete("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;
    const movie = moviesData.findIndex((m) => m.id === id);
    moviesData.splice(movieIndex, 1);
    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(moviesData, null, 2);
    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json("Movie has been successfuly added");
    });
  });
});
// server.get("/faq", (req, res) => {
//   res.send(
//     `<html>
//       <head>
//         <body>
//           <h1>hello world</h1>
//         </body>
//       </head>
//     </html>`
//   );
// });

//    we are handling all of the request coming to our server by *
server.get("*", (req, res) => {
  // nextjs is handling req and providing pages wherewe are navigating
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

server.use(handle).listen(PORT, (err) => {
  if (err) throw err;
  console.log("> Ready on port " + PORT);
});
