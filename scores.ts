import { readFileSync } from "fs";
import { Score } from "./types";

export function getScores(): Score[] {
  const scoresFile = readFileSync("./scores.json", { encoding: "utf-8" });
  return JSON.parse(scoresFile);
}
