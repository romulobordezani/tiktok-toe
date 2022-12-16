import { logger } from '../../adapters/Logger/index.js';
export class Display {
    salute() {
        logger.log('\r\n \r\n Welcome to the TIK TOK TOE Game! \r\n \r\n');
    }
    show(currentBoard) {
        logger.table(currentBoard);
    }
    addLinePlitter() {
        logger.log('\r\n\r\n\  ------------------------  \r\n\r\n');
    }
}
//# sourceMappingURL=index.js.map