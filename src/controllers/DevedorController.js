const User = require("../models/User");
const Devedor = require("../models/Devedores");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: "devedores" }
    });

    return res.json(user.devedores);
  },

  async store(req, res) {
    const { user_id } = req.params;

    const { name, Vdiv, parc } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
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
