import { Colaborador } from "../../models/colaborador";
import { ColaboradorService } from "../../service/colaborador.service";

jest.mock('../../models/colaborador');

const mockFindAll = jest.fn();

(Colaborador as any).findAll = mockFindAll;

describe('ColaboradorService.list', () => {
  const service = new ColaboradorService();

  it('Retornar uma lista de colaboradores', async () => {
    const fakeList = [
      { id: 1, nome: 'João', matricula: 1234 },
      { id: 2, nome: 'Maria' },
    ];

    mockFindAll.mockResolvedValue(fakeList);

    const result = await service.list();

    expect(mockFindAll).toHaveBeenCalled();
    expect(result).toEqual(fakeList);
  });
});
