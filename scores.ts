import { readFileSync, writeFileSync } from "fs";
import { Score } from "./types";

export function getScores(): Score[] {
  const scoresFile = readFileSync("./scores.json", { encoding: "utf-8" });
  return JSON.parse(scoresFile);
}

export function addScore(myName: string, myPoints: number) {
  const scores = getScores();

  const newScore: Score = {
    username: myName,
    points: myPoints,
  };

  const newScores = [...scores, newScore];

  const newScoresString = JSON.stringify(newScores);

  writeFileSync("./scores.json", newScoresString);
}
