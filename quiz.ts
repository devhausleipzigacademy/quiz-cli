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

for (let i = 0; i < questions.length; i++) {
	const questionData = questions[i];
	const answer = question(questionData.question);

	if (answer == questionData.answer) {
		chalk.green("Correct answer!");
	} else {
		chalk.red("Wrong answer!");
	}
}

const playerFranz = players["Franz"];

playerFranz.score += 2;

const newPlayersJSON = JSON.stringify(players);

writeFileSync("./players.json", newPlayersJSON);
