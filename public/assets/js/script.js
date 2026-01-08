// ================= HOME PAGE JS =================

// CATEGORY FILTER
function filterServices(category, btn) {
  const cards = document.querySelectorAll('.service-card');
  const tabs = document.querySelectorAll('.category-tab');

  tabs.forEach(tab => tab.classList.remove('active'));
  btn.classList.add('active');

  cards.forEach(card => {
    card.style.display =
      category === 'all' || card.dataset.category === category
        ? 'block'
        : 'none';
  });
}

// DOM READY
document.addEventListener("DOMContentLoaded", () => {

  // SEARCH
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('.service-card').forEach(card => {
        card.style.display =
          card.innerText.toLowerCase().includes(term)
            ? 'block'
            : 'none';
      });
    });
  }

  // HEADER
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      const h = document.getElementById("header");
      if (h) h.innerHTML = data;
    });

  // FOOTER
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      const f = document.getElementById("footer");
      if (f) f.innerHTML = data;
    });

});
