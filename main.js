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
