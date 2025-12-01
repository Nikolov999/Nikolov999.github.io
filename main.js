// -----------------------------
// 1) Microsoft Clarity tracking
// -----------------------------
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/YOUR_CLARITY_ID";
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "uetx3tchok");

// -----------------------------
// 2) DOM Ready
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------
  // 2a) Inject nav & footer
  // -----------------------------
  function injectFragment(placeholderId, file) {
    const el = document.getElementById(placeholderId);
    if (!el) return;

    fetch(file)
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html;

        // If we just injected the nav, wire up burger menu
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

  // -----------------------------
  // 2b) GA4 helper
  // -----------------------------
  function trackEvent(name, params) {
    if (typeof gtag === "function") {
      gtag("event", name, params || {});
    } else {
      console.debug("gtag not available, event skipped:", name, params);
    }
  }

  // -----------------------------
  // 2c) Track CTA clicks
  // -----------------------------

  // Book a Pentest clicks (buttons or links)
  document.querySelectorAll('a[href*="book-a-pentest"]').forEach(el => {
    el.addEventListener("click", () => {
      trackEvent("cta_book_pentest_click", {
        page_location: window.location.href,
        page_title: document.title
      });
    });
  });

  // Contact clicks
  document.querySelectorAll('a[href*="contact.html"], a[href^="mailto:contact@echopentest.com"]').forEach(el => {
    el.addEventListener("click", () => {
      trackEvent("cta_contact_click", {
        page_location: window.location.href,
        page_title: document.title
      });
    });
  });

  // Checklist PDF downloads
  document.querySelectorAll('a[href*="Checklist/cybersecurity_checklist"]').forEach(el => {
    el.addEventListener("click", () => {
      trackEvent("checklist_download", {
        page_location: window.location.href,
        page_title: document.title
      });
    });
  });

  // -----------------------------
  // 2d) Scroll depth tracking
  // -----------------------------
  let fiftySent = false;
  let ninetySent = false;

  function handleScrollDepth() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;
    if (maxScroll <= 0) return;

    const percent = (scrollTop / maxScroll) * 100;

    if (!fiftySent && percent >= 50) {
      fiftySent = true;
      trackEvent("scroll_50", {
        page_location: window.location.href,
        page_title: document.title,
        scroll_percent: 50
      });
    }
    if (!ninetySent && percent >= 90) {
      ninetySent = true;
      trackEvent("scroll_90", {
        page_location: window.location.href,
        page_title: document.title,
        scroll_percent: 90
      });
    }
  }

  window.addEventListener("scroll", handleScrollDepth, { passive: true });
  handleScrollDepth(); // in case page loads already scrolled (mobile browser bars etc.)
});
