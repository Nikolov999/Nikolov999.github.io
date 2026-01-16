// -----------------------------
// 1) Microsoft Clarity tracking
// -----------------------------
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "uetx3tchok");

// -----------------------------
// 2) Inject nav + footer
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {

  function injectFragment(placeholderId, file) {
    const el = document.getElementById(placeholderId);
    if (!el) return;

    fetch(file)
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html;

        // If nav was injected, wire up burger menu
        if (placeholderId === "nav-placeholder") {
          const toggle = document.getElementById("menu-toggle");
          const links = document.getElementById("nav-links");
          const overlay = document.getElementById("nav-overlay");

          if (toggle && links) {
            const closeMenu = () => {
              links.classList.remove("open");
              toggle.classList.remove("open");
              if (overlay) overlay.classList.remove("active");
            };

            toggle.addEventListener("click", () => {
              links.classList.toggle("open");
              toggle.classList.toggle("open");
              if (overlay) overlay.classList.toggle("active");
            });

            if (overlay) overlay.addEventListener("click", closeMenu);

            // Close menu when a link is clicked (mobile)
            links.querySelectorAll("a").forEach(a => {
              a.addEventListener("click", () => {
                if (window.matchMedia("(max-width: 820px)").matches) closeMenu();
              });
            });
          }

          // Mobile dropdowns (tap to expand)
          const isMobile = () => window.matchMedia("(max-width: 820px)").matches;

          document.querySelectorAll(".dropdown .dropbtn").forEach(btn => {
            btn.addEventListener("click", (e) => {
              if (!isMobile()) return;        // desktop: allow normal navigation/hover
              e.preventDefault();             // mobile: prevent navigation on first tap
              const parent = btn.closest(".dropdown");
              if (!parent) return;
              parent.classList.toggle("open");
            });
          });

          // Optional: close dropdowns when clicking outside (mobile)
          document.addEventListener("click", (e) => {
            if (!isMobile()) return;
            if (e.target.closest(".dropdown")) return;
            document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
          });
        }
      })
      .catch(err => console.error(`Failed to load ${file}:`, err));
  }

  injectFragment("nav-placeholder", "nav.html");
  injectFragment("footer-placeholder", "footer.html");
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("epSubsModal");
  if (!modal) return;

  const KEY = "ep_subs_modal_dismissed_v3";
  const path = location.pathname.toLowerCase();
  if (path.includes("pricing") || path.includes("contact")) return;
  if (localStorage.getItem(KEY)) return;

  let opened = false;

  const open = () => {
    if (opened) return;
    opened = true;
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    cleanup();
  };

  const close = () => {
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
    localStorage.setItem(KEY,"1");
    cleanup();
  };

  modal.addEventListener("click", e => {
    if (e.target.matches("[data-ep-close]")) close();
  });

  window.addEventListener("keydown", e => {
    if (e.key === "Escape") close();
  });

  // Triggers
  const onScroll = () => {
    const d = document.documentElement;
    if ((d.scrollTop / (d.scrollHeight - d.clientHeight)) > 0.4) open();
  };

  const onExit = e => {
    if (e.clientY <= 0) open();
  };

  const timer = setTimeout(open, 15000);

  const cleanup = () => {
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("mouseout", onExit);
    clearTimeout(timer);
  };

  window.addEventListener("scroll", onScroll, { passive:true });
  document.addEventListener("mouseout", onExit);
});
