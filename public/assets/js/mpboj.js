console.log("MPBHOJ JS loaded");

// ===== TAB LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const index = tab.dataset.index;

      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      contents[index].classList.add("active");
    });
  });

  // ===== FORM SUBMIT =====
  const form = document.getElementById("mpbhojForm");
  const alertBox = document.getElementById("alertBox");
  const errorBox = document.getElementById("errorBox");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // 🔴 page reload रोकता है

      // 👉 अभी demo submit
      alertBox.style.display = "block";
      errorBox.style.display = "none";

      setTimeout(() => {
        alertBox.style.display = "none";
        form.reset();
      }, 3000);
    });
  }
});
