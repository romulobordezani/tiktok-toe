import { Board } from "../domain/Board.js";

export class Display {
    show(currentBoard: Board) {
        console.table(currentBoard);
    }

    update (axisData: ArrayBuffer) {
    }
}
