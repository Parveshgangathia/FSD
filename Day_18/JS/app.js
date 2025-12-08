// Carousel logic (app.js)
(function () {
  const track = document.getElementById('track');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = Array.from(document.querySelectorAll('.dot'));
  const caption = document.getElementById('caption');
  const autoplayToggle = document.getElementById('autoplayToggle');
  const goFirst = document.getElementById('goFirst');
  const viewport = document.getElementById('viewport');

  let index = 0;
  const total = slides.length;
  let slideWidth = viewport.clientWidth;
  let autoInterval = 3000; // 3 seconds
  let timer = null;
  let userInteracted = false;
  let resumeTimeout = null;
  const resumeDelay = 5000; // resume autoplay after 5s idle

  // Set widths on resize (slides are 100% but track transform uses viewport width)
  function updateSizes() {
    slideWidth = viewport.clientWidth;
    // ensure track is positioned correctly for current index
    moveTo(index, false);
  }
  window.addEventListener('resize', updateSizes);

  function moveTo(i, animate = true) {
    index = ((i % total) + total) % total;
    if (!animate) track.style.transition = 'none';
    else track.style.transition = '';
    const x = -index * slideWidth;
    track.style.transform = `translateX(${x}px)`;
    updateDots();
    caption.textContent = `Slide ${index + 1} / ${total}`;
    // re-enable transition after frame if we disabled it
    if (!animate) requestAnimationFrame(() => { requestAnimationFrame(() => track.style.transition = 'transform 600ms cubic-bezier(.2,.8,.2,1)'); });
  }

  function updateDots() {
    dots.forEach((d, i) => {
      if (i === index) {
        d.classList.remove('bg-white/40');
        d.classList.add('bg-white');
        d.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.08)';
      } else {
        d.classList.remove('bg-white');
        d.classList.add('bg-white/40');
        d.style.boxShadow = '';
      }
    });
  }

  function next(auto = false) {
    moveTo(index + 1);
    if (auto) return;
    onUserInteraction();
  }
  function prev() {
    moveTo(index - 1);
    onUserInteraction();
  }

  // Auto-play control
  function startAuto() {
    if (!autoplayToggle.checked) return;
    stopAuto();
    timer = setInterval(() => next(true), autoInterval);
  }
  function stopAuto() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // When user interacts, stop autoplay and schedule resume
  function onUserInteraction() {
    userInteracted = true;
    stopAuto();
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      userInteracted = false;
      if (autoplayToggle.checked) startAuto();
    }, resumeDelay);
  }

  // Dot click
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      moveTo(i);
      onUserInteraction();
    });
  });

  // Buttons
  nextBtn.addEventListener('click', () => next(false));
  prevBtn.addEventListener('click', prev);
  goFirst.addEventListener('click', () => { moveTo(0); onUserInteraction(); });

  // Pause on hover / touch
  viewport.addEventListener('mouseenter', () => { stopAuto(); });
  viewport.addEventListener('mouseleave', () => { if (!userInteracted && autoplayToggle.checked) startAuto(); });

  // Pause on touchstart (mobile), resume later
  viewport.addEventListener('touchstart', () => { onUserInteraction(); }, {passive: true});

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(false); }
    if (e.key === 'ArrowLeft') { prev(); }
  });

  // autoplay toggle changes
  autoplayToggle.addEventListener('change', () => {
    if (autoplayToggle.checked) startAuto();
    else stopAuto();
  });

  // Initialize
  function init() {
    // ensure slides are same width as viewport (they are 100% but slideWidth used for transform)
    updateSizes();
    // put track transition style default
    track.style.transition = 'transform 600ms cubic-bezier(.2,.8,.2,1)';
    moveTo(0, false);
    startAuto();
  }

  init();
})();
