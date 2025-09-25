document.addEventListener('DOMContentLoaded', () => {
  const requestedUrl = window.location.href.split('/').pop();
  
  if (requestedUrl) {
  window.location.href = '../404.html'
}
else {
    renderGift();
    renderGifts();
}
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
      // link.setAttribute('role','button'); // not needed unless for styling

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

  try {
    const requestedID = Number(new URL(location.href).pathname.split('/').pop());
    const res = await fetch('/gifts');
    if (!res.ok) throw new Error('Failed to load gifts');
    const data = await res.json();

    const gift = Array.isArray(data) ? data.find(g => Number(g.id) === requestedID) : null;

    if (!gift) {
      const msg = document.createElement('h2');
      msg.textContent = 'No Gifts Available 😞';
      giftContent.appendChild(msg);
      return;
    }

    // Make sure these elements exist in your detail HTML
    document.getElementById('image').src = gift.image;
    document.getElementById('name').textContent = gift.name;
    document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy;
    document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint;
    document.getElementById('audience').textContent = 'Great For: ' + gift.audience;
    document.getElementById('description').textContent = gift.description;

    document.title = `UnEarthed - ${gift.name}`;
  } catch (e) {
    console.error(e);
    const err = document.createElement('p');
    err.textContent = 'Could not load this gift.';
    giftContent.appendChild(err);
  }
}
