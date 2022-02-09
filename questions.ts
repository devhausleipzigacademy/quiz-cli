import { readFileSync } from "fs";
import { Question } from "./types";

export function getQuestions(): Question[] {
  // Read the content of questions.json and convert it to a string
  const file = readFileSync("./questions.json", { encoding: "utf-8" });
  // Convert the string to a Question[]
  return JSON.parse(file);
}
