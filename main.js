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
