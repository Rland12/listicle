import express from 'express';  
import gamesRouter from './routes/games.js';

const app = express();
const PORT = process.env.PORT || 3001;

// serve everything in /public at the root (/, /scripts, /covers, /game.html)
app.use(express.static('public'));

app.use('/games', gamesRouter);

app.get('/', (_req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Listicle</h1>');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
