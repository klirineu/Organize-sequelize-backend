module.exports = {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    undescored: true
  }
};
