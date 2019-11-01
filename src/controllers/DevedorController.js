const User = require("../models/User");
const Devedor = require("../models/Devedores");
const DevedorDivida = require("../models/DevedorDividas");

module.exports = {
  async index(req, res) {
    try {
      const { user_id } = req.params;

      const user = await User.findByPk(user_id, {
        include: [
          {
            model: Devedor,
            as: "devedores",
            include: { model: DevedorDivida, as: "devedor_dividas" },
            attributes: ["name"]
          }
        ],
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
      const { user_id } = req.params;

      const { name } = req.body;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      const devedores = await Devedor.create({
        name,
        user_id
      });

      return res.json(devedores);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },

  async update(req, res) {
    try {
      const { name } = req.body;
      const { dev_id, user_id } = req.params;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ error: "Usuário não existe" });
      }

      const devedor = await Devedor.findOne({ where: { id: dev_id } });

      if (!devedor) {
        return res.status(400).json({ error: "Devedor não existe" });
      }

      await devedor.update({ name }, { where: { id: dev_id } });

      return res.json(devedor).catch(err => {
        res.json({ error: err });
      });
    } catch (err) {
      res.status(400).json({ error: err });
    }
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
