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
      return res.status(400).json({ error: "Usuário não existe" });
    }

    const devedores = await Devedor.create({
      name,
      Vdiv,
      parc,
      user_id
    });

    return res.json(devedores);
  },

  async update(req, res) {
    const { name, Vdiv, parc } = req.body;
    const { dev_id, user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    const devedor = await Devedor.findOne({ where: { id: dev_id } });

    if (!devedor) {
      return res.status(400).json({ error: "Devedor não existe" });
    }

    await devedor.update({ name, Vdiv, parc }, { where: { id: dev_id } });

    return res.json(devedor);
  },

  async delete(req, res) {
    const { dev_id, user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    const devedor = await Devedor.findOne({ where: { id: dev_id } });

    if (!devedor) {
      return res.status(400).json({ error: "Devedor não existe" });
    }

    await devedor.destroy();

    return res.json();
  }
};
