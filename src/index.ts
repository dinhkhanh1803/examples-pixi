import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES, Filter, MIPMAP_MODES, SimpleRope } from "pixi.js";


const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

let count = 0;
// build a rope!
const ropeLength = 45;

const points: Point[] = [];

for (let i = 0; i < 25; i++) {
    points.push(new Point(i * ropeLength, 0));
}

const strip = new SimpleRope(Texture.from('https://pixijs.com/assets/snake.png'), points);

strip.x = -40;
strip.y = 300;

app.stage.addChild(strip);

const g = new Graphics();

g.x = strip.x;
g.y = strip.y;
app.stage.addChild(g);


// start animating
app.ticker.add(() => {
    count += 0.1;

    // make the snake
    for (let i = 0; i < points.length; i++) {
        points[i].y = Math.sin(i * 0.5 + count) * 30;
        points[i].x = i * ropeLength + Math.cos(i * 0.3 + count) * 20;
    }
    renderPoints();
});

function renderPoints() {
    g.clear();

    g.lineStyle(2, 0xffc2c2);
    g.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        g.lineTo(points[i].x, points[i].y);
    }

    for (let i = 1; i < points.length; i++) {
        g.beginFill(0xff0022);
        g.drawCircle(points[i].x, points[i].y, 10);
        g.endFill();
    }
}