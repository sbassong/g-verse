require('dotenv').config()

module.exports = {
  development: {
    database: 'g-verse_development',
    dialect: 'postgres',
  },
  test: {
    database: 'g-verse_test',
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