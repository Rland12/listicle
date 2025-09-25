const header = document.querySelector('header');
const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';

const header_left = document.createElement('div');
header_left.className = 'header-left';

const logo = document.createElement('img');
logo.src = '/public/unearthed_logo.png';
logo.alt = 'Logo';
logo.className = 'logo';

const title = document.createElement('h1');
title.textContent = 'UnEarthed';
title.className = 'title';

const header_right= document.createElement('div');
header_right.className = 'header-right';

header_left.appendChild(logo);
header_left.appendChild(title);

const headerButton = document.createElement('button');
  headerButton.type = 'button';
  headerButton.textContent = 'Home';
  headerButton.addEventListener('click', () => {
    window.location.href = '/';
  });

header_right.appendChild(headerButton);
headerContainer.appendChild(header_left);
headerContainer.appendChild(header_right);
header.appendChild(headerContainer);