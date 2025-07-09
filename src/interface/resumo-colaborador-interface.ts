// src/interface/resumo-colaborador-interface.ts

export interface IPontoDia {
  data: string;
  hora_entrada: string | null;
  hora_saida: string | null;
  horas_trabalhadas: string;
}

export interface IResumoColaboradorPonto {
  nome: string;
  matricula: number;
  horas_trabalhadas_hoje: string;
  turno_aberto: boolean;
  lista_ponto: IPontoDia[];
}
