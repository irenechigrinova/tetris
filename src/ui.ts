import { TSelectors, TRotation, TShape } from "./types";
import { getMaxLeft, getMaxTop } from "./utils";
import { setMethod } from "./elementsPosition";

export const drawElement = (
  shape: TShape,
  rotation: TRotation,
  parent: Element,
  top = 0,
  left = 0
) => {
  const maxLeft = getMaxLeft(parent);
  const maxTop = getMaxTop(parent);
  const method = setMethod(shape);
  const position = method(rotation, { top, left, maxLeft, maxTop });
  position.forEach((id) => {
    parent.querySelector(`#brick-${id}`).classList.add("selected");
  });
};

export const handleTurnOn = (
  selectors: TSelectors,
  nextElement: TShape,
  rotation: TRotation
): void => {
  selectors.info.style.visibility = "visible";
  selectors.gameField.style.opacity = "1";

  drawElement(nextElement, rotation, selectors.nextField);
};

export const handleTurnOff = (selectors: TSelectors): void => {
  selectors.info.style.visibility = "hidden";
  selectors.gameField.style.opacity = "0.2";
  selectors.info.querySelector(".status .title").innerHTML = "start";
  Array.from(document.body.querySelectorAll(".brick.selected")).forEach(
    (node) => {
      node.classList.remove("selected");
    }
  );
};

let timer;
export const handleStart = (selectors: TSelectors): void => {
  selectors.info.querySelector(".status .title").innerHTML = "";
};

export const handlePause = (selectors: TSelectors): void => {
  selectors.info.querySelector(".status .title").innerHTML = "pause";
};
