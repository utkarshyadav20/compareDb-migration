require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_INSTANCE_JOB,
    dialect: 'postgres', // Hardcoding postgres as 'DB_CONNECTION' might be different or 'postgres' is standard here
    port: process.env.DB_PORT,
    dialectOptions: {
       // ssl: {
       //   require: true,
       //   rejectUnauthorized: false
       // }
       // Uncomment if SSL is needed, usually for production/staging
    }
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST || 'database_test',
    host: process.env.DB_INSTANCE_JOB,
    dialect: 'postgres',
    port: process.env.DB_PORT
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_INSTANCE_JOB,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    }
  }
};
