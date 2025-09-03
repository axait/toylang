// src/store/types.ts
export type ConsoleLine = {
  type: "output" | "input" | "error";
  text: string;
};
