

(function () {
  // create overlay root once
  let overlay = null;
  let activeTrigger = null; // element that opened the modal
  let activeCloseTimer = null;

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.style.display = 'flex';

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.tabIndex = -1; // allow focus

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.setAttribute('aria-label', 'Close modal');
    closeBtn.innerHTML = '&times;';

    const body = document.createElement('div');
    body.className = 'modal-body';

    modal.appendChild(closeBtn);
    modal.appendChild(body);
    overlay.appendChild(modal);

    // events
    overlay.addEventListener('click', (e) => {
      // click on overlay (not inside modal) closes
      if (e.target === overlay) {
        closeModal();
      }
    });

    closeBtn.addEventListener('click', closeModal);

    // close on Esc
    document.addEventListener('keydown', (e) => {
      if (!overlay || !overlay.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
    });

    return { overlay, modal, body, closeBtn };
  }

  // ensure DOM nodes exist
  let nodes = null;
  function ensureNodes() {
    if (!overlay) {
      nodes = buildOverlay();
      document.body.appendChild(overlay);
    }
    return nodes;
  }

  // focus trap minimal: remember last focused and focus modal; restore on close
  function trapFocus(modal) {
    const focusable = modal.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    function handle(e) {
      if (e.key !== 'Tab') return;
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    modal.addEventListener('keydown', handle);
    return () => modal.removeEventListener('keydown', handle);
  }

  // close function
  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    // allow animation to finish (match CSS transition time)
    clearTimeout(activeCloseTimer);
    activeCloseTimer = setTimeout(() => {
      try { document.body.removeChild(overlay); } catch (e) { /* ignore */ }
      overlay = null;
      if (activeTrigger && typeof activeTrigger.focus === 'function') activeTrigger.focus();
      activeTrigger = null;
    }, 300);
  }

  // open function (public)
  window.openModal = function (content, options = {}) {
    const { autoClose = 0 } = options;
    nodes = ensureNodes();
    const { overlay: ov, modal, body } = nodes;

    // fill content
    // accept string (HTML) or DOM node
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else if (content instanceof Node) {
      body.innerHTML = '';
      body.appendChild(content);
    } else {
      body.innerHTML = String(content);
    }

    // append to DOM (if not already)
    if (!document.body.contains(ov)) document.body.appendChild(ov);

    // show overlay & modal
    // small delay to allow CSS transitions
    requestAnimationFrame(() => {
      ov.classList.add('open');
      // focus modal for accessibility
      modal.focus();
    });

    // remember opener
    activeTrigger = document.activeElement;

    // setup focus trap and get remover
    const removeTrap = trapFocus(modal);

    // setup auto-close if requested
    if (autoClose && typeof autoClose === 'number' && autoClose > 0) {
      setTimeout(() => closeModal(), autoClose);
    }

    // return a handle to close programmatically
    return {
      close() {
        removeTrap();
        closeModal();
      }
    };
  };
})();
