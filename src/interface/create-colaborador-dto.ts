import { Optional } from 'sequelize';
import { IColaborador } from './colaborador-interface';

export interface CreateColaboradorDto
  extends Optional<IColaborador, 'id' | 'created_at' | 'deleted_at'> {}