const { Model, DataTypes } = require("sequelize");

class UserDividas extends Model {
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
        },
        counter: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        }
      },
      {
        sequelize,
        tableName: "user_dividas"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = UserDividas;
