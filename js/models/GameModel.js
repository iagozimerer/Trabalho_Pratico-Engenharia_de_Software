import { GAME_CONFIG } from "../config/constants.js";
import { DictionaryService } from "../services/DictionaryService.js";

export class GameModel {

    constructor() {

        this.currentLanguage = "";
        this.secretWord = "";

        this.currentRow = 0;
        this.currentColumn = 0;

        this.score = 0;
        this.round = 1;

        this.gameFinished = false;

        this.board = this.createEmptyBoard();
    }

    createEmptyBoard() {

        return Array.from(
            { length: GAME_CONFIG.MAX_ATTEMPTS },
            () => Array(GAME_CONFIG.WORD_LENGTH).fill("")
        );
    }

    startGame(language) {

        this.currentLanguage = language;

        this.secretWord =
            DictionaryService.getRandomWord(language);

        this.resetBoard();
    }

    resetBoard() {

        this.currentRow = 0;
        this.currentColumn = 0;

        this.board = this.createEmptyBoard();
    }

    addLetter(letter) {

        if (this.currentColumn >= GAME_CONFIG.WORD_LENGTH) {
            return;
        }

        this.board[this.currentRow][this.currentColumn] = letter;

        this.currentColumn++;
    }

    removeLetter() {

        if (this.currentColumn <= 0) {
            return;
        }

        this.currentColumn--;

        this.board[this.currentRow][this.currentColumn] = "";
    }

    getCurrentWord() {

        return this.board[this.currentRow].join("");
    }

    isRowComplete() {

        return this.currentColumn === GAME_CONFIG.WORD_LENGTH;
    }

    validateWord() {

        const currentWord = this.getCurrentWord();

        const result = [];

        for (let index = 0; index < GAME_CONFIG.WORD_LENGTH; index++) {

            const letter = currentWord[index];

            if (letter === this.secretWord[index]) {

                result.push("correct");

                this.score +=
                    GAME_CONFIG.POINTS.CORRECT_LETTER;
            }
            else if (this.secretWord.includes(letter)) {

                result.push("present");

                this.score +=
                    GAME_CONFIG.POINTS.PRESENT_LETTER;
            }
            else {
                result.push("absent");
            }
        }

        return result;
    }

    nextAttempt() {

        this.currentRow++;
        this.currentColumn = 0;

        if (this.currentRow >= GAME_CONFIG.MAX_ATTEMPTS) {
            this.gameFinished = true;
        }
    }

    hasPlayerWon() {
        return this.getCurrentWord() === this.secretWord;
    }

    nextRound() {

        this.round++;

        this.secretWord =
            DictionaryService.getRandomWord(
                this.currentLanguage
            );

        this.resetBoard();
    }
}
