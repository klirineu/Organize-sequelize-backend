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
            },
            isAlpha: {
              msg: "Esse campo só pode ter letras"
            }
          }
        },
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
        tableName: "devedores"
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Devedores;
