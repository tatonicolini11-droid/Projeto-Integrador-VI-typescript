import { Request, Response } from 'express';
import { User } from '../modelos/User';

export const criar = async (req: Request, res: Response) => {
  const { nome, email } = req.body ?? {};
  if (!nome || !email) {
    res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    return;
  }
  const user = await User.create({ nome, email });
  res.status(201).json(user);
};

export const listar = async (_req: Request, res: Response) => {
  res.json(await User.findAll({ order: [['id', 'ASC']] }));
};

export const buscar = async (req: Request, res: Response) => {
  const user = await User.findByPk(Number(req.params.id));
  if (!user) {
    res.status(404).json({ erro: 'Usuário não encontrado' });
    return;
  }
  res.json(user);
};

export const atualizar = async (req: Request, res: Response) => {
  const user = await User.findByPk(Number(req.params.id));
  if (!user) {
    res.status(404).json({ erro: 'Usuário não encontrado' });
    return;
  }
  await user.update(req.body);
  res.json(user);
};

export const remover = async (req: Request, res: Response) => {
  const removidos = await User.destroy({ where: { id: Number(req.params.id) } });
  if (removidos === 0) {
    res.status(404).json({ erro: 'Usuário não encontrado' });
    return;
  }
  res.status(204).send();
};
