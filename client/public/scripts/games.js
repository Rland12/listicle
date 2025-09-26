document.addEventListener('DOMContentLoaded', () => {
  renderGames();
  renderGame();
});

// LIST
async function renderGames() {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  try {
    const res = await fetch('/games');
    if (!res.ok) throw new Error('Failed to load games');
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      const noItems = document.createElement('h2');
      noItems.textContent = 'No Games Available 😞';
      mainContent.appendChild(noItems);
      return;
    }

    data.forEach(game => {
      const card = document.createElement('div');
      card.classList.add('card');

      const top = document.createElement('div');
      top.classList.add('top-container');
      top.style.backgroundImage = `url("${game.image}")`;

      const bottom = document.createElement('div');
      bottom.classList.add('bottom-container');

      const name = document.createElement('h3');
      name.className = 'gift-name';
      name.textContent = game.name;

      const platform = document.createElement('p');
      platform.textContent = 'Platform: ' + game.platform;

      const genre = document.createElement('p');
      genre.textContent = 'Genre: ' + game.genre;

      const price = document.createElement('p');
      price.textContent = 'Price: ' + game.pricePoint;

      const link = document.createElement('a');
      link.textContent = 'Read More';
      link.href = `/games/${game.id}`; // detail

      bottom.append(name, platform, genre, price, link);
      card.append(top, bottom);
      mainContent.appendChild(card);
    });
  } catch (e) {
    console.error(e);
    const err = document.createElement('p');
    err.textContent = 'Could not load games.';
    mainContent.appendChild(err);
  }
}

// DETAIL
async function renderGame() {
  const gameContent = document.getElementById('game-content');
  if (!gameContent) return;

  const match = location.pathname.match(/\/games\/(\d+)$/);
  const requestedID = match ? Number(match[1]) : NaN;
  if (!Number.isFinite(requestedID)) return (location.href = '/404.html');


  try {
    const res = await fetch('/games');
    if (!res.ok) throw new Error('Failed to load games');
    const data = await res.json();

    const game = Array.isArray(data) ? data.find(g => Number(g.id) === requestedID) : null;
    if (!game) {
      if (!location.pathname.endsWith('/404.html')) location.href = '/404.html';
      return;
    }

    document.getElementById('image').src = game.image;
    document.getElementById('name').textContent = game.name;
    document.getElementById('platform').textContent = 'Platform: ' + game.platform;
    document.getElementById('genre').textContent = 'Genre: ' + game.genre;
    document.getElementById('pricePoint').textContent = 'Price: ' + game.pricePoint;
    document.getElementById('studio').textContent = 'Studio: ' + game.studio;
    document.getElementById('description').textContent = game.description;

    document.title = `Game - ${game.name}`;
  } catch (e) {
    console.error(e);
    if (!location.pathname.endsWith('/404.html')) location.href = '/404.html';
  }
}
