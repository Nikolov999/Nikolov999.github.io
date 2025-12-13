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
          if (toggle && links) {
            toggle.addEventListener("click", () => {
              links.classList.toggle("open");
            });
          }
        }
      })
      .catch(err => console.error(`Failed to load ${file}:`, err));
  }

  injectFragment("nav-placeholder", "nav.html");
  injectFragment("footer-placeholder", "footer.html");
});
(() => {
  const modal = document.getElementById("epSubsModal");
  if (!modal) return;

  const KEY = "ep_subs_modal_dismissed_v2";

  // Don’t show on pages where user is already deciding
  const path = (location.pathname || "").toLowerCase();
  if (path.includes("pricing") || path.includes("contact")) return;

  // Show once per browser
  if (localStorage.getItem(KEY) === "1") return;

  let opened = false;

  const open = () => {
    if (opened) return;
    opened = true;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    cleanupTriggers();
  };

  const close = () => {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    localStorage.setItem(KEY, "1");
    cleanupTriggers();
  };

  // Close interactions
  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-ep-close]")) close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") close();
  });

  // --- Triggers (scroll / time / exit intent) ---
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight || document.body.scrollHeight;
    const clientHeight = doc.clientHeight || window.innerHeight;

    const maxScrollable = Math.max(1, scrollHeight - clientHeight);
    const progress = scrollTop / maxScrollable;

    if (progress >= 0.40) open();
  };

  // Exit intent (desktop): when mouse leaves top of viewport
  const onMouseOut = (e) => {
    // Only consider real exit intent, not moving between elements
    if (e.relatedTarget !== null) return;
    if (typeof e.clientY === "number" && e.clientY <= 0) open();
  };

  // Time trigger: 15 seconds
  const timeTimer = setTimeout(() => open(), 15000);

  const cleanupTriggers = () => {
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("mouseout", onMouseOut);
    clearTimeout(timeTimer);
  };

  // Attach triggers
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("mouseout", onMouseOut);

  // Optional: if user is already deep in page when loaded
  setTimeout(onScroll, 600);
})();
