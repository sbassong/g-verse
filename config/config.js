require('dotenv').config()

module.exports = {
  development: {
    database: 'gameStart_development',
    dialect: 'postgres',
  },
  test: {
    database: 'gameStart_test',
    dialect: 'postgres',
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