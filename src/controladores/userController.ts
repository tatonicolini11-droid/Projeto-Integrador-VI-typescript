import { Request, Response } from 'express';
import { User } from '../modelos/User';

const normalizeString = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
};

export const criar = async (req: Request, res: Response) => {
  const nome = normalizeString(req.body?.nome);
  const email = normalizeString(req.body?.email);

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

  const payload = req.body ?? {};
  const dadosAtualizados: Record<string, string> = {};

  if (typeof payload.nome !== 'undefined') {
    const nome = normalizeString(payload.nome);
    if (!nome) {
      res.status(400).json({ erro: 'Nome inválido' });
      return;
    }
    dadosAtualizados.nome = nome;
  }

  if (typeof payload.email !== 'undefined') {
    const email = normalizeString(payload.email);
    if (!email) {
      res.status(400).json({ erro: 'Email inválido' });
      return;
    }
    dadosAtualizados.email = email;
  }

  if (Object.keys(dadosAtualizados).length === 0) {
    res.status(400).json({ erro: 'Nenhum dado válido para atualizar' });
    return;
  }

  await user.update(dadosAtualizados);
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
