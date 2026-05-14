'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('receitas', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_usuarios: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      id_categorias: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'categorias',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      nome: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      tempo_preparo_minutos: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      porcoes: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      modo_preparo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      ingredientes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      criado_em: {
        type: Sequelize.DATE,
        allowNull: false
      },
      alterado_em: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addIndex('receitas', ['id_usuarios'], {
      name: 'fk_receitas_1_idx'
    });

    await queryInterface.addIndex('receitas', ['id_categorias'], {
      name: 'fk_receitas_2_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('receitas');
  }
};
