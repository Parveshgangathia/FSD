// todo/static/todo/ajax.js
// Vanilla JS: handles toggle & delete via fetch (AJAX)
// Requires Django views to respond with JSON when header x-requested-with = XMLHttpRequest

(function () {
  // helper: get CSRF token from cookie (Django default)
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  const csrftoken = getCookie('csrftoken');

  // helper: send POST fetch with CSRF and return parsed JSON
  async function postJSON(url, data = {}) {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
        'X-Requested-With': 'XMLHttpRequest' // marks request as AJAX
      },
      body: JSON.stringify(data),
      credentials: 'same-origin'
    });
    if (!resp.ok) throw new Error('Network response was not ok');
    return resp.json();
  }

  // update single task list item UI (toggle completed state)
  function updateListItemToggle(li, completed) {
    const span = li.querySelector('span');
    const toggleBtn = li.querySelector('.btn-toggle');

    if (completed) {
      span.classList.add('completed-text');
      toggleBtn.textContent = 'Undo';
      toggleBtn.classList.remove('btn-done');
      toggleBtn.classList.add('btn-undo');
      li.dataset.completed = '1';
    } else {
      span.classList.remove('completed-text');
      toggleBtn.textContent = 'Done';
      toggleBtn.classList.remove('btn-undo');
      toggleBtn.classList.add('btn-done');
      li.dataset.completed = '0';
    }
  }

  // remove list item from DOM
  function removeListItem(li) {
    li.style.transition = 'opacity 180ms ease, height 180ms ease, margin 180ms ease';
    li.style.opacity = '0';
    li.style.height = '0';
    li.style.margin = '0';
    setTimeout(() => li.remove(), 220);
  }

  // show a short message near the top (re-uses existing messages list if present)
  function flashMessage(text, isError = false) {
    let container = document.querySelector('.messages');
    if (!container) {
      container = document.createElement('ul');
      container.className = 'messages';
      const containerWrap = document.querySelector('.container');
      containerWrap.insertBefore(container, container.firstChild);
    }
    const li = document.createElement('li');
    li.textContent = text;
    if (!isError) li.style.background = '#e6ffed';
    else li.style.background = '#ffe6e6';
    container.prepend(li);
    setTimeout(() => {
      li.style.transition = 'opacity 300ms ease';
      li.style.opacity = '0';
      setTimeout(() => li.remove(), 400);
    }, 1200);
  }

  // event handler for clicks inside taskList
  document.addEventListener('click', async function (e) {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const action = btn.getAttribute('data-action');
    const li = btn.closest('li[data-pk]');
    if (!li) return;

    const pk = li.dataset.pk;
    try {
      if (action === 'toggle') {
        // call toggle endpoint
        const url = `/toggle/${pk}/`;           // matches todo/urls.py path
        const json = await postJSON(url, {});
        if (json.ok) {
          updateListItemToggle(li, json.completed);
          flashMessage('Task updated.');
        } else {
          flashMessage('Update failed', true);
        }
      } else if (action === 'delete') {
        // confirm quick
        if (!confirm('Delete this task?')) return;
        const url = `/delete/${pk}/`;
        const json = await postJSON(url, {});
        if (json.ok) {
          removeListItem(li);
          flashMessage('Task deleted.');
        } else {
          flashMessage('Delete failed', true);
        }
      }
    } catch (err) {
      console.error(err);
      flashMessage('Request failed — try again', true);
    }
  }, false);

})();
