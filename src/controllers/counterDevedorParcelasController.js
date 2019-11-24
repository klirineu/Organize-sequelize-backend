const Devedor = require("../models/Devedores");
const DevedorDividas = require("../models/DevedorDividas");

module.exports = {
  async store(req, res) {
    try {
      const { div_id, dev_id } = req.params;

      const devedor = await Devedor.findByPk(dev_id);

      if (!devedor) {
        return res.status(400).json({ error: "Devedor não existe" });
      }

      const divida = await DevedorDividas.findOne({ where: { id: div_id } });

      if (!divida) {
        return res.status(400).json({ error: "Divida não existe" });
      }
      divida.counter += 1;

      await divida.save();

      req.io.emit("counterDevedorParcelas", divida);

      return res.json(divida);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
};
