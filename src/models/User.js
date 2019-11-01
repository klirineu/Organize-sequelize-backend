const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [4, 30],
              msg: "Esse campo deve ter entre 4 e 30 caracteres"
            },
            notEmpty: {
              msg: "Esse campo não pode ser vazio"
            }
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Esse campo não pode ser vazio"
            },
            len: {
              args: [4],
              msg: "Senha deve ter mais que 4 caracteres"
            }
          }
        }
      },
      {
        sequelize,
        tableName: "users",

        hooks: {
          beforeCreate: user => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        instanceMethods: {
          validatePassword: function(password) {
            return bcrypt.compareSync(password, this.password);
          }
        }
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Devedores, { foreignKey: "user_id", as: "devedores" });
    this.hasMany(models.UserDividas, {
      foreignKey: "user_id",
      as: "user_dividas"
    });
  }
}

module.exports = User;
