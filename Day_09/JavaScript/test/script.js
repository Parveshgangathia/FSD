
      (function () {
        const KEY = "fsd_theme",
          DARK = "dark",
          LIGHT = "light";
        const html = document.documentElement;
        const btn = document.getElementById("themeToggle");
        const sun = document.querySelector(".icon-sun");
        const moon = document.querySelector(".icon-moon");
        const htmlAttrs = document.getElementById("htmlAttrs");
        const consoleOut = document.getElementById("consoleOut");

        function log(msg) {
          console.log(msg);
          consoleOut.textContent =
            (consoleOut.textContent === "—"
              ? ""
              : consoleOut.textContent + "\n") + String(msg);
        }

        function getStored() {
          try {
            return localStorage.getItem(KEY);
          } catch (e) {
            return null;
          }
        }

        function apply(t) {
          if (t === DARK) {
            html.setAttribute("data-theme", "dark");
            html.classList.add("dark");
            btn.setAttribute("aria-pressed", "true");
            sun.style.display = "none";
            moon.style.display = "block";
          } else {
            html.removeAttribute("data-theme");
            html.classList.remove("dark");
            btn.setAttribute("aria-pressed", "false");
            sun.style.display = "block";
            moon.style.display = "none";
          }
          htmlAttrs.textContent =
            html.outerHTML.slice(0, 120) +
            (html.outerHTML.length > 120 ? "..." : "");
        }

        function save(t) {
          try {
            localStorage.setItem(KEY, t);
          } catch (e) {}
        }

        function initial() {
          const s = getStored();
          if (s === DARK || s === LIGHT) return s;
          if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          )
            return DARK;
          return LIGHT;
        }

        // init
        apply(initial());
        log(
          "initialized theme=" +
            (getStored() || "[no stored]") +
            "; html.dataset=" +
            html.getAttribute("data-theme")
        );

        btn.addEventListener("click", () => {
          const now =
            html.getAttribute("data-theme") === DARK ||
            html.classList.contains("dark")
              ? DARK
              : LIGHT;
          const next = now === DARK ? LIGHT : DARK;
          apply(next);
          save(next);
          log("toggled -> " + next);
        });

        // show current attrs on load
        htmlAttrs.textContent =
          html.outerHTML.slice(0, 120) +
          (html.outerHTML.length > 120 ? "..." : "");
      })();
