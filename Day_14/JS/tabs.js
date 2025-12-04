document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  function showTab(tabId) {
    // Update buttons
    buttons.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.remove("bg-gray-200", "text-black");
        btn.classList.add("bg-blue-600", "text-white");
      } else {
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add("bg-gray-200", "text-black");
      }
    });

    // Update content panels
    panels.forEach(panel => {
      if (panel.id === tabId) {
        panel.classList.remove("hidden");
        requestAnimationFrame(() => {
          panel.classList.add("opacity-100");
          panel.classList.remove("opacity-0");
        });
      } else {
        panel.classList.add("opacity-0");
        setTimeout(() => panel.classList.add("hidden"), 200);
      }
    });
  }

  // Add click events
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      showTab(btn.dataset.tab);
    });
  });
});
