import { Colaborador } from '../models/colaborador';
import { Ponto } from '../models/ponto';
import { IPontoDia, IResumoColaboradorPonto } from '../interface/resumo-colaborador-interface';

export async function getColaboradorResumo(matricula: number): Promise<IResumoColaboradorPonto | null> {
  const colaborador = await Colaborador.findOne({
    where: { matricula },
    include: [{
      model: Ponto,
      required: false,
      where: { deleted_at: null },
      attributes: ['id_tipo', 'created_at'],
    }],
  });

  if (!colaborador) return null;

  const pontos = (colaborador as any).Pontos as Ponto[];

  const agrupado: Record<string, { entrada?: Date, saida?: Date }> = {};

  for (const ponto of pontos) {
    const dataStr = (ponto.created_at ?? '' as unknown as Date).toISOString().split('T')[0];
    agrupado[dataStr] ||= {};

    if (ponto.id_tipo === 1 && (!agrupado[dataStr].entrada || (ponto.created_at ?? '') < agrupado[dataStr].entrada)) {
      agrupado[dataStr].entrada = ponto.created_at;
    }

    if (ponto.id_tipo === 2 && (!agrupado[dataStr].saida || (ponto.created_at ?? '') > agrupado[dataStr].saida)) {
      agrupado[dataStr].saida = ponto.created_at;
    }
  }

  const hojeStr = new Date().toISOString().split('T')[0];
  let horasHoje = '00:00';
  let turnoAberto = false;

  const lista_ponto: IPontoDia[] = Object.entries(agrupado).map(([data, { entrada, saida }]) => {
    let horas_trabalhadas = '00:00';

    if (entrada && saida) {
      const diff = saida.getTime() - entrada.getTime();
      const h = Math.floor(diff / 1000 / 60 / 60);
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      horas_trabalhadas = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }

    if (data === hojeStr) {
      horasHoje = horas_trabalhadas;
      turnoAberto = !!entrada && !saida;
    }

    return {
      data,
      hora_entrada: entrada?.toTimeString().slice(0, 5) ?? null,
      hora_saida: saida?.toTimeString().slice(0, 5) ?? null,
      horas_trabalhadas,
    };
  });

  return {
    nome: colaborador.nome,
    matricula: colaborador.matricula,
    horas_trabalhadas_hoje: horasHoje,
    turno_aberto: turnoAberto,
    lista_ponto,
  };
}
