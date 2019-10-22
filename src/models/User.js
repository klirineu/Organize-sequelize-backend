const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        password: DataTypes.STRING
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
  }
}

module.exports = User;
