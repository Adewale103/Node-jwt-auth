module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Age13@3602",
  DB: "node_auth",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
