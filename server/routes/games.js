import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import GamesController from '../controllers/games.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/', GamesController.getGames);
router.get('/:gameId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/game.html'));
});
router.get('/', GamesController.getGames)
export default router;
