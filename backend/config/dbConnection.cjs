const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

const connectDb = async () => {
  try {
    const client = await pool.connect();
    console.log(`Connected to PostgreSQL: ${client.database} on ${client.host}`);
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = { pool, connectDb };
