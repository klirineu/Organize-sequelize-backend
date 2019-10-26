module.exports = {
  path: "*",
  method: "all",
  lookup: ["connection.remoteAddress"],
  total: 150,
  expire: 60 * 60 * 1000
};
