import mongoose from 'mongoose';

const ticketSchema: mongoose.Schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ticketId: { type: String },
  fullName: { type: String },
  email: { type: String },
  status: { type: String },
  department: { type: String },
  priority: { type: String },
  subject: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now()},
  closed: { type: Boolean },
  dueDate: { type: Date}
})

export default ticketSchema;