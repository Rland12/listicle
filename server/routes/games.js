import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import gamesData from '../data/games.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(gamesData);
});

router.get('/:gameId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/game.html'));
});

export default router;
