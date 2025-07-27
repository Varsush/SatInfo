let satelliteData = [];

fetch("satellites.json")
  .then((response) => response.json())
  .then((data) => {
    satelliteData = data;
    renderSatellites(satelliteData);
  })
  .catch((error) => console.error("Error loading satellites:", error));

function renderSatellites(data) {
  const container = document.getElementById("satellite-container");
  container.innerHTML = "";

  data.forEach((sat) => {
    const card = document.createElement("div");
    card.className = "satellite-card";

    card.innerHTML = `
      <h2>${sat.name}</h2>
      <p><strong>Launched:</strong> ${sat.launch}</p>
      <p><strong>Mission:</strong> ${sat.mission}</p>
      <p><strong>Status:</strong> ${sat.status}</p>
      <a class="more-info-btn" href="${sat.link}" target="_blank" onclick="playClick()">More Info</a>
    `;

    container.appendChild(card);
  });
}

// 🔍 Search by name, mission, or year
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = satelliteData.filter((sat) => {
    const launchYear = sat.launch?.match(/\d{4}/)?.[0] || "";
    return (
      sat.name.toLowerCase().includes(query) ||
      sat.mission.toLowerCase().includes(query) ||
      sat.status.toLowerCase().includes(query) ||
      launchYear.includes(query)
    );
  });
  renderSatellites(filtered);
});
// Create audio element
const clickSound = new Audio("sounds/click.mp3");

// Event delegation to catch clicks on dynamically created buttons
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("more-info-btn")) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

const backToTopBtn = document.getElementById("backToTopBtn");

// Show/hide rocket based on scroll
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

// On click — launch rocket AND scroll to top
backToTopBtn.addEventListener("click", () => {
  // Add the flying effect
  backToTopBtn.classList.add("blast-off");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // After animation ends, hide and reset
  setTimeout(() => {
    backToTopBtn.classList.remove("blast-off");
    backToTopBtn.style.display = "none";
  }, 1000); // 1s matches animation duration
});

document.addEventListener("DOMContentLoaded", function () {
  const facts = [
    "🌌 Sushant Singh Rajput was the only Indian actor to own a Meade LX-600 telescope, aspiring to educate students about space — from space.",
    "🚀 ISRO's Mars Orbiter Mission made India the first Asian country to reach Mars orbit!",
    "🌏 Chandrayaan-1 confirmed the presence of water on the Moon.",
    "🛰️ ISRO launched 104 satellites in a single mission – a world record!",
    "🌞 Aditya-L1 is India’s first mission to study the Sun.",
    "📡 INSAT series supports telecommunications, TV broadcasting, and weather forecasting.",
    "🌌 ISRO's AstroSat is India’s first dedicated multi-wavelength space observatory.",
    "🔭 RISAT satellites help in all-weather Earth observation, even through clouds!",
    "🛰️ GSAT-6A enhances mobile communication across remote areas in India.",
    "🚀 Gaganyaan will be India's first human spaceflight program",
    "🌕 Chandrayaan-2 successfully demonstrated lunar landing capabilities and studied the Moon's South Pole.",
    "🛰️ PSLV is ISRO's versatile workhorse launch vehicle, known for its reliability.",
    "🌌 Mangalyaan (MOM) provided valuable data on the Martian atmosphere and surface features.",
    "🛰️ IRNSS (NavIC) is India's independent regional satellite navigation system.",
    "🌍 Oceansat series contributes to oceanographic studies and coastal zone management.",
    "📡 EDUSAT (GSAT-3) was India's first satellite dedicated to educational services.",
    "☄️ XPoSat is ISRO's mission to study cosmic X-ray polarization",
    "🌌 Astrosat-2 will enhance multi-wavelength astronomy capabilities.",
    "🌠 ISRO's future missions include a Venus orbiter and a human spaceflight",
    "🛰️ RISAT-1 was India's first radar imaging satellite, launched in 2012.",
    "🛰️ Cartosat series satellites provide high-resolution Earth observation for mapping and urban planning.",
    "📡 GSAT series are primarily communication satellites for various services like DTH and VSAT.",
    "🌍 Resourcesat satellites are dedicated to remote sensing for natural resource management.",
    "🛰️ Oceansat-3 is designed for ocean color monitoring, sea surface temperature, and wind vector retrieval.",
    "🚀 Small Satellite Launch Vehicle (SSLV) is a new, cost-effective launch vehicle for small satellites.",
    "🛰️ INSAT-3DS is a meteorological satellite for enhanced weather forecasting and disaster warning.",
    "🛰️ EOS-07 is an Earth Observation Satellite for various land and ocean applications.",
    "🚀 GSLV Mk III (LVM3) is ISRO's heaviest launch vehicle, capable of launching 4-ton class satellites to GTO.",
    "🛰️ SCATSAT-1 provided ocean wind vector data for weather forecasting and cyclone prediction.",
    "🛰️ SARAL (Satellite with Argos and Altika) is a joint Indo-French mission for oceanographic studies.",
  ];

  let currentFact = 0;
  const factElement = document.getElementById("sat-fact");

  function rotateFacts() {
    factElement.textContent = facts[currentFact];
    currentFact = (currentFact + 1) % facts.length;
  }

  rotateFacts(); // Initial fact
  setInterval(rotateFacts, 7000);
});
const rocketBtn = document.getElementById("backToTopBtn");
const rocketSound = document.getElementById("rocketSound");

