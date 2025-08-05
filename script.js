let currentLikeCount = 0;

window.onload = function () {
  const saved = JSON.parse(localStorage.getItem("thoughts")) || {};
  for (const emotion in saved) {
    saved[emotion].forEach(thought => {
      addThoughtToUI(emotion, thought);
    });
  }
};

function toggleLike() {
  currentLikeCount = currentLikeCount === 0 ? 1 : 0;
  const btn = document.getElementById("likeToggle");
  btn.classList.toggle("liked", currentLikeCount > 0);
  btn.innerHTML = `❤️ ${currentLikeCount}`;
}


function submitThought() {
  const input = document.getElementById("thoughtInput");
  const nameInput = document.getElementById("nameInput");
  const emotion = document.getElementById("emotionSelect").value;
  const thoughtText = input.value.trim();
  const name = nameInput.value.trim();

  if (thoughtText === "") {
    alert("Please write something.");
    return;
  }

  const now = new Date();
  const timestamp = now.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const thoughtObj = {
    text: thoughtText,
    likes: currentLikeCount,
    name: name || "Anonymous",
    timestamp: timestamp
  };

  addThoughtToUI(emotion, thoughtObj);
  saveThought(emotion, thoughtObj);

  // Clear inputs and reset like
  input.value = "";
  nameInput.value = "";
  currentLikeCount = 0;

  const btn = document.getElementById("likeToggle");
  btn.classList.remove("liked");
  btn.innerHTML = "❤️ 0";
}


  function addThoughtToUI(emotion, thought) {
  const container = document.querySelector(`#${emotion} .thoughts`);
  const bubble = document.createElement("div");
  bubble.className = `thought-bubble ${emotion}`;

  bubble.innerHTML = `
    <div class="bubble-text">${thought.text}</div>
    <div class="meta">
      <span class="name">– ${thought.name}</span>
      <span class="timestamp">${thought.timestamp}</span>
    </div>
    <div class="like-count">❤️ ${thought.likes}</div>
  `;

  container.prepend(bubble);
}
function saveThought(emotion, thoughtObj) {
  const thoughts = JSON.parse(localStorage.getItem("thoughts")) || {};
  if (!thoughts[emotion]) thoughts[emotion] = [];
  thoughts[emotion].push(thoughtObj);
  localStorage.setItem("thoughts", JSON.stringify(thoughts));
}

const emotionSelect = document.getElementById("emotionSelect");
emotionSelect.addEventListener("change", updateBubbleColor);

function updateBubbleColor() {
  const emotion = emotionSelect.value;
  const textarea = document.getElementById("thoughtInput");
  const colorMap = {
    joy: "#fff3cd",        // soft yellow
    curious: "#d1ecf1",    // light blue
    amazed: "#f8d7da",     // light red
    inspired: "#e2e3ff",   // lavender
    calm: "#d4edda",       // light green
    rebellious: "#fbe9e7"  // soft orange
  };

  const color = colorMap[emotion] || "#dcf8c6";
  textarea.style.setProperty("--bubble-color", color);
}

updateBubbleColor();


const themeToggle = document.getElementById("themeToggle");
  const app = document.querySelector(".app-container");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    app.classList.remove("light");
    app.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    app.classList.remove("dark");
    app.classList.add("light");
    themeToggle.textContent = "🌙 Dark Mode";
  }

  themeToggle.addEventListener("click", () => {
    if (app.classList.contains("dark")) {
      app.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙 Dark Mode";
    } else {
      app.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️ Light Mode";
    }
  });

  