"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
var readline_sync_1 = require("readline-sync");
var fs_1 = require("fs");
var playersJSON = (0, fs_1.readFileSync)("./players.json", { encoding: "utf8" });
var questionsJSON = (0, fs_1.readFileSync)("./questions.json", { encoding: "utf8" });
var players = JSON.parse(playersJSON);
var questions = JSON.parse(questionsJSON);
for (var i = 0; i < questions.length; i++) {
    var questionData = questions[i];
    var answer = (0, readline_sync_1.question)(questionData.question);
    if (answer == questionData.answer) {
        chalk_1["default"].green("Correct answer!");
    }
    else {
        chalk_1["default"].red("Wrong answer!");
    }
}
var playerFranz = players["Franz"];
playerFranz.score += 2;
var newPlayersJSON = JSON.stringify(players);
(0, fs_1.writeFileSync)("./players.json", newPlayersJSON);