rocketBtn.addEventListener("click", () => {
  // Play rocket sound
  if (rocketSound) {
    rocketSound.currentTime = 0; // rewind to start
    rocketSound.play();
  }

  // Add launch animation
  rocketBtn.classList.add("launch");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Reset rocket after animation ends
  setTimeout(() => {
    rocketBtn.classList.remove("launch");
  }, 1000); // duration must match CSS animation time
});
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const startQuizBtn = document.getElementById("startQuizBtn");
  const quizModal = document.getElementById("quizModal");
  const quizCard = document.getElementById("quizCard");
  const quizCloseBtn = document.getElementById("quizCloseBtn");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");
  const quizTimer = document.getElementById("quizTimer");
  // Removed nextBtn references

  const quizQuestions = [
    {
      question: "Which was India’s first satellite?",
      options: ["Bhaskara-I", "Aryabhata", "INSAT-1A", "Rohini"],
      answer: "Aryabhata",
    },
    {
      question: "Which satellite is used for remote sensing in India?",
      options: ["INSAT", "GSAT", "IRS", "RISAT"],
      answer: "IRS",
    },
    {
      question: "Which ISRO satellite was launched to study the Sun?",
      options: ["Chandrayaan-2", "Cartosat", "Aditya-L1", "INSAT-3D"],
      answer: "Aditya-L1",
    },
    {
      question:
        "Which satellite series is used for meteorological observations?",
      options: ["INSAT", "GSAT", "NavIC", "Cartosat"],
      answer: "INSAT",
    },
    {
      question: "What does GSAT stand for?",
      options: [
        "Global Satellite",
        "Geo Sensing and Tracking",
        "Geostationary Satellite",
        "Ground Station Assisted Tracking",
      ],
      answer: "Geostationary Satellite",
    },
    {
      question:
        "Which ISRO mission successfully landed on the Moon's south pole?",
      options: ["Chandrayaan-1", "Mangalyaan", "Chandrayaan-3", "Rohini"],
      answer: "Chandrayaan-3",
    },
    {
      question: "Which Indian satellite helps in navigation?",
      options: ["IRNSS", "INSAT", "EDUSAT", "RISAT"],
      answer: "IRNSS",
    },
    {
      question: "Which Indian satellite was launched for Mars exploration?",
      options: ["Aditya-L1", "Chandrayaan-1", "Mangalyaan", "GSAT-6A"],
      answer: "Mangalyaan",
    },
    {
      question: "What is the main use of Cartosat satellites?",
      options: [
        "Communication",
        "Agriculture",
        "High-resolution Earth imaging",
        "Navigation",
      ],
      answer: "High-resolution Earth imaging",
    },
    {
      question: "Which satellite provides education and medical services?",
      options: ["INSAT-4A", "EDUSAT", "GSAT-30", "RISAT-2B"],
      answer: "EDUSAT",
    },
    {
      question: "What is the full form of PSLV?",
      options: [
        "Payload Satellite Launch Vehicle",
        "Polar Satellite Launch Vehicle",
        "Primary Space Launch Vehicle",
        "Passenger Satellite Launch Vehicle",
      ],
      answer: "Polar Satellite Launch Vehicle",
    },
    {
      question:
        "Which launch vehicle placed the Chandrayaan-3 mission in orbit?",
      options: ["PSLV-C57", "GSLV Mk III", "PSLV-C11", "SSLV-D2"],
      answer: "GSLV Mk III",
    },
    {
      question: "Which Indian satellite monitors oceans?",
      options: ["INSAT-3D", "Oceansat", "RISAT-1A", "GSAT-10"],
      answer: "Oceansat",
    },
    {
      question:
        "Which satellite series supports internet and communication in India?",
      options: ["Cartosat", "RISAT", "GSAT", "Aditya"],
      answer: "GSAT",
    },
    {
      question: "Which satellite launched by ISRO in 2021 tracked enemy radar?",
      options: ["RISAT-2BR2", "GSAT-30", "INSAT-4B", "IRNSS-1I"],
      answer: "RISAT-2BR2",
    },
    {
      question: "What is the primary purpose of NavIC?",
      options: [
        "Meteorology",
        "Weather Forecasting",
        "Navigation",
        "Telecommunication",
      ],
      answer: "Navigation",
    },
    {
      question:
        "Which satellite was India’s first dedicated astronomy mission?",
      options: ["INSAT-3D", "GSAT-6", "ASTROSAT", "EDUSAT"],
      answer: "ASTROSAT",
    },
    {
      question:
        "Which Indian satellite helps track cyclones and weather patterns?",
      options: ["INSAT-3D", "IRNSS-1C", "GSAT-29", "RISAT-1A"],
      answer: "INSAT-3D",
    },
    {
      question:
        "Which satellite was launched under the Gaganyaan test mission?",
      options: ["IRNSS-1H", "Vyommitra", "TV-D1", "RISAT-2"],
      answer: "TV-D1",
    },
    {
      question:
        "Which Indian satellite is used for high-speed internet coverage?",
      options: ["GSAT-11", "Cartosat-3", "INSAT-4CR", "Aditya-L1"],
      answer: "GSAT-11",
    },
    {
      question:
        "Which satellite launched in 2023 was ISRO's heaviest satellite?",
      options: ["RISAT-2", "GSAT-11", "Chandrayaan-3", "GSAT-30"],
      answer: "GSAT-11",
    },
    {
      question:
        "Which Indian satellite helps monitor agriculture and forest cover?",
      options: ["INSAT-3C", "Cartosat-2", "Resourcesat", "GSAT-19"],
      answer: "Resourcesat",
    },
    {
      question: "Which Indian navigation satellite failed in 2017?",
      options: ["IRNSS-1H", "IRNSS-1G", "GSAT-15", "INSAT-4G"],
      answer: "IRNSS-1H",
    },
    {
      question:
        "Which satellite series is built mainly for military surveillance?",
      options: ["Cartosat", "RISAT", "INSAT", "NavIC"],
      answer: "RISAT",
    },
    {
      question:
        "Which satellite helped ISRO monitor Kumbh Mela crowd movement?",
      options: ["RISAT-2B", "Cartosat-3", "INSAT-3D", "GSAT-31"],
      answer: "Cartosat-3",
    },
    {
      question:
        "Which ISRO satellite was launched to test reusable rocket tech?",
      options: ["GSLV Mk II", "RLV-TD", "SSLV-D1", "GSAT-10"],
      answer: "RLV-TD",
    },
    {
      question:
        "Which ISRO satellite was used for Earth observation and disaster warning?",
      options: ["INSAT-3A", "INSAT-1B", "INSAT-3DR", "IRNSS-1A"],
      answer: "INSAT-3DR",
    },
    {
      question:
        "Which Indian satellite detected underground water using microwaves?",
      options: ["Cartosat-2C", "RISAT-1", "EDUSAT", "INSAT-3D"],
      answer: "RISAT-1",
    },
    {
      question:
        "Which Indian satellite program supports e-governance initiatives?",
      options: ["INSAT", "Bhuvan", "NavIC", "GSAT"],
      answer: "Bhuvan",
    },
    {
      question: "Which launch vehicle failed during its maiden flight in 2022?",
      options: ["GSLV Mk III", "PSLV-C49", "SSLV-D1", "GSLV F10"],
      answer: "SSLV-D1",
    },
  ];

  let currentQuestion = 0;
  let timer;
  let timeLeft = 15;

  function showQuestion() {
    const q = quizQuestions[currentQuestion];
    quizQuestion.textContent = q.question;
    quizOptions.innerHTML = "";
    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.classList.add("quiz-option");
      btn.onclick = () => selectAnswer(btn, q.answer);
      quizOptions.appendChild(btn);
    });
    timeLeft = 15;
    quizTimer.textContent = `${timeLeft} sec left`;
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      quizTimer.textContent = `${timeLeft} sec left`;
      if (timeLeft === 0) {
        clearInterval(timer);
        quizOptions.querySelectorAll("button").forEach((btn) => {
          btn.disabled = true;
          if (btn.textContent === q.answer) btn.classList.add("correct");
        });
        autoNext();
      }
    }, 1000);
  }

  function selectAnswer(btn, correctAnswer) {
    clearInterval(timer);
    const allOptions = quizOptions.querySelectorAll("button");
    allOptions.forEach((option) => {
      option.disabled = true;
      if (option.textContent === correctAnswer) {
        option.classList.add("correct");
      } else if (option === btn) {
        btn.classList.add("wrong");
      }
    });
    autoNext();
  }

  function autoNext() {
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizQuestions.length) {
        showQuestion();
      } else {
        quizModal.style.display = "none";
        alert("🎉 Quiz completed!");
        currentQuestion = 0;
      }
    }, 1000);
  }

  startQuizBtn.onclick = () => {
    quizModal.style.display = "flex";
    showQuestion();
  };

  quizCloseBtn.onclick = () => {
    quizModal.style.display = "none";
    clearInterval(timer);
  };
});
let categoryData = [];

