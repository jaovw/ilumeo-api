export interface IColaborador {
  id: number;
  nome: string;
  matricula: number;
  created_at?: Date;
  deleted_at?: Date | null;
}