import express from "express";
import jwt from "express-jwt";
import TodoController from "./controller/todo.controller";
import config from "./../../config/config";

const router = express.Router();

router
  .route("/")
  .get(jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }), TodoController.listAll)
  .post(jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }), TodoController.create);

router
  .route("/:id")
  .get(jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }), TodoController.updateState)
  .delete(jwt({ secret: config.jwtSecret, algorithms: ["HS256"] }), TodoController.remove);

export default router;
