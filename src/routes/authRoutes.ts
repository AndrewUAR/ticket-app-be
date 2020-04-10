import Router from 'koa-router';
import { Auth } from '../controllers/auth/auth';

const router = new Router();

router
  .post('/register', Auth.prototype.create)
  .post('/login', Auth.prototype.login)


export default router;  