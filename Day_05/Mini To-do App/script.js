// Day 05 — Mini To‑Do App (front-end only)
(function () {
  const form = document.getElementById("taskForm");
  const input = document.getElementById("taskInput");
  const list = document.getElementById("list");
  const countEl = document.getElementById("count");
  const message = document.getElementById("message");
  const clearAllBtn = document.getElementById("clearAll");
  const emptyState = document.getElementById("emptyState");

  // helpers
  function updateCount() {
    const total = list.children.length;
    countEl.textContent = total + (total === 1 ? " task" : " tasks");
    emptyState.hidden = total !== 0;
  }

  function showError(text) {
    message.textContent = text;
    setTimeout(() => {
      if (message.textContent === text) message.textContent = "";
    }, 2000);
  }

  function createItem(text) {
    const li = document.createElement("li");
    li.className = "item";

    const cb = document.createElement("div");
    cb.className = "checkbox";
    cb.setAttribute("role", "button");
    cb.setAttribute("aria-pressed", "false");
    cb.tabIndex = 0;

    const txt = document.createElement("div");
    txt.className = "text";
    const p = document.createElement("p");
    p.textContent = text;
    txt.appendChild(p);

    const actions = document.createElement("div");
    actions.className = "actions";
    const del = document.createElement("button");
    del.className = "trash";
    del.setAttribute("aria-label", "Delete task");
    del.textContent = "✕";

    actions.appendChild(del);

    li.appendChild(cb);
    li.appendChild(txt);
    li.appendChild(actions);

    // event: toggle complete
    function toggleDone() {
      const isDone = cb.classList.toggle("checked");
      p.classList.toggle("done", isDone);
      cb.setAttribute("aria-pressed", String(isDone));
    }
    cb.addEventListener("click", toggleDone);
    cb.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleDone();
      }
    });

    // event: delete with smooth removal
    del.addEventListener("click", () => {
      li.classList.add("removing");
      // wait for transition then remove
      li.addEventListener("transitionend", function te(e) {
        // ensure we only remove once (height/opacity transition)
        if (e.propertyName === "opacity" || e.propertyName === "height") {
          li.removeEventListener("transitionend", te);
          li.remove();
          updateCount();
        }
      });
    });

    return li;
  }

  // add task
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) {
      showError("Please type a task before adding.");
      input.focus();
      return;
    }
    const item = createItem(text);
    list.prepend(item);
    // small delay to allow initial styles to apply, then show class triggers transition
    requestAnimationFrame(() =>
      requestAnimationFrame(() => item.classList.add("show"))
    );
    input.value = "";
    input.focus();
    updateCount();
  });

  // Clear all
  clearAllBtn.addEventListener("click", () => {
    if (list.children.length === 0) return;
    // graceful: mark all removing so animations run
    Array.from(list.children).forEach((li) => li.classList.add("removing"));
    // remove after a short delay (allow transitionend to fire)
    setTimeout(() => {
      list.innerHTML = "";
      updateCount();
    }, 260);
  });

  // initial state
  updateCount();
  input.focus();

  // accessibility: allow Delete key on selected item (optional enhancement)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Delete") {
      const focused = document.activeElement;
      if (focused && focused.closest && focused.closest("li")) {
        const li = focused.closest("li");
        li.classList.add("removing");
        setTimeout(() => {
          li.remove();
          updateCount();
        }, 260);
      }
    }
  });
})();
