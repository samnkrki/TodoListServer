import express from 'express';
import AuthController from './controllers/auth.controller';

const router = express.Router();

router.route('/register')
    /** POST /api/auth/register - register user. */
    .post(AuthController.register);

router.route('/login')
    /** POST /api/auth/login -login user */
    .post(AuthController.login);

export default router;