fetch("satellites.json")
  .then((res) => res.json())
  .then((data) => {
    categoryData = data;
    populateCategoryButtons(categoryData);
  });

// 🧠 Load categories into modal
function populateCategoryButtons(data) {
  const categoryList = document.getElementById("categoryList");
  const filterModal = document.getElementById("filterModal");

  // Extract unique category values
  const categories = [
    ...new Set(data.map((item) => item.category).filter(Boolean)),
  ].sort();

  categoryList.innerHTML = "";

  if (categories.length === 0) {
    categoryList.innerHTML = "<p style='color:white;'>No categories found.</p>";
    return;
  }

  categories.forEach((cat) => {
    const optionBtn = document.createElement("button");
    optionBtn.textContent = cat;
    optionBtn.className = "category-btn";
    optionBtn.onclick = () => {
      const filtered = categoryData.filter((sat) => sat.category === cat);
      renderSatellites(filtered);
      filterModal.style.display = "none";
    };
    categoryList.appendChild(optionBtn);
  });

  const showAllBtn = document.createElement("button");
  showAllBtn.textContent = "Show All";
  showAllBtn.className = "category-btn";
  showAllBtn.onclick = () => {
    renderSatellites(categoryData);
    filterModal.style.display = "none";
  };
  categoryList.appendChild(showAllBtn);
}

