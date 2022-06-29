import { initPixi } from "./util/initPixi";
import { Text, TextStyle } from 'pixi.js';
import './style.css';

const gameLoop = function() {
  // listen for input
  // update
  // check collisions
  // redraw
}

const app = initPixi();
const game = { text: {} };

const scoreStyle = new TextStyle({
  fontFamily: 'pressStart',
  align: 'center',
  fill: 'white',
  fontSize: 16,
  lineHeight: 20,
});

game.text.score = new Text('SCORE\n00020', scoreStyle);
game.text.score.position.set(80, 30);
game.text.score.anchor.set(0.5, 0);
app.stage.addChild(game.text.score);

game.text.highScore = new PIXI.Text('HIGH SCORE\n00000', scoreStyle);
game.text.highScore.position.set(100, 30);
game.text.highScore.anchor.set(0.5, 0);
app.stage.addChild(game.text.highScore);

// setupEntities()
gameLoop();

