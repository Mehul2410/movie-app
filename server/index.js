// const { createServer } = require("http");
// const { parse } = require("url");
const next = require("next");
const express = require("express");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
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
