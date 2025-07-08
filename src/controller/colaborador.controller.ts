import { Request, Response } from 'express';
import { ColaboradorService } from '../service/colaborador.service';

const service = new ColaboradorService();

export class ColaboradorController {
  static async create(req: Request, res: Response) {
    try {
      const created = await service.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar colaborador', details: err });
    }
  }

  static async list(_: Request, res: Response) {
    res.json(await service.list());
  }

  static async get(req: Request, res: Response) {
    const item = await service.getById(Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'Colaborador não encontrado' });
    res.json(item);
  }

  static async update(req: Request, res: Response) {
    const updated = await service.update(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: 'Colaborador não encontrado' });
    res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const deleted = await service.delete(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Colaborador não encontrado' });
    res.status(204).send();
  }
}