// 🎯 Modal open/close
document.getElementById("filterBtn").addEventListener("click", () => {
  document.getElementById("filterModal").style.display = "flex";
});
document.getElementById("filterCloseBtn").addEventListener("click", () => {
  document.getElementById("filterModal").style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === document.getElementById("filterModal")) {
    document.getElementById("filterModal").style.display = "none";
  }
});
// 🌍 Create ISS tracking box
const trackingBox = document.createElement("div");
trackingBox.className = "tracking-box";
trackingBox.innerHTML = `
  <h3>🛰️ ISS Live Position</h3>
  <p>
    📍 Lat: <span id="lat">--</span>°<br/>
    📍 Lon: <span id="lon">--</span>°<br/>
    🪐 Alt: <span id="alt">--</span> km
  </p>
  <button id="useLocationBtn">📍 Use My Location</button>
  <p id="locationStatus"></p>
`;
document
  .getElementById("facts-box")
  ?.insertAdjacentElement("afterend", trackingBox);

// 📡 Update UI
function updateISSUI(pos) {
  document.getElementById("lat").textContent = pos.satlatitude.toFixed(2);
  document.getElementById("lon").textContent = pos.satlongitude.toFixed(2);
  document.getElementById("alt").textContent = pos.sataltitude.toFixed(2);
}

// 📡 Fetch ISS data from your Node proxy
function fetchISSPosition(lat, lon) {
  fetch("http://localhost:5000/iss-position", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lat: lat, lon: lon }),
  })
    .then((res) => res.json())
    .then((data) => {
      const position = data.positions?.[0];
      if (position) {
        updateISSUI(position);
        console.log("✅ ISS Data:", position);
      } else {
        document.getElementById("locationStatus").textContent =
          "⚠️ Unable to get ISS data.";
      }
    })
    .catch((err) => {
      console.error("❌ Error fetching ISS position:", err);
      document.getElementById("locationStatus").textContent =
        "⚠️ Failed to contact proxy server.";
    });
}

// 📍 Handle "Use My Location" button
document.addEventListener("DOMContentLoaded", () => {
  const useLocationBtn = document.getElementById("useLocationBtn");
  const status = document.getElementById("locationStatus");

  useLocationBtn?.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          status.textContent = `📍 Using your location: ${latitude.toFixed(
            2
          )}, ${longitude.toFixed(2)}`;
          fetchISSPosition(latitude, longitude);
        },
        () => {
          status.textContent = "⚠️ Location access denied.";
        }
      );
    } else {
      status.textContent = "⚠️ Geolocation not supported.";
    }
  });
});
