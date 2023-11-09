import promptAsync from 'prompt-sync';
import { Display } from '../display/index.js';
import { getADeepCopyOfTheInitialBoard } from "./initialBoard.config.js";
import { logger } from "../../adapters/Logger/index.js";
const prompt = promptAsync({
    sigint: true
});
const FIRST_PLAYER = 1;
const SECOND_PLAYER = 2;
const ARRAY_DIFF_STARTING_FROM_ZERO = 1;
export class Game {
    constructor() {
        this.display = new Display();
        this.currentBoard = getADeepCopyOfTheInitialBoard();
        this.currentPlayer = FIRST_PLAYER;
    }
    makeAMove(player, message) {
        const isAValidMove = (inputedPosition) => (typeof inputedPosition === "number" && inputedPosition < 4 && inputedPosition > 0);
        const isThePositionTaken = (x, y) => this.currentBoard[x - ARRAY_DIFF_STARTING_FROM_ZERO][y - ARRAY_DIFF_STARTING_FROM_ZERO] !== '';
        this.display.clear();
        this.display.show(this.currentBoard);
        if (message) {
            logger.log(message);
        }
        const moveXInput = parseInt(prompt(`PLAYER ${player}, please enter the NUMBER of the row: `));
        this.display.clear();
        this.display.show(this.currentBoard);
        const moveYInput = parseInt(prompt(`PLAYER ${player}, enter the column NUMBER: `));
        if (!isAValidMove(moveXInput) || !isAValidMove(moveYInput)) {
            this.makeAMove(player, 'Invalid move, please retake it.');
            return;
        }
        if (isThePositionTaken(moveXInput, moveYInput)) {
            this.display.addNewLines(5);
            this.display.show(this.currentBoard);
            this.display.addNewLines(2);
            this.makeAMove(player, 'Position is taken, please choose another one.');
            return;
        }
        this.currentBoard[moveXInput - ARRAY_DIFF_STARTING_FROM_ZERO][moveYInput - ARRAY_DIFF_STARTING_FROM_ZERO] = this.getPlayerSymbol(player);
    }
    start() {
        this.reset();
        this.display.show(this.currentBoard);
        this.loop();
        this.end();
    }
    changePlayer() {
        this.currentPlayer = this.currentPlayer === FIRST_PLAYER ? SECOND_PLAYER : FIRST_PLAYER;
    }
    loop() {
        this.makeAMove(this.currentPlayer);
        this.display.addNewLines(30);
        this.display.show(this.currentBoard);
        this.display.addNewLines(2);
        this.changePlayer();
        if (this.getState() !== 'ended') {
            this.display.clear();
            this.loop();
        }
    }
    reset() {
        this.currentPlayer = FIRST_PLAYER;
        this.currentBoard = getADeepCopyOfTheInitialBoard();
    }
    getPlayerSymbol(player) {
        return player === FIRST_PLAYER ? 'X' : 'O';
    }
    getState() {
        const allInTheSameCollumn = (player, collumn) => this.currentBoard[0][collumn] === this.getPlayerSymbol(player)
            && this.currentBoard[1][collumn] === this.getPlayerSymbol(player)
            && this.currentBoard[2][collumn] === this.getPlayerSymbol(player);
        const allInTheSameRow = (player, row) => this.currentBoard[row][0] === this.getPlayerSymbol(player)
            && this.currentBoard[row][1] === this.getPlayerSymbol(player)
            && this.currentBoard[row][2] === this.getPlayerSymbol(player);
        const allInTheASCDiagonal = (player) => this.currentBoard[0][0] === this.getPlayerSymbol(player)
            && this.currentBoard[1][1] === this.getPlayerSymbol(player)
            && this.currentBoard[2][2] === this.getPlayerSymbol(player);
        const allInTheDescDiagonal = (player) => this.currentBoard[0][2] === this.getPlayerSymbol(player)
            && this.currentBoard[1][1] === this.getPlayerSymbol(player)
            && this.currentBoard[2][0] === this.getPlayerSymbol(player);
        for (let playerBeingChecked = FIRST_PLAYER; playerBeingChecked <= SECOND_PLAYER; playerBeingChecked++) {
            if (allInTheSameCollumn(playerBeingChecked, 0) ||
                allInTheSameCollumn(playerBeingChecked, 1) ||
                allInTheSameCollumn(playerBeingChecked, 2) ||
                allInTheSameRow(playerBeingChecked, 0) ||
                allInTheSameRow(playerBeingChecked, 1) ||
                allInTheSameRow(playerBeingChecked, 2) ||
                allInTheASCDiagonal(playerBeingChecked) ||
                allInTheDescDiagonal(playerBeingChecked)) {
                this.winner = playerBeingChecked;
                return 'ended';
            }
        }
        let thereIsStillAnyOneEmpty = () => this.currentBoard.map(row => row[0] === '' || row[1] === '' || row[2] === '');
        const isADraw = !thereIsStillAnyOneEmpty().includes(true);
        if (isADraw) {
            this.endAsDraw();
        }
    }
    checkRestart() {
        const repeat = prompt(`Would you like to play it again? Type Y if you are in: `);
        if (repeat === 'yes' || repeat === 'Yes' || repeat === 'y' || repeat === 'Y') {
            this.start();
        }
    }
    end() {
        logger.log(`FINISH! Player ${this.winner} WON! Congratulations...`);
        this.checkRestart();
    }
    endAsDraw() {
        logger.log(`It's a DRAW!`);
        this.checkRestart();
    }
}
//# sourceMappingURL=index.js.map