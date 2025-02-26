import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  },
  status: {
    type: String,
    enum: ['To Do', 'On Progress', 'Done', 'Expired'],
    default: 'To Do'
  },
  deadline: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Middleware to automatically set status to 'Expired' if deadline has passed
taskSchema.pre('save', function(next) {
  if (this.deadline < new Date() && this.status !== 'Done') {
    this.status = 'Expired';
  }
  next();
});

export default mongoose.model('Task', taskSchema);