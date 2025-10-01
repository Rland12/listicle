// server/config/reset.js
import 'dotenv/config';                // load envs (or keep your ./dotenv.js if needed)
import pool from './database.js';
import gameData from '../data/games.js';

const createGamesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS games;
    CREATE TABLE IF NOT EXISTS games (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      image VARCHAR(255) NOT NULL,
      platform VARCHAR(100) NOT NULL,
      pricePoint VARCHAR(50) NOT NULL,
      genre VARCHAR(100) NOT NULL,
      studio VARCHAR(100) NOT NULL,
      description TEXT NOT NULL
    );
  `;
  await pool.query(createTableQuery);
  console.log('🎉 games table created successfully');
};

const seedGamesTable = async () => {
  const insertSql = `
    INSERT INTO games (name, image, platform, pricePoint, genre, studio, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  for (const game of gameData) {
    await pool.query(insertSql, [
      game.name,
      game.image,
      game.platform,
      game.pricePoint,
      game.genre,
      game.studio,
      game.description
    ]);
    console.log(`✅ ${game.name} added successfully`);
  }
};

const main = async () => {
  try {
    await createGamesTable();
    await seedGamesTable();
  } catch (err) {
    console.error('⚠️ reset failed:', err);
  } finally {
    // Always close pool so the process can exit cleanly
    await pool.end();
  }
};

main();
