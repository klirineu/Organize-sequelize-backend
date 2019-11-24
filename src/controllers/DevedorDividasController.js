const Devedor = require("../models/Devedores");
const DevedorDividas = require("../models/DevedorDividas");

module.exports = {
  async index(req, res) {
    try {
      const { dev_id } = req.params;

      const devedor = await Devedor.findByPk(dev_id, {
        include: { association: "devedor_dividas" },
        attributes: ["name"]
      });

      if (!devedor) {
        return res.status(400).json({ error: "Devedor não existe" });
      }

      return res.json(devedor);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  async store(req, res) {
    try {
      const { Vdiv, parc } = req.body;
      const { dev_id } = req.params;

      const devedor = await Devedor.findByPk(dev_id);

      if (!devedor) {
        return res.status(400).json({ error: "Devedor não existe" });
      }

      const divida = await DevedorDividas.create({
        Vdiv,
        parc,
        dev_id
      });

      req.io.emit("DevedorDividas", divida);

      return res.json(divida);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  async update(req, res) {
    try {
      const { Vdiv, parc } = req.body;
      const { div_id, dev_id } = req.params;

      const devedor = await Devedor.findByPk(dev_id);

      if (!devedor) {
        return res.status(400).json({ error: "Devedor não existe" });
      }

      const divida = await DevedorDividas.findOne({ where: { id: div_id } });

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
    const { div_id, dev_id } = req.params;

    const devedor = await Devedor.findByPk(dev_id);

    if (!devedor) {
      return res.status(400).json({ error: "Devedor não existe" });
    }

    const divida = await DevedorDividas.findOne({ where: { id: div_id } });

    if (!divida) {
      return res.status(400).json({ error: "Divida não existe" });
    }

    await divida.destroy();

    return res.json();
  }
};
