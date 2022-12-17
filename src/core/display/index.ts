import { Board } from "../../domain/Board.js";
import { logger } from '../../adapters/Logger/index.js';

export class Display {
    show(currentBoard: Board) {
        logger.log(`┌───────┬────────┬───────┐`)
        currentBoard.forEach(row => {
            logger.log(`|   ${row[0] || ' '}   |    ${row[1] || ' '}   |   ${row[2] || ' '}   |`);
            logger.log(`└───────┴────────┴───────┘`);
        });
    }

    clear() {
        logger.clear();
    }

    addNewLines (times = 1) {
        logger.log('\r\n'.repeat(times));
    }
}
