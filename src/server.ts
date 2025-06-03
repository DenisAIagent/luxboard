import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import iaRoutes from './routes/ia';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
export default app;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/ia', iaRoutes);

const port = process.env.PORT || 3001;

if (require.main === module) {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });
}
