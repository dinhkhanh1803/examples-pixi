import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter } from "pixi.js";
import '@pixi/graphics-extras';

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

// Inner radius of the circle
const radius = 100;

// The blur amount
const blurSize = 32;

Assets.load('https://pixijs.com/assets/bg_grass.jpg').then((grassTexture) => {
    const background = new Sprite(grassTexture);

    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    const circle = new Graphics()
        .beginFill(0xff0000)
        .drawCircle(radius + blurSize, radius + blurSize, radius)
        .endFill();

    circle.filters = [new BlurFilter(blurSize)];

    const bounds = new Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
    const texture = app.renderer.generateTexture(circle, {
        resolution: 1, // Độ phân giải
        region: bounds, // Khu vực cần lấy texture
    });
    const focus = new Sprite(texture);

    app.stage.addChild(focus);
    background.mask = focus;

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointermove', (event) => {
        focus.position.x = event.global.x - focus.width / 2;
        focus.position.y = event.global.y - focus.height / 2;
    });
});
