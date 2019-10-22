const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports = {
  async authenticate(req, res) {
    const { name, password } = req.body;

    const user = await User.findOne({ where: { name } });

    if (!user) return res.status(400).json({ error: "Usuário não existe" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "senha inválida" });

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400
    });

    return res.json({ user, token });
  }
};
