import { readFileSync } from "fs";
import * as rs from "readline-sync";
import { Question, Score } from "./types";
// ask the user for a name
const playerName: string = rs.question("What's your name?\n> ");
console.log(playerName);
// keep track our own score

// add some colors to the output

// need some questions
const file = readFileSync("./questions.json", { encoding: "utf-8" });
const questions: Question[] = JSON.parse(file);

// ask questions
// check if the answer is correct

// need the highscores
// need to see if we beat the highscore

// mechanism to repeat the game
// ask the user if the game should be repeated
