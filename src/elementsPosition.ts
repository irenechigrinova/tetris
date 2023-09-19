import { TRotation, TShape } from "./types";

type TParams = {
  top: number;
  left: number;
  maxTop: number;
  maxLeft: number;
};

export const LPosition = (rotation: TRotation, params: TParams): string[] => {
  switch (rotation) {
    default:
    case "S": {
      const top = params.top === params.maxTop ? params.top - 1 : params.top;
      const left =
        params.maxLeft - params.left < 2
          ? params.left - (params.maxLeft - params.left)
          : params.left;
      return [
        `${top}-${left + 2}`,
        `${top + 1}-${left}`,
        `${top + 1}-${left + 1}`,
        `${top + 1}-${left + 2}`,
      ];
    }
  }
};

export const JPosition = (rotation: TRotation, params: TParams): string[] => {
  switch (rotation) {
    default:
    case "S": {
      const top = params.top === params.maxTop ? params.top - 1 : params.top;
      const left =
        params.maxLeft - params.left < 2
          ? params.left - (params.maxLeft - params.left)
          : params.left;
      return [
        `${top}-${left}`,
        `${top + 1}-${left}`,
        `${top + 1}-${left + 1}`,
        `${top + 1}-${left + 2}`,
      ];
    }
  }
};

export const ZPosition = (rotation: TRotation, params: TParams): string[] => {
  switch (rotation) {
    default:
    case "S": {
      const top = params.top === params.maxTop ? params.top - 1 : params.top;
      const left =
        params.maxLeft - params.left < 2
          ? params.left - (params.maxLeft - params.left)
          : params.left;
      return [
        `${top}-${left}`,
        `${top}-${left + 1}`,
        `${top + 1}-${left + 1}`,
        `${top + 1}-${left + 2}`,
      ];
    }
  }
};

export const TPosition = (rotation: TRotation, params: TParams): string[] => {
  switch (rotation) {
    default:
    case "S": {
      const top = params.top === params.maxTop ? params.top - 1 : params.top;
      const left =
        params.maxLeft - params.left < 2
          ? params.left - (params.maxLeft - params.left)
          : params.left;
      return [
        `${top}-${left + 1}`,
        `${top + 1}-${left}`,
        `${top + 1}-${left + 1}`,
        `${top + 1}-${left + 2}`,
      ];
    }
  }
};

export const IPosition = (rotation: TRotation, params: TParams): string[] => {
  switch (rotation) {
    default:
    case "S": {
      const top = params.top;
      const left =
        params.maxLeft - params.left < 3
          ? params.left - (params.maxLeft - params.left)
          : params.left;
      return [
        `${top}-${left}`,
        `${top}-${left + 1}`,
        `${top}-${left + 2}`,
        `${top}-${left + 3}`,
      ];
    }
  }
};

export const OPosition = (rotation: TRotation, params: TParams): string[] => {
  const top = params.top;
  const left =
    params.maxLeft - params.left < 1
      ? params.left - (params.maxLeft - params.left)
      : params.left;
  return [
    `${top}-${left}`,
    `${top}-${left + 1}`,
    `${top + 1}-${left}`,
    `${top + 1}-${left + 1}`,
  ];
};

export const setMethod = (shape: TShape) => {
  switch (shape) {
    default:
    case "L":
      return LPosition;
    case "I":
      return IPosition;
    case "J":
      return JPosition;
    case "O":
      return OPosition;
    case "T":
      return TPosition;
    case "Z":
      return ZPosition;
  }
};
