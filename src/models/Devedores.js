const { Model, DataTypes } = require("sequelize");

class Devedores extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        Vdiv: DataTypes.INTEGER,
        parc: DataTypes.INTEGER
      },
      {
        sequelize,
        tableName: "devedores"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Devedores;
