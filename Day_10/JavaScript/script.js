// search.js — Search Filter UI (debounced, case-insensitive, animations)

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('searchInput');
  const list = document.getElementById('itemList');
  const items = Array.from(list.querySelectorAll('.item'));
  const noResults = document.getElementById('noResults');

  // precompute normalized text for fast matching
  const data = items.map(li => ({
    node: li,
    text: li.textContent.trim().toLowerCase()
  }));

  // debounce helper
  function debounce(fn, wait = 180) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  // filter function
  function filter(q) {
    const qnorm = q.trim().toLowerCase();
    if (!qnorm) {
      // show all
      data.forEach(d => d.node.classList.remove('hidden'));
      noResults.hidden = true;
      return;
    }

    let visibleCount = 0;
    data.forEach(d => {
      const match = d.text.includes(qnorm);
      if (match) {
        d.node.classList.remove('hidden');
        visibleCount++;
      } else {
        // add hidden class to animate out
        d.node.classList.add('hidden');
      }
    });

    if (visibleCount === 0) {
      noResults.hidden = false;
    } else {
      noResults.hidden = true;
    }
  }

  const debouncedFilter = debounce((e) => filter(e.target.value), 140);

  // events
  input.addEventListener('input', debouncedFilter);

  // optional: clear search on Escape
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      filter('');
      input.blur();
    }
  });

  // initial: ensure everything visible
  filter('');
});
