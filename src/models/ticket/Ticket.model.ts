import mongoose from 'mongoose';
import ticketSchema from './Ticket.schema';
import { ITicket } from '../../interface/ticket.interface';

const ticketModel: mongoose.Model<ITicket> = mongoose.model<ITicket>('Ticket', ticketSchema, 'Ticket');
export { ticketModel as TicketModel };