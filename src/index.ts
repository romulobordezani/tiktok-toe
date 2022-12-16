import { Game } from "./engine/Game.js";
import {Display} from "./engine/Display.js";

const currentGame = new Game(new Display);

currentGame.start();
