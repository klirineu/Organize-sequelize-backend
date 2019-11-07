const User = require("../models/User");
const UserDividas = require("../models/UserDividas");

module.exports = {
  async index(req, res) {
    try {
      const user = await User.findByPk(req.userId, {
        include: { association: "user_dividas" },
        attributes: ["name"]
      });

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  async store(req, res) {
    try {
      const { Vdiv, parc } = req.body;

      const user_id = req.userId;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      const divida = await UserDividas.create({
        Vdiv,
        parc,
        user_id
      });

      return res.json(divida);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },

  async update(req, res) {
    try {
      const { Vdiv, parc } = req.body;
      const { div_id } = req.params;

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      const divida = await UserDividas.findOne({ where: { id: div_id } });

      if (!divida) {
        return res.status(400).json({ error: "Divida não existe" });
      }

      await divida.update({ Vdiv, parc }, { where: { id: div_id } });

      return res.json(divida);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },

  async delete(req, res) {
    const { div_id } = req.params;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    const divida = await UserDividas.findOne({ where: { id: div_id } });

    if (!divida) {
      return res.status(400).json({ error: "Divida não existe" });
    }

    await divida.destroy();

    return res.json();
  }
};
