export const BLOCK_SIZE = 12;

export const setFieldSize = (
  currentSize: number,
  direction = "positive",
  blockSize = BLOCK_SIZE
): number => {
  let s = currentSize;
  while (s % blockSize !== 0) {
    s = direction === "positive" ? s + 1 : s - 1;
  }
  return s;
};

export const createBrick = (id: string): HTMLDivElement => {
  const div = document.createElement("div");
  div.id = `brick-${id}`;
  div.className = "brick";
  return div;
};

export const generateBricks = (
  w: number,
  h: number
): Record<string, HTMLDivElement> => {
  const result = {};
  const rows = h / (BLOCK_SIZE + 1);
  const columns = w / BLOCK_SIZE;
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < columns; j += 1) {
      const id = `${i}-${j}`;
      result[id] = createBrick(id);
    }
  }
  return result;
};

export const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

export const getMaxLeft = (el: Element): number => {
  return +Math.max(
    ...Array.from(el.querySelectorAll("[id^='brick-0']")).map(
      (el) => el.id.split("-")[1]
    )
  );
};

export const getMaxTop = (el: Element): number => {
  const arr = Array.from(el.querySelectorAll(".brick"));
  return +arr[arr.length - 1].id.split("-")[1];
};
