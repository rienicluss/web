document.addEventListener('DOMContentLoaded', () => {
  // ===== NAV TABS =====
  const tabs = document.querySelectorAll('nav ul li a');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // let the browser follow the link normally
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // ===== REMINDERS =====
  const form = document.getElementById('reminderForm');
  const input = document.getElementById('reminderInput');
  const list  = document.getElementById('reminderList');

  const defaultReminders = [
    "🌞 don't let the pressuree get into youu.",
    "💧 Don’t forget to drink water and eatt hmpp.",
    "🌸 You're always pretty and beautifull remember thatt",
    "🧸 Rest when you need to, don't push yourself too much",
    "❤️ iwuvvyuuuuuu, always po hihi."
  ];

  let userReminders = JSON.parse(localStorage.getItem('userReminders')) || [];

  // render defaults (no delete)
  defaultReminders.forEach(text => addReminder(text, false));
  // render saved user reminders (with delete)
  userReminders.forEach(text => addReminder(text, true));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    userReminders.push(text);
    localStorage.setItem('userReminders', JSON.stringify(userReminders));
    addReminder(text, true);
    input.value = '';
  });

  function addReminder(text, canDelete) {
    const li = document.createElement('li');
    li.textContent = text;

    if (!canDelete) {
      li.classList.add('default-reminder');
    } else {
      const del = document.createElement('button');
      del.textContent = '❌';
      del.className = 'delete-btn';
      del.addEventListener('click', () => {
        list.removeChild(li);
        userReminders = userReminders.filter(r => r !== text);
        localStorage.setItem('userReminders', JSON.stringify(userReminders));
      });
      li.appendChild(del);
    }

    list.appendChild(li);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("photoUpload");
  const gallery = document.getElementById("gallery");

  // Load any previously saved images from localStorage
  const savedImages = JSON.parse(localStorage.getItem("memories")) || [];
  savedImages.forEach(src => addImage(src));

  // When the user selects new photos
  fileInput.addEventListener("change", (e) => {
    const files = e.target.files;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;

        // Show the image immediately
        addImage(base64);

        // Save it so it remains after refresh
        savedImages.push(base64);
        localStorage.setItem("memories", JSON.stringify(savedImages));
      };
      reader.readAsDataURL(file);
    });

    // Clear the file input so the same image can be re-uploaded if desired
    fileInput.value = "";
  });

  function addImage(src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Uploaded memory";
    gallery.appendChild(img);
  }
});

document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const user = document.getElementById("username").value.trim().toLowerCase();
      const pass = document.getElementById("password").value.trim();

      // Demo credentials
      if (user === "hana_rie" && pass === "hllsrbpa") {
        localStorage.setItem("isLoggedIn", "true"); // ✅ mark as logged in
        alert("Welcome, Hannah! 💜");
        window.location.href = "hihi.html"; // redirect to homepage
      } else {
        alert("Oops! Wrong username or password.");
      }
    });

document.addEventListener("DOMContentLoaded", () => {
    const logout = document.getElementById("logoutBtn");
    logout.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      alert("You’ve been logged out 💜");
      window.location.href = "login.html";
    });
  });