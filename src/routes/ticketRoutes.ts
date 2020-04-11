import Router from 'koa-router';
import { Ticket } from '../controllers/ticket/ticketController';
import { verifyToken } from '../helpers/auth';

const router = new Router();

router
  .get('/tickets', verifyToken, Ticket.prototype.getAllTickets)
  .post('/tickets', verifyToken, Ticket.prototype.addTicket)
  .patch('/tickets/:id', verifyToken, Ticket.prototype.editTicket)
  .patch('/ticket/:id', verifyToken, Ticket.prototype.closeTicket)
  .delete('/tickets/:id', verifyToken, Ticket.prototype.deleteTicket)

export default router;