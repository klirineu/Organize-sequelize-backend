const User = require("../models/User");
const UserDividas = require("../models/UserDividas");

module.exports = {
  async store(req, res) {
    try {
      const { div_id } = req.params;

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      const divida = await UserDividas.findOne({ where: { id: div_id } });

      if (!divida) {
        return res.status(400).json({ error: "Divida não existe" });
      }
      divida.counter += 1;

      await divida.save();

      req.io.emit("counterUserParcelas", divida);

      return res.json(divida);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
};
