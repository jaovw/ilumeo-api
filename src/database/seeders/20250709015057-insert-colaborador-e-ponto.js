/* eslint-disable no-undef */
const { faker } = require('@faker-js/faker');

const tipoPontoEnum = {
  ENTRADA: 1,
  SAIDA: 2,
}

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const now = new Date();

      const colaboradores = Array.from({ length: 5 }).map(() => ({
        nome: faker.person.fullName(),
        matricula: faker.number.int({ min: 1000, max: 9999 }),
        created_at: now,
        updatedAt: now,
      }));

      await queryInterface.bulkInsert('colaborador', colaboradores, { transaction });

      const matriculas = colaboradores.map(c => c.matricula);

      const colaboradoresComId = await queryInterface.sequelize.query(
        `SELECT id, matricula FROM colaborador WHERE matricula IN (:matriculas)`,
        {
          replacements: { matriculas },
          type: queryInterface.sequelize.QueryTypes.SELECT,
          transaction,
        }
      );

      const pontos = [];
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      for (let diasAtras = 0; diasAtras < 7; diasAtras++) {
        const dataBase = new Date(hoje);
        dataBase.setDate(dataBase.getDate() - diasAtras);

        for (const colab of colaboradoresComId) {
          const entrada = new Date(dataBase);
          entrada.setHours(faker.number.int({ min: 7, max: 8 }));
          entrada.setMinutes(faker.number.int({ min: 0, max: 59 }));

          const saida = new Date(dataBase);
          saida.setHours(faker.number.int({ min: 16, max: 17 }));
          saida.setMinutes(faker.number.int({ min: 0, max: 59 }));

          pontos.push(
            {
              id_colaborador: colab.id,
              id_tipo: tipoPontoEnum.ENTRADA,
              created_at: entrada,
              updatedAt: entrada,
            },
            {
              id_colaborador: colab.id,
              id_tipo: tipoPontoEnum.SAIDA,
              created_at: saida,
              updatedAt: saida,
            }
          );
        }
      }

      await queryInterface.bulkInsert('ponto', pontos, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('ponto', {}, { transaction });
      await queryInterface.bulkDelete('colaborador', {}, { transaction });
    });
  },
};
