const { Model, DataTypes } = require("sequelize");

class Devedores extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [2, 30],
              msg: "Esse campo deve ter entre 4 e 30 caracteres"
            },
            notEmpty: {
              msg: "Esse campo não pode ser vazio"
            }
          }
        }
      },
      {
        sequelize,
        tableName: "devedores"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.hasMany(models.DevedorDividas, {
      foreignKey: "dev_id",
      as: "devedor_dividas"
    });
  }
}

module.exports = Devedores;
