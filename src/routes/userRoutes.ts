import Router from 'koa-router';
import { User } from '../controllers/user/userController';
import { verifyToken } from '../helpers/auth';

const router = new Router();

router.get('/user', verifyToken, User.prototype.getUser);

export default router;