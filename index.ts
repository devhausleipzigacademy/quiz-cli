import { read, readFileSync } from "fs";
import * as rs from "readline-sync";
import { Question, Score } from "./types";
import chalk from "chalk";

console.log(chalk.green.bold("Welcome to the Quiz!!!\n"));
const playerName: string = rs.question("What's your name?\n> ");
console.log(chalk.yellow(`Welcome ${playerName}\n`));

let score = 0;

const file = readFileSync("./questions.json", { encoding: "utf-8" });
const questions: Question[] = JSON.parse(file);

for (let i = 0; i < questions.length; i++) {
  const answer = rs.question(`${questions[i].question}\n> `);
  // check if the answer is correct
  if (answer === questions[i].answer) {
    console.log(chalk.green("Awesome your answer is correct"));
    score += 2;
  } else {
    console.log(chalk.red("Oh no that was not correct"));
    console.log(chalk.yellow(`The correct answer is ${questions[i].answer}`));
    score -= 1;
  }
  console.log(chalk.yellowBright(`Your score is ${score}`));
  console.log(chalk.blue("-----------------------\n"));
}

console.log(`Your final score is ${score}\n`);

const scoresFile = readFileSync("./scores.json", { encoding: "utf-8" });
const scores: Score[] = JSON.parse(scoresFile);

console.log(chalk.bold("High Score"));
console.table(scores);
// need to see if we beat the highscore

// mechanism to repeat the game
// ask the user if the game should be repeated
