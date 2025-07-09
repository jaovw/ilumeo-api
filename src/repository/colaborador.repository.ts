import { CreateColaboradorDto } from '../interface/create-colaborador-dto';
import { Colaborador } from '../models/colaborador';

export class ColaboradorRepository {
  async findAll() {
    return Colaborador.findAll();
  }

  async findById(id: number) {
    return Colaborador.findByPk(id);
  }

  async findByMatricula(matricula: number) {
    return Colaborador.findOne({ where: { matricula } });
  }

  async create(data: CreateColaboradorDto) {
    return Colaborador.create(data);
  }

  async update(id: number, data: Partial<Colaborador>) {
    const colaborador = await this.findById(id);
    if (!colaborador) return null;
    return colaborador.update(data);
  }

  async delete(id: number) {
    const colaborador = await this.findById(id);
    if (!colaborador) return null;
    await colaborador.destroy();
    return colaborador;
  }
}
