import { Context } from 'koa';
import Joi from '@hapi/joi';

import { ITicket } from '../../interface/ticket.interface';
import { TicketModel} from '../../models/ticket/Ticket.model';
import { UserModel } from '../../models/user/User.model';

export class Ticket {
  public async getAllTickets(ctx: Context): Promise<void> {
    try {
      const tickets = await TicketModel.find().sort({ created: -1});
      ctx.body = { message: 'All tickets', tickets };
    } catch (error) {
      ctx.body = error;
    }
  }

  public async addTicket(ctx: Context): Promise<void> {
    try {
      const body: ITicket = ctx.request.body;
      const schema = Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        subject: Joi.string().required(),
        description: Joi.string().required(),
        department: Joi.string().required(),
        priority: Joi.string().required()
      });
      const value: ITicket = await schema.validateAsync(body);
      const { id } = ctx.state.user;

      value.user = id;
      value.ticketId = `${Math.floor(Math.random() * 10001)}`
      const ticket = await TicketModel.create(value);
      if (ticket) {
        await UserModel.updateOne(
          {_id: id}, {$push: {tickets: {ticket: ticket._id}}}
        );
      }
      ctx.body = { message: 'Ticket added successfully', ticket };
    } catch (error) {
      ctx.body = error;
    }
  }

  public async editTicket(ctx: Context): Promise<void> {
    try {
      const body: ITicket = ctx.request.body;
      const { id } = ctx.params;
      const schema = Joi.object().keys({
        fullName: Joi.string().optional(),
        email: Joi.string().optional(),
        subject: Joi.string().optional(),
        description: Joi.string().optional(),
        department: Joi.string().optional(),
        priority: Joi.string().optional()
      });
      const value: ITicket = await schema.validateAsync(body);
      await TicketModel.updateOne({ _id: id}, value);
      ctx.body = { message: 'Ticket updated successfully.' };
    } catch (error) {
      ctx.body = error;
    }
  }
}