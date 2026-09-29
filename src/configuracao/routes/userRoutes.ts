import { Router } from 'express';
import { criar, listar, buscar, atualizar, remover } from '../../controladores/userController';

export const userRoutes = Router();

userRoutes.post('/', criar);
userRoutes.get('/', listar);
userRoutes.get('/:id', buscar);
userRoutes.put('/:id', atualizar);
userRoutes.delete('/:id', remover);
