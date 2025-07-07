import { tipoPontoEnum } from '../config/enum/tipo-ponto-enum';

export interface IPonto {
  id: number;
  id_colaborador: number;
  id_tipo: tipoPontoEnum;
  created_at?: Date;
  deleted_at?: Date | null;
}