import { IColaborador } from '../interface/colaborador-interface';
import { Colaborador } from '../models/colaborador';

export class ColaboradorService {
  async create(data: IColaborador) {
    return Colaborador.create(data);
  }

  async list() {
    return Colaborador.findAll();
  }

  async getById(id: number) {
    return Colaborador.findByPk(id);
  }

  async update(id: number, data: Partial<IColaborador>) {
    const colaborador = await Colaborador.findByPk(id);
    if (!colaborador) return null;
    return colaborador.update(data);
  }

  async delete(id: number) {
    const colaborador = await Colaborador.findByPk(id);
    if (!colaborador) return null;
    await colaborador.destroy();      // paranoid → seta deleted_at
    return colaborador;
  }
}
