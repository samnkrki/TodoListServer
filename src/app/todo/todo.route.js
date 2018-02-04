import express from 'express'
import TodoController from './controller/todo.controller'

const router = express.Router()

router.route('/')
    .get(TodoController.listAll)
    .post(TodoController.create)

export default router