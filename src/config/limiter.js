module.exports = {
  path: "*",
  method: "all",
  lookup: ["connection.remoteAddress"],
  total: 250,
  expire: 30 * 60 * 1000
};
