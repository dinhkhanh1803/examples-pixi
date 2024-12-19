import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES } from "pixi.js";
import '@pixi/graphics-extras';

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------
app.stage.eventMode = 'static';

const bg = Sprite.from('https://pixijs.com/assets/bg_rotate.jpg');

bg.anchor.set(0.5);

bg.x = app.screen.width / 2;
bg.y = app.screen.height / 2;

app.stage.addChild(bg);

const container = new Container();

container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// add a bunch of sprites
const bgFront = Sprite.from('https://pixijs.com/assets/bg_scene_rotate.jpg');

bgFront.anchor.set(0.5);

const light2 = Sprite.from('https://pixijs.com/assets/light_rotate_2.png');

light2.anchor.set(0.5);

const light1 = Sprite.from('https://pixijs.com/assets/light_rotate_1.png');

light1.anchor.set(0.5);

const panda = Sprite.from('https://pixijs.com/assets/panda.png');

panda.anchor.set(0.5);

container.addChild(bgFront, light2, light1, panda);

app.stage.addChild(container);

const thing = new Graphics();

app.stage.addChild(thing);
thing.x = app.screen.width / 2;
thing.y = app.screen.height / 2;
thing.lineStyle(0);

container.mask = thing;

let count = 0;

app.stage.on('pointertap', () => {
    if (!container.mask) {
        container.mask = thing;
    }
    else {
        container.mask = null;
    }
});

const help = new Text('Click or tap to turn masking on / off.', {
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: 'bold',
    fill: 'white',
});

help.y = app.screen.height - 46;
help.x = 200;
app.stage.addChild(help);

app.ticker.add(() => {
    bg.rotation += 0.01;
    bgFront.rotation -= 0.01;

    light1.rotation += 0.02;
    light2.rotation += 0.01;

    panda.scale.x = 1 + Math.sin(count) * 0.04;
    panda.scale.y = 1 + Math.cos(count) * 0.04;

    count += 0.1;

    thing.clear();

    thing.beginFill(0x8bc5ff, 0.4);
    thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
    thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
    thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
    thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
    thing.rotation = count * 0.1;
});