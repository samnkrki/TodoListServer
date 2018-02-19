import express from 'express'
import TodoRoute from './todo/todo.route'
import AuthRoute from './auth/auth.route'
const router = express.Router()

router.route('/health-check')

    .get(function (req, res, next) {

        res.json({
            msg: 'ok'
        })
    })
router.use('/todo', TodoRoute)
router.use('/auth', AuthRoute)

export default router