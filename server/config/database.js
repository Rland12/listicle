// server/config/database.js
import 'dotenv/config';
import pg from 'pg';

const wantsSSL =
  process.env.PGSSL === 'require' ||
  (process.env.DATABASE_URL && /sslmode=require/i.test(process.env.DATABASE_URL || ''));

const config = {
  connectionString: process.env.DATABASE_URL || undefined,
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),   // ensure number
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '',
  database: process.env.PGDATABASE || 'listicle',
  ssl: wantsSSL ? { rejectUnauthorized: false } : false,   // <-- turn OFF for local
};

const pool = new pg.Pool(config);
export default pool; // <-- default export to match your reset.js import
