(() => {
  const q = document.getElementById("cs-q");
  const tagButtons = document.querySelectorAll(".cs-tag");
  const cards = document.querySelectorAll("[data-tags]");

  if (!q || !tagButtons.length || !cards.length) return;

  let activeTag = "all";

  const norm = (s) => (s || "").toLowerCase().trim();

  function apply() {
    const query = norm(q.value);

    cards.forEach(card => {
      const tags = norm(card.getAttribute("data-tags"));
      const text = norm(card.innerText);

      const tagOk = activeTag === "all" || tags.includes(activeTag);
      const queryOk = !query || text.includes(query);

      card.style.display = (tagOk && queryOk) ? "" : "none";
    });
  }

  tagButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tagButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      activeTag = btn.dataset.tag || "all";
      apply();
    });
  });

  q.addEventListener("input", apply);
  apply();
})();
