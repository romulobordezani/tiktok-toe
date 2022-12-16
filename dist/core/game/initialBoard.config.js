export const INITIAL_BOARD = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
export const getADeepCopyOfTheInitialBoard = () => {
    let boardDeepCopy = JSON.stringify(INITIAL_BOARD);
    return JSON.parse(boardDeepCopy);
};
//# sourceMappingURL=initialBoard.config.js.map