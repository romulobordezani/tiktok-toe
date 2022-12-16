import { Board } from "../../domain/Board.js";
import { logger } from '../../adapters/Logger/index.js';

export class Display {
    salute() {
        logger.log('\r\n \r\n Welcome to the TIK TOK TOE Game! \r\n \r\n');
    }

    show(currentBoard: Board) {
        logger.table(currentBoard);
    }

    addLinePlitter () {
        logger.log('\r\n\r\n\  ------------------------  \r\n\r\n')
    }
}
