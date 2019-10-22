const User = require("../models/User");
const Devedor = require("../models/Devedores");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: "devedores" },
      attributes: ["name"]
    });

    return res.json(user);
  },

  async store(req, res) {
    const { user_id } = req.params;

    const { name, Vdiv, parc } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "Usuário ná existe" });
    }

    const devedores = await Devedor.create({
      name,
      Vdiv,
      parc,
      user_id
    });

    return res.json(devedores);
  }
};
