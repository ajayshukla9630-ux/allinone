import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ================= FIREBASE INIT =================
const firebaseConfig = {
  apiKey: "AIzaSyA-iZvVroV-H6aRs7X-mlnt_ra3_vnaNzg",
  authDomain: "allinone-aa89.firebaseapp.com",
  projectId: "allinone-aa89",
  storageBucket: "allinone-aa89.firebasestorage.app",
  messagingSenderId: "924003122498",
  appId: "1:924003122498:web:2c86505457236e60055cdb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= EMAILJS INIT =================
emailjs.init("-HjIyXVqfuRKrznVE");

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("mpbhojForm");
  if (!form) return;

  // submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const serviceType = getActiveService();

      const data = {};
      form.querySelectorAll("[name]").forEach(el => {
        data[el.name] = el.value;
      });

      const docRef = await addDoc(collection(db, "mpbhojApplications"), {
        serviceType,
        ...data,
        status: "pending",
        createdAt: serverTimestamp()
      });

      const applicationNumber = "MPBHOJ-" + docRef.id.substring(0, 8).toUpperCase();

      await emailjs.send(
        "service_allinone",
        "template_7x246oi",
        {
          to_email: data.email,
          to_name: data.studentName || "Student",
          application_no: applicationNumber
        }
      );

      document.getElementById("alertBox").style.display = "block";
      form.reset();

      setTimeout(() => {
        document.getElementById("alertBox").style.display = "none";
      }, 3000);

    } catch (err) {
      console.error(err);
      alert("❌ कुछ त्रुटि हुई");
    }
  });
});

// ================= TAB LOGIC =================
window.openTab = function (i) {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(t => t.classList.remove("active"));
  contents.forEach(c => {
    c.classList.remove("active");
    // remove required
    c.querySelectorAll("[data-required]").forEach(el => el.removeAttribute("required"));
  });

  tabs[i].classList.add("active");
  contents[i].classList.add("active");

  // add required only to active tab
  contents[i].querySelectorAll("[data-required]").forEach(el => el.setAttribute("required", ""));
};

function getActiveService() {
  const tabs = document.querySelectorAll(".tab");
  const services = ["Admission", "Supplement", "Result", "Exam", "Other"];

  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].classList.contains("active")) return services[i];
  }
  return "Unknown";
}
