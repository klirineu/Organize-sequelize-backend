"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("devedor_dividas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      dev_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "devedores", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      Vdiv: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      parc: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      counter: {
        type: Sequelize.INTEGER,
        default: 0
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("devedor_dividas");
  }
};
