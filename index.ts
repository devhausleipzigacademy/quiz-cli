import * as rs from "readline-sync";
import { Question, Score } from "./types";
import chalk from "chalk";
import { getQuestions } from "./questions";
import { addScore, getScores } from "./scores";

console.log(chalk.green.bold("Welcome to the Quiz!!!\n"));
// Waiting for user to input name
const playerName: string = rs.question("What's your name?\n> ");

console.log(chalk.yellow(`Welcome ${playerName}\n`));

// Get the contents of questions.json
const questions: Question[] = getQuestions();
// Keep track if the game loop should continue running
let keepPlaying: boolean = true;

function playGame(): void {
  // Keep track of the users score
  let score = 0;

  // Looping over the questions
  for (let i = 0; i < questions.length; i++) {
    // Waiting for users answer to each question in the array
    const answer = rs.question(`${questions[i].question}\n> `);
    // Check if answer is correct
    if (answer.toLowerCase() === questions[i].answer.toLowerCase()) {
      console.log(chalk.green("Awesome your answer is correct"));
      score += 2;
    } else {
      console.log(chalk.red("Oh no that was not correct"));
      console.log(chalk.yellow(`The correct answer is ${questions[i].answer}`));
      score -= 1;
    }
    // Printing out the users current score
    console.log(chalk.yellowBright(`Your score is ${score}`));
    console.log(chalk.blue("-----------------------\n"));
  }
  // Printing out the final score after every question was answered
  console.log(`Your final score is ${score}\n`);

  // Add users score to scores.json file
  addScore(playerName, score);

  // Getting updated scores including the users score from the current game
  const scores: Score[] = getScores();

  // Print out the highscore table
  console.log(chalk.bold("High Score"));
  console.table(scores);

  // Determine the highest score -- could be just scores[0].points
  // since we now sort the array in addScore()
  let maxScore = scores[0].points;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i].points > maxScore) {
      // Setting new maxScore when current score is higher
      maxScore = scores[i].points;
    }
  }

  // Check if highscore was beaten
  if (score > maxScore) {
    console.log(chalk.inverse.bold("\nCongrats, you beat the highscore\n"));
  } else {
    console.log(chalk.inverse.bold("\nBetter luck next time\n"));
  }

  // Waiting for user input if another game should be played
  const anotherGame = rs.question(
    "Do you wanna play another game?\nType yes/no\n> "
  );

  // If no was provied stop the loop
  if (anotherGame.toLowerCase() === "no") {
    keepPlaying = false;
  }
}

// Game Loop
while (keepPlaying) {
  playGame();
}
