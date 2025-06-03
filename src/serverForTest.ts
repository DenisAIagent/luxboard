import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import iaRoutes from './routes/ia';

type AppWithReady = express.Application & { ready?: Promise<void> };

const app = express() as AppWithReady;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/ia', iaRoutes);

app.ready = connectDB();

export default app;
