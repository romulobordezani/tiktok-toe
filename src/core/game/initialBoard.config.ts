import { Board } from "../../domain/Board.js";

export const INITIAL_BOARD: Board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

export const getADeepCopyOfTheInitialBoard = () => {
    let boardDeepCopy = JSON.stringify(INITIAL_BOARD);
    return JSON.parse(boardDeepCopy);
}
