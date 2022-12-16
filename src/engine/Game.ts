import { Display } from './Display.js'
import { Board } from "../domain/Board.js";

export const INITIAL_BOARD = [
    [null, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
];

export class Game {
    currentDisplay: Display;
    currentBoard: Board;

    constructor (display: Display) {
        this.currentDisplay = display;
        this.currentBoard = [][0];
    }

    start () {
        this.reset();
        this.currentDisplay.show(this.currentBoard);
    }

    reset () {
        this.currentBoard = INITIAL_BOARD;
    }

    checkState () {
    }

    end () {

    }
}
