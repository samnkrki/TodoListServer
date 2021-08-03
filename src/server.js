import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import config from "./config/config";
import routes from "./app/server.route";

const port = config.port;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Todo-list Application");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    msg: err.message,
    stack: err.stack,
  });
});

app.listen(port, () => {
  console.log(`The todo-list server islistening on port ${port}`);
});
