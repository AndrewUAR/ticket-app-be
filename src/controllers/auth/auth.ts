import { Context } from 'koa';
import JWT from 'jsonwebtoken';
import HTTP_STATUS from 'http-status-codes';

import { UserModel } from '../../models/user/User.model';
import { firstLetterUppercase } from '../../helpers/helpers';

export class Auth {
  public async create(ctx: Context): Promise<void> {
    try {
      console.log(ctx.request.body);
      const { username, password, role } = ctx.request.body;
      const user = await UserModel.findOne({ username: firstLetterUppercase(username) });
      if (user) {
        ctx.response.status = HTTP_STATUS.CONFLICT;
        ctx.body = { message: 'Username already exist'}
      } else {
        const body = {
          username: firstLetterUppercase(username),
          password,
          role
        }

        const createdUser = await UserModel.create(body);
        const userData = {
          id: createdUser._id,
          username: createdUser.username
        };

        const token = JWT.sign({data: userData}, 'testsecret', {});
        ctx.body = { message: 'User created successfully', token}
      }
    } catch (error) {
      console.log(error);
      ctx.body = error;
    }
  }

  public async login(ctx: Context): Promise<void> {
    try {
      const { username, password } = ctx.request.body;
      const user = await UserModel.findOne({ username: firstLetterUppercase(username) });
      if (!user) {
        ctx.status = HTTP_STATUS.NOT_FOUND;
        ctx.body = { message: 'Username not found' };
      } else {
        const isPasswordSame = await user.comparePassword(password);
        if (!isPasswordSame) {
          ctx.response.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
          ctx.body = { message: 'Invalid login. Check your username and password'}
        }
        const userData = { 
          id: user._id,
          username: user.username
        };

        const token = JWT.sign({data: userData}, 'testsecret', {});
        ctx.body = { message: 'Login successful', token}

      }
    } catch (error) {
      ctx.body = error;
    }
  }
}