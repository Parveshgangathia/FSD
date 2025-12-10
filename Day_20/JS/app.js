(function () {
  const OFFSET = 8; // distance between tooltip and element
  let tooltipEl = null;
  let hideTimeout = null;

  function createTooltip() {
    tooltipEl = document.createElement("div");
    tooltipEl.className =
      "tooltip-hidden fixed z-50 bg-black text-white text-sm px-2 py-1 rounded shadow max-w-xs";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.wordBreak = "break-word";
    document.body.appendChild(tooltipEl);
  }

  function showTooltip(text) {
    if (!tooltipEl) createTooltip();
    tooltipEl.textContent = text;
    tooltipEl.classList.remove("tooltip-hidden");
    void tooltipEl.offsetWidth; // force reflow
    tooltipEl.classList.add("tooltip-visible");
    clearTimeout(hideTimeout);
  }

  function hideTooltip() {
    if (!tooltipEl) return;
    tooltipEl.classList.remove("tooltip-visible");
    tooltipEl.classList.add("tooltip-hidden");

    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      tooltipEl.style.left = tooltipEl.style.top = "-9999px";
    }, 220);
  }

  function clampPosition(x, y, tw, th) {
    const padding = 6;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (x < padding) x = padding;
    if (x + tw + padding > vw) x = vw - tw - padding;
    if (y < padding) y = padding;
    if (y + th + padding > vh) y = vh - th - padding;

    return { x, y };
  }

  function positionTooltip(rect, position, followEvent) {
    const tw = tooltipEl.offsetWidth;
    const th = tooltipEl.offsetHeight;

    let x = 0,
      y = 0;

    if (followEvent) {
      x = followEvent.clientX + 12;
      y = followEvent.clientY + 12;
    } else {
      switch (position) {
        case "top":
          x = rect.left + (rect.width - tw) / 2;
          y = rect.top - th - OFFSET;
          break;
        case "bottom":
          x = rect.left + (rect.width - tw) / 2;
          y = rect.bottom + OFFSET;
          break;
        case "left":
          x = rect.left - tw - OFFSET;
          y = rect.top + (rect.height - th) / 2;
          break;
        case "right":
        default:
          x = rect.right + OFFSET;
          y = rect.top + (rect.height - th) / 2;
          break;
      }
    }

    const { x: finalX, y: finalY } = clampPosition(Math.round(x), Math.round(y), tw, th);

    tooltipEl.style.left = finalX + "px";
    tooltipEl.style.top = finalY + "px";
  }

  function initTooltips() {
    const items = document.querySelectorAll("[data-tooltip]");

    items.forEach((el) => {
      const follow = el.dataset.follow === "true";
      let pos = (el.dataset.position || "top").toLowerCase();
      if (!["top", "bottom", "left", "right"].includes(pos)) pos = "top";

      el.addEventListener("mouseenter", (e) => {
        showTooltip(el.dataset.tooltip);
        positionTooltip(el.getBoundingClientRect(), pos, follow ? e : null);
      });

      el.addEventListener("mousemove", (e) => {
        if (follow) {
          positionTooltip(el.getBoundingClientRect(), pos, e);
        }
      });

      el.addEventListener("mouseleave", hideTooltip);

      // Keyboard accessibility
      el.addEventListener("focus", (e) => {
        showTooltip(el.dataset.tooltip);
        positionTooltip(el.getBoundingClientRect(), pos, null);
      });
      el.addEventListener("blur", hideTooltip);

      // Touch support
      el.addEventListener(
        "touchstart",
        (e) => {
          showTooltip(el.dataset.tooltip);
          positionTooltip(el.getBoundingClientRect(), pos, null);
        },
        { passive: true }
      );
      el.addEventListener("touchend", () => setTimeout(hideTooltip, 800));
    });

    window.addEventListener("scroll", hideTooltip, true);
    window.addEventListener("resize", hideTooltip);
  }

  document.addEventListener("DOMContentLoaded", initTooltips);
})();
