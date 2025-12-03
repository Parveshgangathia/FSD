// toast.js - reusable toast system using Tailwind
(function () {
  const CONTAINER_ID = 'toast-container';
  const DEFAULT_DURATION = 3000;

  function getContainer() {
    let c = document.getElementById(CONTAINER_ID);
    if (!c) {
      c = document.createElement('div');
      c.id = CONTAINER_ID;
      c.className =
        'fixed top-4 right-4 flex flex-col items-end gap-2 z-50 pointer-events-none';
      document.body.appendChild(c);
    }
    return c;
  }

  const TYPE_MAP = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✅'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '⚠️'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ️'
    }
  };

  function createToastNode(message, type = 'info') {
    const cfg = TYPE_MAP[type] || TYPE_MAP.info;

    const toast = document.createElement('div');
    toast.className = [
      'pointer-events-auto',
      'w-full', 'max-w-sm',
      'border', 'rounded-lg',
      'shadow-lg',
      'transform', 'translate-x-4',
      'opacity-0',
      'transition-all', 'duration-300',
      cfg.bg, cfg.border
    ].join(' ');

    toast.innerHTML = `
      <div class="flex items-start gap-3 p-3">
        <div class="text-xl leading-none">${cfg.icon}</div>
        <div class="flex-1">
          <div class="text-sm ${cfg.text}">${escapeHtml(message)}</div>
        </div>
        <button class="ml-2 text-gray-500 hover:text-gray-700 rounded p-1" aria-label="Dismiss">
          ✖
        </button>
      </div>
    `;

    return toast;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  window.showToast = function (message, type = 'info', options = {}) {
    const duration = options.duration || DEFAULT_DURATION;
    const container = getContainer();
    const node = createToastNode(message, type);

    container.prepend(node);

    requestAnimationFrame(() => {
      node.classList.remove('translate-x-4', 'opacity-0');
      node.classList.add('translate-x-0', 'opacity-100');
    });

    let removed = false;

    function close() {
      if (removed) return;
      removed = true;

      node.classList.add('translate-x-4', 'opacity-0');
      node.classList.remove('translate-x-0', 'opacity-100');

      setTimeout(() => node.remove(), 400);
    }

    const btn = node.querySelector("button");
    btn.addEventListener("click", close);

    setTimeout(close, duration);
  };
})();
