import express from 'express';
import { userRoutes } from './configuracao/routes/userRoutes';

export const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
