/* eslint-disable no-undef */
'use strict';

const nome_tabela = 'ponto'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async t => {
      await queryInterface.createTable(nome_tabela,
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          id_colaborador: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: { model: 'colaborador', key: 'id' },
            onDelete: 'CASCADE'
          },
          id_tipo: {
            allowNull: false,
            type: Sequelize.SMALLINT
          },
          created_at: {
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            type: Sequelize.DATE
          },
          deleteed_at: {
            allowNull: true,
            type: Sequelize.DATE
          }
        },
        { transaction: t }
      )
    })
  },

  async down (queryInterface) {
    await queryInterface.sequelize.transaction(async t => {
      await queryInterface.dropTable(nome_tabela, { transaction: t })
    })
  }
};
