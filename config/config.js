require('dotenv').config();

// Check for cloud indication in either DB_HOST or DATABASE_URL
const isCloud = 
  (process.env.DB_HOST && process.env.DB_HOST.includes('supabase.com')) ||
  (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('supabase.com'));

const baseConfig = {
  // If DATABASE_URL is present, tell Sequelize to use it
  ...(process.env.DATABASE_URL ? { use_env_variable: 'DATABASE_URL' } : {}),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  dialectOptions: isCloud ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    prepareThreshold: 0
  } : {}
};

module.exports = {
  development: baseConfig,
  test: baseConfig,
  production: baseConfig,
};