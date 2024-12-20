import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES, Filter, MIPMAP_MODES, SimpleRope } from "pixi.js";


const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

let count = 0;

// build a rope!
const ropeLength = 918 / 20;

const points: Point[] = [];

for (let i = 0; i < 20; i++) {
    points.push(new Point(i * ropeLength, 0));
}

const strip = new SimpleRope(Texture.from('https://pixijs.com/assets/snake.png'), points);

strip.x = -459;

const snakeContainer = new Container();

snakeContainer.x = 400;
snakeContainer.y = 300;

snakeContainer.scale.set(800 / 1100);
app.stage.addChild(snakeContainer);

snakeContainer.addChild(strip);

app.ticker.add(() => {
    count += 0.1;// tốc độ của chuyển động.

    // make the snake
    for (let i = 0; i < points.length; i++) {
        points[i].y = Math.sin(i * 0.5 + count) * 30;
        points[i].x = i * ropeLength + Math.cos(i * 0.3 + count) * 20;
    }
});