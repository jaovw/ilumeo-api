import { Optional } from "sequelize";
import { IPonto } from "./ponto-interface";

export interface CreatePontoDto
  extends Optional<IPonto, 'id' | 'created_at' | 'deleted_at'> {}
