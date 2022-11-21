import chalk from "chalk";
import { question } from "readline-sync";
import { readFileSync, writeFileSync } from "fs";

type Question = {
	question: string;
	answer: string;
};

type Questions = Array<Question>;

type Player = {
	playthroughs: number;
	score: number;
};

type Players = Record<string, Player>;

const playersJSON = readFileSync("./players.json", { encoding: "utf8" });
const questionsJSON = readFileSync("./questions.json", { encoding: "utf8" });

const players: Players = JSON.parse(playersJSON);
const questions: Questions = JSON.parse(questionsJSON);

const userName = question("What is your name?" + "\n");

let player: Player | undefined = players[userName];

if (!player) {
	console.log(chalk.red("Couldn't find player name! Creating new player."));
	player = { playthroughs: 0, score: 0 };

	players[userName] = player;
} else {
	console.log(chalk.green(`Welcome! ${userName}`));
}

let playGame = true;

while (playGame) {
	const questionsCopy = [...questions];

	for (let i = 0; i < questions.length; i++) {
		const randomIndex = Math.floor(Math.random() * questionsCopy.length);
		const questionData = questionsCopy[randomIndex];

		questionsCopy.splice(randomIndex, 1);

		const answer = question(questionData.question + "\n");

		if (answer == questionData.answer) {
			console.log(chalk.green("Correct answer!"));
			player.score += 2;
		} else {
			console.log(chalk.red("Wrong answer!"));
			player.score -= 1;
		}
	}

	player.playthroughs += 1;

	console.log(chalk.yellow(`Your current score is: `, String(player.score)));

	const againResponse = question("Play again? y/n" + "\n");

	if (
		againResponse.toLowerCase() == "n" ||
		againResponse.toLowerCase() == "no"
	) {
		playGame = false;
	}
}

const newPlayersJSON = JSON.stringify(players);

writeFileSync("./players.json", newPlayersJSON);
