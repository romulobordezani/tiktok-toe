import promptAsync from 'prompt-sync';
import { Display } from '../display/index.js'
import { Board } from "../../domain/Board.js";
import {getADeepCopyOfTheInitialBoard, INITIAL_BOARD} from "./initialBoard.config.js";
import { logger } from "../../adapters/Logger/index.js";

const prompt = promptAsync({
    sigint: true
});

export class Game {
    private display: Display;
    currentBoard: Board;
    private currentPlayer: number;
    private winner: number;

    constructor () {
        this.display = new Display();
        this.currentBoard = getADeepCopyOfTheInitialBoard();
        this.currentPlayer = 1;
    }

    private makeAMove (player: number, message?: string) {
        const isAValidMove = (inputedPosition: unknown) => (typeof inputedPosition === "number" && inputedPosition < 4 && inputedPosition > 0);
        const isThePositionTaken = (x, y) => this.currentBoard[x - 1][y - 1] !== '';

        console.clear();
        this.display.show(this.currentBoard);

        if (message) {
            logger.log(message);
        }

        const moveXInput = parseInt(prompt(`PLAYER ${player}, please enter the NUMBER of the row: `));

        console.clear();
        this.display.show(this.currentBoard);
        const moveYInput = parseInt(prompt(`PLAYER ${player}, enter the column NUMBER: `));

        if (!isAValidMove(moveXInput) || !isAValidMove(moveYInput) ) {
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
            console.clear();
            this.loop();
        }
    }

    reset () {
        this.currentPlayer = 1;
        this.currentBoard = undefined;
        this.currentBoard = getADeepCopyOfTheInitialBoard();
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

        const allInTheASCDiagonal = (player: number) =>
            this.currentBoard[0][0] === getPlayerSymbol(player)
            && this.currentBoard[1][1] === getPlayerSymbol(player)
            && this.currentBoard[2][2] === getPlayerSymbol(player);

        const allInTheDescDiagonal = (player: number) =>
            this.currentBoard[0][2] === getPlayerSymbol(player)
            && this.currentBoard[1][1] === getPlayerSymbol(player)
            && this.currentBoard[2][0] === getPlayerSymbol(player);

        for (let playerBeingChecked = 1; playerBeingChecked <= 2; playerBeingChecked++) {
            if (
                allInTheSameCollumn(playerBeingChecked, 0) ||
                allInTheSameCollumn(playerBeingChecked, 1) ||
                allInTheSameCollumn(playerBeingChecked, 2) ||
                allInTheSameRow(playerBeingChecked, 0) ||
                allInTheSameRow(playerBeingChecked, 1) ||
                allInTheSameRow(playerBeingChecked, 2) ||
                allInTheASCDiagonal(playerBeingChecked) ||
                allInTheDescDiagonal(playerBeingChecked)
            ) {
                this.winner = playerBeingChecked;
                return 'ended';
            }
        }

        let thereIsStillAnyOneEmpty = () =>
            this.currentBoard.map(row =>  row[0] === ''  || row[1] === ''  || row[2] === '');

        const isADraw = !thereIsStillAnyOneEmpty().includes(true);

        if (isADraw) {
            this.endAsDraw();
        }

    }

    restart () {
        const repeat = prompt(`Would you like to play it again? Type Y if you are in: `);

        if (repeat === 'yes' || repeat === 'Yes' || repeat === 'y' || repeat === 'Y') {
            this.reset();
            this.start();
        }
    }

    end () {
        logger.log(`FINISH! Player ${this.winner} WON! Congratulations...`);
        this.restart();
    }

    endAsDraw () {
        logger.log(`It's a DRAW!`);
        this.restart();
    }
}
