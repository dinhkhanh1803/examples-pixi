import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------
let isFlower = true;
const texture = Texture.from('https://pixijs.com/assets/flowerTop.png');
const secondTexture = Texture.from('https://pixijs.com/assets/eggHead.png');

const charactor = new Sprite(texture);

charactor.anchor.set(0.5);
charactor.position.set(app.screen.width / 2, app.screen.height / 2);
app.stage.addChild(charactor);

charactor.eventMode = 'static';
charactor.cursor = 'pointer';
charactor.on('pointerdown', () => {
    isFlower = !isFlower;
    charactor.texture = isFlower ? texture : secondTexture;
});

app.ticker.add((time) => {
    charactor.rotation += 0.02 * time;
})
