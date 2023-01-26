require('dotenv').config()

export const development = {
  database: 'gameStart_development',
  dialect: 'postgres'
}
export const test = {
  database: 'gameStart_test',
  dialect: 'postgres'
}
export const production = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      require: true
    }
  }
}