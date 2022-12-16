import promptAsync from 'prompt-sync';
import { Display } from '../display/index.js'
import { Board } from "../../domain/Board.js";
import { INITIAL_BOARD } from "./initialBoard.config.js";

const prompt = promptAsync({
    sigint: true
});

export class Game {
    private display: Display;
    private currentBoard: Board;
    private currentPlayer: number;

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
            console.log("Invalid move, please retake it.")
            this.makeAMove(player);
            return;
        }

        if (isThePositionTaken(moveXInput, moveYInput)) {
            console.log("Position is taken, please choose another one.");
            this.makeAMove(player);
            return;
        }

        this.currentBoard[moveXInput - 1][moveYInput - 1] = player === 1 ? 'X' : 'O';
    }

    start () {
        this.reset();
        this.display.salute();
        this.display.show(this.currentBoard);
        this.display.addLinePlitter();
        this.loop();
    }

    loop () {
        this.makeAMove(this.currentPlayer);
        this.display.show(this.currentBoard);
        this.display.addLinePlitter();
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

        if (this.getState() === 'ended') {
            this.end();
        }

        this.loop();
    }

    reset () {
        this.currentPlayer = 1;
        this.currentBoard = INITIAL_BOARD;
    }

    getState (): string {
        if (this.currentPlayer == 3) {
            return 'ended'
        }
    }

    end () {

    }
}
