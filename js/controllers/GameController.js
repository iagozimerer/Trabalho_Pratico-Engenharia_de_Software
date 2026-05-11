import { GAME_CONFIG } from "../config/constants.js";

export class GameController {

    constructor(model, view) {

        this.model = model;
        this.view = view;
    }

    initialize() {

        this.registerLanguageButtons();

        this.registerKeyboardEvents();
    }

    registerLanguageButtons() {

        const buttons =
            document.querySelectorAll(
                ".language-button"
            );

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                const language =
                    button.dataset.language;

                this.startGame(language);
            });
        });
    }

    registerKeyboardEvents() {

        window.addEventListener(
            "keydown",
            (event) => this.handleKeyboard(event)
        );
    }

    startGame(language) {

        this.model.startGame(language);

        this.view.showGameScreen();

        this.view.setInstructions(language);

        this.view.renderBoard(this.model.board);
    }

    handleKeyboard(event) {

        if (
            this.model.gameFinished ||
            !this.model.currentLanguage
        ) {
            return;
        }

        const key =
            event.key.toUpperCase();

        if (key === "BACKSPACE") {

            this.handleBackspace();
        }
        else if (key === "ENTER") {

            this.handleEnter();
        }
        else if (/^[A-Z]$/.test(key)) {

            this.handleLetterInput(key);
        }
    }

    handleBackspace() {

        this.model.removeLetter();

        this.view.updateTile(
            this.model.currentRow,
            this.model.currentColumn,
            ""
        );
    }

    handleLetterInput(letter) {

        if (
            this.model.currentColumn >=
            GAME_CONFIG.WORD_LENGTH
        ) {
            return;
        }

        const row =
            this.model.currentRow;

        const column =
            this.model.currentColumn;

        this.model.addLetter(letter);

        this.view.updateTile(
            row,
            column,
            letter
        );
    }

    handleEnter() {

        if (!this.model.isRowComplete()) {
            return;
        }

        const validationResult =
            this.model.validateWord();

        this.view.colorizeRow(
            this.model.currentRow,
            validationResult
        );

        this.view.updateScore(
            this.model.score
        );

        if (this.model.hasPlayerWon()) {

            this.handleVictory();

            return;
        }

        this.model.nextAttempt();

        if (this.model.gameFinished) {

            this.view.showMessage(
                `Fim de jogo! Palavra: ${this.model.secretWord}`
            );
        }
    }

    handleVictory() {

        const messages = {
            pt: "Acertou!",
            en: "Correct!"
        };

        this.view.showMessage(
            messages[this.model.currentLanguage]
        );

        this.model.nextRound();

        this.view.updateRound(
            this.model.round
        );

        this.view.renderBoard(
            this.model.board
        );
    }
}
