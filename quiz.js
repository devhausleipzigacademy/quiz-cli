"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var chalk_1 = require("chalk");
var readline_sync_1 = require("readline-sync");
var fs_1 = require("fs");
var playersJSON = (0, fs_1.readFileSync)("./players.json", { encoding: "utf8" });
var questionsJSON = (0, fs_1.readFileSync)("./questions.json", { encoding: "utf8" });
var players = JSON.parse(playersJSON);
var questions = JSON.parse(questionsJSON);
var userName = (0, readline_sync_1.question)("What is your name?" + "\n");
var player = players[userName];
if (!player) {
    console.log(chalk_1["default"].red("Couldn't find player name! Creating new player."));
    player = { playthroughs: 0, score: 0 };
    players[userName] = player;
}
else {
    console.log(chalk_1["default"].green("Welcome! ".concat(userName)));
}
var playGame = true;
while (playGame) {
    var questionsCopy = __spreadArray([], questions, true);
    for (var i = 0; i < questions.length; i++) {
        var randomIndex = Math.floor(Math.random() * questionsCopy.length);
        var questionData = questionsCopy[randomIndex];
        questionsCopy.splice(randomIndex, 1);
        var answer = (0, readline_sync_1.question)(questionData.question + "\n");
        if (answer == questionData.answer) {
            console.log(chalk_1["default"].green("Correct answer!"));
            player.score += 2;
        }
        else {
            console.log(chalk_1["default"].red("Wrong answer!"));
            player.score -= 1;
        }
    }
    player.playthroughs += 1;
    console.log(chalk_1["default"].yellow("Your current score is: ", String(player.score)));
    var againResponse = (0, readline_sync_1.question)("Play again? y/n" + "\n");
    if (againResponse.toLowerCase() == "n" ||
        againResponse.toLowerCase() == "no") {
        playGame = false;
    }
}
var newPlayersJSON = JSON.stringify(players);
(0, fs_1.writeFileSync)("./players.json", newPlayersJSON);
