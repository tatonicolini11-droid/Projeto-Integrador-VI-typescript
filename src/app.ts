import express from 'express';
import { userRoutes } from './configuracao/routes/userRoutes';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({
    mensagem: 'API funcionando',
    rotas: ['/api/users']
  });
});

app.use('/api/users', userRoutes);
