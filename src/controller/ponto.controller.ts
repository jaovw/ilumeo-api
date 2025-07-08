import { Request, Response } from 'express';
import { PontoService } from '../service/ponto.service';

const service = new PontoService();

export class PontoController {
  static async create(req: Request, res: Response) {
    try {
      const created = await service.create(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async list(_: Request, res: Response) {
    res.json(await service.list());
  }

  static async get(req: Request, res: Response) {
    const item = await service.getById(Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'Ponto não encontrado' });
    res.json(item);
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await service.update(Number(req.params.id), req.body);
      if (!updated) return res.status(404).json({ error: 'Ponto não encontrado' });
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const deleted = await service.delete(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Ponto não encontrado' });
    res.status(204).send();
  }
}
