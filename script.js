let powerOn = true;
let currentBank = 0;

const banks = [
  [
    {
      key: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      key: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      key: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      key: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      key: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      key: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      key: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      key: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      key: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ],
  [
    {
      key: "Q",
      id: "Chord-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    },
    {
      key: "W",
      id: "Chord-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    },
    {
      key: "E",
      id: "Chord-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    },
    {
      key: "A",
      id: "Shaker",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    },
    {
      key: "S",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    },
    {
      key: "D",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    },
    {
      key: "Z",
      id: "Punchy-Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    },
    {
      key: "X",
      id: "Side-Stick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    },
    {
      key: "C",
      id: "Snare",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    },
  ],
];

const padBank = document.getElementById("pad-bank");
const display = document.getElementById("display");
const volumeSlider = document.getElementById("volume");
const powerBtn = document.getElementById("power");
const bankBtn = document.getElementById("bank");
const controls = document.getElementById("controls");
const drumMachine = document.getElementById("drum-machine");

let timeoutId = null;

function updateDisplay(msg) {
  clearTimeout(timeoutId);
  display.textContent = msg;
  timeoutId = setTimeout(() => (display.textContent = ""), 3000);
}

function renderPads() {
  padBank.innerHTML = "";
  banks[currentBank].forEach((pad) => {
    const padDiv = document.createElement("div");
    padDiv.classList.add("drum-pad");
    padDiv.id = pad.id;
    padDiv.textContent = pad.key;
    padDiv.setAttribute("data-sound", pad.url);

    const audio = document.createElement("audio");
    audio.classList.add("clip");
    audio.id = pad.key;
    audio.src = pad.url;

    padDiv.appendChild(audio);
    padBank.appendChild(padDiv);

    padDiv.addEventListener("click", () => {
      if (!powerOn) return;
      playSound(pad.key);
      updateDisplay(pad.id);
      padDiv.classList.add("active");
      setTimeout(() => padDiv.classList.remove("active"), 200);
    });
  });
}

function playSound(key) {
  const audio = document.getElementById(key);
  if (audio) {
    audio.currentTime = 0;
    audio.volume = volumeSlider.value;
    audio.play();
  }
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();
  if (!powerOn) return;
  const pad = document.getElementById(key);
  if (pad) pad.parentElement.click();
});

volumeSlider.addEventListener("input", () => {
  if (powerOn) {
    updateDisplay("Volume: " + Math.round(volumeSlider.value * 100) + "%");
  }
});

powerBtn.addEventListener("click", () => {
  powerOn = !powerOn;
  powerBtn.textContent = powerOn ? "Power OFF" : "Power ON";
  drumMachine.classList.toggle("powered-off", !powerOn);
  controls.classList.toggle("inactive", !powerOn);
  display.classList.remove("inactive");
  bankBtn.classList.toggle("inactive", !powerOn);

  if (powerOn) {
    updateDisplay("Power ON");
  } else {
    clearTimeout(timeoutId);
    display.textContent = "Power OFF";
  }
});

bankBtn.addEventListener("click", () => {
  if (!powerOn) return;
  currentBank = (currentBank + 1) % banks.length;
  renderPads();
  updateDisplay(currentBank === 0 ? "Bank: Heater" : "Bank: Piano");
});

// Initial render
renderPads();
