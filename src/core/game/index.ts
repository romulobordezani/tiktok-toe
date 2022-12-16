import promptAsync from 'prompt-sync';
import { Display } from '../display/index.js'
import { Board } from "../../domain/Board.js";
import { INITIAL_BOARD } from "./initialBoard.config.js";
import { logger } from "../../adapters/Logger/index.js";

const prompt = promptAsync({
    sigint: true
});

export class Game {
    private display: Display;
    private currentBoard: Board;
    private currentPlayer: number;
    private winner: number;

    constructor () {
        this.display = new Display();
        this.currentBoard = INITIAL_BOARD;
        this.currentPlayer = 1;
    }

    private makeAMove (player: number) {
        const isAValidMove = (inputedPosition: unknown) => (typeof inputedPosition === "number" && inputedPosition < 4 && inputedPosition > 0);
        const isThePositionTaken = (x, y) => this.currentBoard[x - 1][y - 1] !== '';

        const moveXInput = parseInt(prompt(`PLAYER ${player}, please inform the NUMBER of the row: `));
        const moveYInput = parseInt(prompt('Now, please inform column NUMBER: '));

        if (!isAValidMove(moveXInput) || !isAValidMove(moveYInput) ) {
            logger.log("Invalid move, please retake it.")
            this.makeAMove(player);
            return;
        }

        if (isThePositionTaken(moveXInput, moveYInput)) {
            logger.log("Position is taken, please choose another one.");
            this.makeAMove(player);
            return;
        }

        this.currentBoard[moveXInput - 1][moveYInput - 1] = player === 1 ? 'X' : 'O';
    }

    start () {
        this.reset();
        this.display.salute();
        this.display.show(this.currentBoard);
        this.loop();
        this.end();
    }

    changePlayer () {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    loop () {
        this.makeAMove(this.currentPlayer);
        this.display.addNewLines(30);
        this.display.show(this.currentBoard);
        this.display.addNewLines(2);
        this.changePlayer();

        if (this.getState() !== 'ended') {
            this.loop();
        }
    }

    reset () {
        this.currentPlayer = 1;
        this.currentBoard = INITIAL_BOARD;
    }

    getState (): string {
        const getPlayerSymbol = (player) => {
            return player === 1 ? 'X' : 'O';
        }

        const allInTheSameCollumn = (player: number, collumn: number) =>
            this.currentBoard[0][collumn] === getPlayerSymbol(player)
            && this.currentBoard[1][collumn] === getPlayerSymbol(player)
            && this.currentBoard[2][collumn] === getPlayerSymbol(player);

        const allInTheSameRow = (player: number, row: number) =>
            this.currentBoard[row][0] === getPlayerSymbol(player)
            && this.currentBoard[row][1] === getPlayerSymbol(player)
            && this.currentBoard[row][2] === getPlayerSymbol(player);

        for (let playerBeingChecked = 1; playerBeingChecked <= 2; playerBeingChecked++) {
            if (
                allInTheSameCollumn(playerBeingChecked, 0) ||
                allInTheSameCollumn(playerBeingChecked, 1) ||
                allInTheSameCollumn(playerBeingChecked, 2) ||
                allInTheSameRow(playerBeingChecked, 0) ||
                allInTheSameRow(playerBeingChecked, 1) ||
                allInTheSameRow(playerBeingChecked, 2)
            ) {
                this.winner = playerBeingChecked;
                return 'ended';
            }
        }
    }

    end () {
        logger.log(`FINISH! Player ${this.winner} WON! Congratulations...`);
    }
}
