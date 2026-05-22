const TOTAL_STAMPS = 4;

const params = new URLSearchParams(window.location.search);
const stampId = params.get("stamp");

let stamps = JSON.parse(localStorage.getItem("stamps")) || [];

if (stampId && !stamps.includes(stampId)) {
  stamps.push(stampId);
  localStorage.setItem("stamps", JSON.stringify(stamps));

  showPopup(stampId);

  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
}

const grid = document.getElementById("stampGrid");

for (let i = 1; i <= TOTAL_STAMPS; i++) {
  const div = document.createElement("div");

  div.classList.add("stamp");

  if (stamps.includes(String(i))) {
    div.classList.add("active");
    div.innerHTML = `スタンプ ${i}`;
  } else {
    div.innerHTML = `???`;
  }

  grid.appendChild(div);
}

const progressText = document.getElementById("progressText");
progressText.textContent = `${stamps.length} / ${TOTAL_STAMPS} 個獲得`;

if (stamps.length >= TOTAL_STAMPS) {
  setTimeout(() => {
    window.location.href = "complete.html";
  }, 1500);
}

function showPopup(id) {
  const popup = document.getElementById("popup");
  const stampText = document.getElementById("stampText");

  stampText.textContent = `スタンプ ${id} を獲得しました！`;

  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 1500);
}

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("stamps");
  location.href = "index.html";
});
