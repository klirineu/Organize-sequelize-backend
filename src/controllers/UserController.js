const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { name, password } = req.body;

    const user = await User.create({ name, password });

    return res.json(user);
  }
};
