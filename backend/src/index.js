import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/tasks', taskRoutes);

app.get('/'),(req,res)=>{
  res.send({
    activeStatus:true,
    error:false,
  })
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Automatic task expiration checker
setInterval(async () => {
  try {
    await mongoose.model('Task').updateMany(
      {
        deadline: { $lt: new Date() },
        status: { $ne: 'Done' }
      },
      {
        $set: { status: 'Expired' }
      }
    );
  } catch (error) {
    console.error('Error updating expired tasks:', error);
  }
}, 60000); // Check every minute

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});