const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async store(req, res) {
    const { name, password } = req.body;

    if (await User.findOne({ where: { name } }))
      return res.status(400).json({ error: "Usuário já existe" });

    const user = await User.create({ name, password });

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400
    });

    return res.json({ user, token });
  },

  async update(req, res) {
    const { user_id } = req.params;
    const { name, password } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    await user.update({ name, password }, { where: { id: user_id } });

    return res.json(user);
  },

  async delete(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    await user.destroy();

    return res.json();
  }
};
