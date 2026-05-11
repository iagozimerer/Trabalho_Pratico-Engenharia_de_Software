import { COLORS } from "../config/constants.js";

export class GameView {

    constructor() {

        this.startScreen =
            document.getElementById("start-screen");

        this.gameScreen =
            document.getElementById("game-screen");

        this.boardElement =
            document.getElementById("board");

        this.instructionsElement =
            document.getElementById("instructions");

        this.scoreElement =
            document.getElementById("score-value");

        this.roundElement =
            document.getElementById("round-value");
    }

    showGameScreen() {

        this.startScreen.style.display = "none";

        this.gameScreen.style.display = "flex";
    }

    setInstructions(language) {

        const messages = {
            pt: "Tente adivinhar a palavra de 5 letras.",
            en: "Guess the 5-letter word."
        };

        this.instructionsElement.innerText =
            messages[language];
    }

    renderBoard(board) {

        this.boardElement.innerHTML = "";

        board.forEach((row, rowIndex) => {

            const rowElement =
                document.createElement("div");

            rowElement.className = "row";

            row.forEach((letter, columnIndex) => {

                const tile =
                    document.createElement("div");

                tile.className = "tile";

                tile.id =
                    `tile-${rowIndex}-${columnIndex}`;

                tile.innerText = letter;

                rowElement.appendChild(tile);
            });

            this.boardElement.appendChild(rowElement);
        });
    }

    updateTile(row, column, letter) {

        const tile =
            document.getElementById(
                `tile-${row}-${column}`
            );

        tile.innerText = letter;
    }

    colorizeRow(row, validationResult) {

        validationResult.forEach((status, column) => {

            const tile =
                document.getElementById(
                    `tile-${row}-${column}`
                );

            tile.style.backgroundColor =
                COLORS[status];

            tile.style.borderColor = "transparent";
        });
    }

    updateScore(score) {
        this.scoreElement.innerText = score;
    }

    updateRound(round) {
        this.roundElement.innerText = round;
    }

    showMessage(message) {
        alert(message);
    }
}
