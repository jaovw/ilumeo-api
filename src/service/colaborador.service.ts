import { IColaborador } from '../interface/colaborador-interface';
import { ColaboradorRepository } from '../repository/colaborador.repository';

export class ColaboradorService {
  private repository = new ColaboradorRepository();

  async create(data: IColaborador) {
    return this.repository.create(data);
  }

  async list() {
    return this.repository.findAll();
  }

  async getById(id: number) {
    return this.repository.findById(id);
  }

  async getByMatricula(matricula: number) {
    return this.repository.findByMatricula(matricula);
  }

  async update(id: number, data: Partial<IColaborador>) {
    return this.repository.update(id, data);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
