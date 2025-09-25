document.addEventListener('DOMContentLoaded', () => {
  renderGifts();
  renderGift();
});

async function renderGifts() {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return; // not on the list page

  try {
    const res = await fetch('/gifts');
    if (!res.ok) throw new Error('Failed to load gifts');
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      const noGifts = document.createElement('h2');
      noGifts.textContent = 'No Gifts Available 😞';
      mainContent.appendChild(noGifts);
      return;
    }

    data.forEach(gift => {
      const card = document.createElement('div');
      card.classList.add('card');

      const top = document.createElement('div');
      top.classList.add('top-container');
      top.style.backgroundImage = `url("${gift.image}")`;

      const bottom = document.createElement('div');
      bottom.classList.add('bottom-container');

      const name = document.createElement('h3');
      name.className = 'gift-name';
      name.textContent = gift.name;

      const price = document.createElement('p');
      price.textContent = 'Price: ' + gift.pricePoint;

      const audience = document.createElement('p');
      audience.textContent = 'Great For: ' + gift.audience;

      const link = document.createElement('a');
      link.textContent = 'Read More';
      link.href = `/gifts/${gift.id}`;

      bottom.append(name, price, audience, link);
      card.append(top, bottom);
      mainContent.appendChild(card);
    });
  } catch (e) {
    console.error(e);
    const err = document.createElement('p');
    err.textContent = 'Could not load gifts.';
    mainContent.appendChild(err);
  }
}

async function renderGift() {
  const giftContent = document.getElementById('gift-content');
  if (!giftContent) return; // not on the detail page

  // Expecting /gifts/:id where :id is a number
  const match = new URL(location.href).pathname.match(/\/gifts\/(\d+)$/);
  const requestedID = match ? Number(match[1]) : NaN;

  if (!Number.isFinite(requestedID)) {
    // invalid route like /gifts/foo -> 404
    if (!location.pathname.endsWith('/404.html')) location.href = '/404.html';
    return;
  }

  try {
    const res = await fetch('/gifts');
    if (!res.ok) throw new Error('Failed to load gifts');
    const data = await res.json();

    const gift = Array.isArray(data) ? data.find(g => Number(g.id) === requestedID) : null;

    if (!gift) {
      // no such gift -> 404
      if (!location.pathname.endsWith('/404.html')) location.href = '/404.html';
      return;
    }

    // Fill the detail page
    document.getElementById('image').src = gift.image;
    document.getElementById('name').textContent = gift.name;
    document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy;
    document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint;
    document.getElementById('audience').textContent = 'Great For: ' + gift.audience;
    document.getElementById('description').textContent = gift.description;

    document.title = `UnEarthed - ${gift.name}`;
  } catch (e) {
    console.error(e);
    // network/server error -> treat as 404
    if (!location.pathname.endsWith('/404.html')) location.href = '/404.html';
  }
}
