import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle } from "pixi.js";
import '@pixi/graphics-extras';

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------


// Create the circle
const circle = app.stage.addChild(
    new Graphics()
        .beginFill(0xffffff)
        .lineStyle({ color: 0x111111, alpha: 0.87, width: 1 })
        .drawCircle(0, 0, 8)
        .endFill(),
);

circle.position.set(app.screen.width / 2, app.screen.height / 2);

// Enable interactivity!
app.stage.eventMode = 'static';

// Make sure the whole canvas area is interactive, not just the circle.
app.stage.hitArea = app.screen;

// Follow the pointer
app.stage.addEventListener('pointermove', (e) => {
    circle.position.copyFrom(e.global);
});
