require('dotenv').config()

module.exports = {
  development: {
    database: 'gameStart_development',
    dialect: 'postgres',
    host: "127.0.0.1",
  },
  test: {
    database: 'gameStart_test',
    dialect: 'postgres',
    host: "127.0.0.1",
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}