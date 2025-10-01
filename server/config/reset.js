import './dotenv.js';               
import {pool} from './database.js';
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
    )
`
     try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 games table created successfully')
    } catch (err) {
        console.error('⚠️ error creating games table', err)
    }
}
 

const seedGamesTable = async () => {
  await createGamesTable();
    gameData.forEach((game) => {
        const insertQuery = { text:`INSERT INTO games (name, image, platform, pricePoint, genre, studio, description) values ($1, $2, $3, $4, $5, $6, $7)`};
        const values = [game.name, game.image, game.platform, game.pricePoint, game.genre, game.studio, game.description];
        pool.query(insertQuery, values, (err, res) => {
        if (err) {
            console.error('⚠️ error inserting game', err)
            return
        }

        console.log(`✅ ${game.name} added successfully`)
        });
    })
}
seedGamesTable();
