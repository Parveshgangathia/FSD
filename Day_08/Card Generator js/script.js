// dynamic_cards.js
// Handles creating/deleting cards, animations, and simple validation.

// CONFIG
const PLACEHOLDER_IMG = 'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#e6eefc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#3b82f6" font-family="Segoe UI, Arial" font-size="20">No Image</text></svg>`);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cardForm');
  const cardsWrap = document.getElementById('cardsWrap');
  const clearAllBtn = document.getElementById('clearAll');

  // Optional: load from localStorage
  // const STORAGE_KEY = 'dynamic_cards_v1';
  // loadFromStorage();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value.trim();
    const desc = form.description.value.trim();
    const img = form.image.value.trim();

    if (!title || !desc) {
      // simple inline validation — you can enhance this
      alert('Please provide both title and description.');
      return;
    }

    createCard({ title, desc, img });
    form.reset();
    form.title.focus();
  });

  // Event delegation for delete
  cardsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="delete"]');
    if (!btn) return;
    const card = btn.closest('.card');
    if (!card) return;

    // animate out then remove
    card.classList.remove('fade-in');
    card.classList.add('fade-out');

    card.addEventListener('transitionend', function handler(ev) {
      // ensure this runs only once for opacity transition
      if (ev.propertyName !== 'opacity') return;
      card.removeEventListener('transitionend', handler);
      card.remove();
      // saveToStorage();
    });
  });

  clearAllBtn.addEventListener('click', () => {
    if (!confirm('Remove all cards?')) return;
    // animate each then remove
    document.querySelectorAll('.card').forEach(c => {
      c.classList.remove('fade-in'); c.classList.add('fade-out');
      c.addEventListener('transitionend', () => c.remove());
    });
    // localStorage.removeItem(STORAGE_KEY);
  });

  // Create and insert a card node
  function createCard({ title, desc, img }) {
    const card = document.createElement('article');
    card.className = 'card';

    const imageEl = document.createElement('img');
    imageEl.alt = title;
    imageEl.src = img || PLACEHOLDER_IMG;
    // fallback if image fails
    imageEl.addEventListener('error', () => { imageEl.src = PLACEHOLDER_IMG; });

    const body = document.createElement('div');
    body.className = 'card-body';

    const h3 = document.createElement('h3');
    h3.className = 'card-title';
    h3.textContent = title;

    const p = document.createElement('p');
    p.className = 'card-desc';
    p.textContent = desc;

    body.appendChild(h3);
    body.appendChild(p);

    const controls = document.createElement('div');
    controls.className = 'card-controls';

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.dataset.action = 'delete';
    deleteBtn.textContent = 'Delete';

    controls.appendChild(deleteBtn);

    card.appendChild(imageEl);
    card.appendChild(body);
    card.appendChild(controls);

    // Insert at top for immediate visibility
    cardsWrap.prepend(card);

    // small delay so CSS transition can pick up
    requestAnimationFrame(() => {
      // next frame: add fade-in class
      card.classList.add('fade-in');
    });

    // saveToStorage();
    return card;
  }

  function saveToStorage() {
    const cards = Array.from(document.querySelectorAll('.card')).map(c => ({
      title: c.querySelector('.card-title').textContent,
      desc: c.querySelector('.card-desc').textContent,
      img: c.querySelector('img').src === PLACEHOLDER_IMG ? '' : c.querySelector('img').src
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }

  function loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const arr = JSON.parse(raw);
      arr.forEach(item => createCard({ title: item.title, desc: item.desc, img: item.img }));
    } catch (err) {
      console.warn('Failed to parse storage:', err);
    }
  }

});
