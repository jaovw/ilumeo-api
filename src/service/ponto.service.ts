import { Ponto } from '../models/ponto';
import { Colaborador } from '../models/colaborador';
import { IPonto } from '../interface/ponto-interface';
import { tipoPontoEnum } from '../config/enum/tipo-ponto-enum';

export class PontoService {
  async create(data: IPonto) {
    const colaborador = await Colaborador.findByPk(data.id_colaborador);
    if (!colaborador) throw new Error('Colaborador não encontrado');

    if (!Object.values(tipoPontoEnum).includes(data.id_tipo))
      throw new Error('Tipo de ponto inválido');

    return Ponto.create(data);
  }

  async list() {
    return Ponto.findAll({ include: Colaborador });
  }

  async getById(id: number) {
    return Ponto.findByPk(id, { include: Colaborador });
  }

  async update(id: number, data: Partial<IPonto>) {
    const ponto = await Ponto.findByPk(id);
    if (!ponto) return null;

    if (data.id_colaborador && data.id_colaborador !== ponto.id_colaborador) {
      const novoColab = await Colaborador.findByPk(data.id_colaborador);
      if (!novoColab) throw new Error('Novo colaborador não encontrado');
    }

    if (data.id_tipo && !Object.values(tipoPontoEnum).includes(data.id_tipo))
      throw new Error('Tipo de ponto inválido');

    return ponto.update(data);
  }

  async delete(id: number) {
    const ponto = await Ponto.findByPk(id);
    if (!ponto) return null;
    await ponto.destroy();
    return ponto;
  }
}
