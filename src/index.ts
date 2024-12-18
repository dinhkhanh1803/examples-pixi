import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------

const buddy = Sprite.from('https://pixijs.com/assets/bunny.png');

buddy.anchor.set(0.5);
buddy.x = app.screen.width / 2;
buddy.y = app.screen.height / 2;

app.stage.addChild(buddy);

app.ticker.add((detal) => {
    buddy.rotation += detal * 0.1;
})