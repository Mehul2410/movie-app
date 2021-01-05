// const { createServer } = require("http");
// const { parse } = require("url");
const next = require("next");
const express = require("express");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  server.get("/api/v1/movies", (req, res) => {
    return res.json({ message: "Hello World" });
  });

  server.post("/api/v1/movies", (req, res) => {
    const movie = req.body;
    console.log(JSON.stringify(movie));
    return res.json({ ...movie, createdTime: "today", autor: "mehul" });
  });
  server.patch("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;
    res.json({ message: ` updating post id;${id}` });
  });
  server.delete("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;
    res.json({ message: ` deleting post id;${id}` });
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
});
