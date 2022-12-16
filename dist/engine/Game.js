export const INITIAL_BOARD = [
    [null, 2, 3],
    [1, 2, 3],
    [1, 2, 3]
];
export class Game {
    constructor(display) {
        this.display = display;
        this.currentBoard = [][0];
    }
    start() {
        this.reset();
        this.display.show(this.currentBoard);
    }
    reset() {
        this.currentBoard = INITIAL_BOARD;
    }
    checkState() {
    }
    end() {
    }
}
//# sourceMappingURL=Game.js.map
