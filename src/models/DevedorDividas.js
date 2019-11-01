const { Model, DataTypes } = require("sequelize");

class DevedorDividas extends Model {
  static init(sequelize) {
    super.init(
      {
        Vdiv: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio"
            },
            isNumeric: {
              msg: "Esse campo só pode ter números"
            }
          }
        },
        parc: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio"
            },
            isNumeric: {
              msg: "Esse campo só pode ter números"
            }
          }
        }
      },
      {
        sequelize,
        tableName: "devedor_dividas"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Devedores, { foreignKey: "dev_id", as: "devedores" });
  }
}

module.exports = DevedorDividas;
