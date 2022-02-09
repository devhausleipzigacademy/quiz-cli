import * as rs from "readline-sync";
import { Question, Score } from "./types";
import chalk from "chalk";
import { getQuestions } from "./questions";
import { addScore, getScores } from "./scores";

console.log(chalk.green.bold("Welcome to the Quiz!!!\n"));
const playerName: string = rs.question("What's your name?\n> ");
console.log(chalk.yellow(`Welcome ${playerName}\n`));

const questions: Question[] = getQuestions();
const scores: Score[] = getScores();
let keepPlaying: boolean = true;

function playGame(): void {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const answer = rs.question(`${questions[i].question}\n> `);
    if (answer.toLowerCase() === questions[i].answer.toLowerCase()) {
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

  addScore(playerName, score);

  console.log(chalk.bold("High Score"));
  console.table(scores);

  let maxScore = scores[0].points;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i].points > maxScore) {
      maxScore = scores[i].points;
    }
  }

  if (score > maxScore) {
    console.log(chalk.inverse.bold("\nCongrats, you beat the highscore\n"));
  } else {
    console.log(chalk.inverse.bold("\nBetter luck next time\n"));
  }

  const anotherGame = rs.question(
    "Do you wanna play another game?\nType yes/no\n> "
  );

  if (anotherGame.toLowerCase() === "no") {
    keepPlaying = false;
  }
}

while (keepPlaying) {
  playGame();
}
