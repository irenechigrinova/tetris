import "./main.scss";

import {
  setFieldSize,
  generateBricks,
  BLOCK_SIZE,
  generateRandomNumber,
} from "./utils";
import { handleTurnOn, handleTurnOff, handleStart, handlePause } from "./ui";
import { TSelectors, SHAPES } from "./types";

const selectors: TSelectors = {
  gameField: document.querySelector(".field")!,
  gameWindow: document.querySelector(".window")!,
  highScore: document.querySelector(".hi-score .value")!,
  info: document.querySelector(".info")!,
  nextField: document.querySelector(".field-next")!,
};

selectors.highScore.innerHTML = localStorage.getItem("hi-score") ?? "00000";

const { width: currentFieldWidth, height: currentFieldHeight } =
  selectors.gameField.getBoundingClientRect();
const newWidth = setFieldSize(Math.floor(currentFieldWidth));
const newHeight = setFieldSize(
  Math.floor(currentFieldHeight),
  "negative",
  BLOCK_SIZE + 1
);

selectors.gameField.style.width = "fit-content";
selectors.gameField.style.gridTemplateColumns = `repeat(${
  newWidth / BLOCK_SIZE
}, ${BLOCK_SIZE}px)`;
selectors.gameField.style.gridTemplateRows = `repeat(${
  newHeight / BLOCK_SIZE - 2
}, ${BLOCK_SIZE}px)`;

selectors.gameWindow.style.height = `${newHeight + 16}px`;

const bricks = generateBricks(newWidth, newHeight);
const state = {
  power: "off",
  status: "idle",
  score: 0,
  nextElement: SHAPES[generateRandomNumber(0, SHAPES.length - 1)],
  nextElementRotation: "S",
  currentElement: null,
  currentRotation: "S",
};

Object.entries(bricks).forEach(([_, node]) => {
  selectors.gameField.appendChild(node);
});

const nextBricks = generateBricks(48, 26);

Object.entries(nextBricks).forEach(([_, node]) => {
  selectors.nextField.appendChild(node);
});

// start
handleTurnOff(selectors);

// events

// power events
const emitPowerEvent = () => {
  const powerEvent = new CustomEvent(state.power === "off" ? "on" : "off");
  window.dispatchEvent(powerEvent);
};
document.querySelector(".power").addEventListener("click", emitPowerEvent);
window.addEventListener("on", () => {
  state.power = "on";
  handleTurnOn(selectors, state.nextElement, state.nextElementRotation);
});

window.addEventListener("off", () => {
  state.power = "off";
  state.status = "idle";
  state.score = 0;
  state.nextElement = SHAPES[generateRandomNumber(0, SHAPES.length)];
  state.nextElementRotation = "S";
  handleTurnOff(selectors);
});

// status events
const emitStatusEvent = () => {
  const event =
    state.status === "idle"
      ? "play"
      : state.status === "playing"
      ? "pause"
      : "play";
  const statusEvent = new CustomEvent(event);
  window.dispatchEvent(statusEvent);
};
document.querySelector(".start").addEventListener("click", emitStatusEvent);
window.addEventListener("play", () => {
  if (state.power === "off") return;

  state.status = "playing";
  handleStart(selectors);
});
window.addEventListener("pause", () => {
  if (state.power === "off") return;

  state.status = "pause";
  handlePause(selectors);
});

// keyboard events
document.body.addEventListener("keydown", (e) => {
  if (e.key === "q") emitPowerEvent();
  if (e.key === "s") emitStatusEvent();
});
