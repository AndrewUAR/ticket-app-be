import mongoose from 'mongoose';

export interface ITicket extends mongoose.Document {
  user: string;
  ticketId: string;
  fullName: string;
  email: string;
  status: string;
  department: string;
  priority: string;
  subject: string;
  description: string;
  createdAt: Date;
  closed?: boolean;
  dueDate?: Date;
}