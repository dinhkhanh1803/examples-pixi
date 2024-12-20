import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter } from "pixi.js";
import '@pixi/graphics-extras';

const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------
class MaggotSprite extends Sprite {
    direction: number;
    turnSpeed: number;
    speed: number;
    original: Point;
    constructor(texture: Texture) {
        super(texture);

        this.direction = Math.random() * Math.PI * 2;
        this.speed = 1;
        this.turnSpeed = Math.random() - 0.8;

        this.anchor.set(0.5);

        this.x = Math.random() * bounds.width;
        this.y = Math.random() * bounds.height;

        this.scale.set(1 + Math.random() * 0.3);

        this.original = new Point();
        this.original.copyFrom(this.scale);
    }
}
app.stage.eventMode = 'static';

const container = new Container();

app.stage.addChild(container);

const padding = 100;
const bounds = new Rectangle(-padding, -padding, app.screen.width + padding * 2, app.screen.height + padding * 2);
const maggots: MaggotSprite[] = [];

for (let i = 0; i < 20; i++) {
    const maggot = new MaggotSprite(Texture.from('https://pixijs.com/assets/maggot.png'));

    container.addChild(maggot);
    maggots.push(maggot);
}

const displacementSprite = Sprite.from('https://pixijs.com/assets/pixi-filters/displace.png');
const displacementFilter = new DisplacementFilter(displacementSprite);


app.stage.addChild(displacementSprite);

container.filters = [displacementFilter];

displacementFilter.scale.x = 110;
displacementFilter.scale.y = 110;
displacementSprite.anchor.set(0.5);

const ring = Sprite.from('https://pixijs.com/assets/pixi-filters/ring.png');

ring.anchor.set(0.5);

ring.visible = false;

app.stage.addChild(ring);

const bg = Sprite.from('https://pixijs.com/assets/bg_grass.jpg');

bg.width = app.screen.width;
bg.height = app.screen.height;

bg.alpha = 0.4;

container.addChild(bg);

app.stage.on('mousemove', onPointerMove).on('touchmove', onPointerMove);

function onPointerMove(eventData: FederatedPointerEvent) {
    ring.visible = true;

    displacementSprite.position.set(eventData.data.global.x - 25, eventData.data.global.y);
    ring.position.copyFrom(displacementSprite.position);
}

let count = 0;

app.ticker.add(() => {
    count += 0.05;

    for (let i = 0; i < maggots.length; i++) {
        const maggot = maggots[i];

        maggot.direction += maggot.turnSpeed * 0.01;
        maggot.x += Math.sin(maggot.direction) * maggot.speed;
        maggot.y += Math.cos(maggot.direction) * maggot.speed;

        maggot.rotation = -maggot.direction - Math.PI / 2;
        maggot.scale.x = maggot.original.x + Math.sin(count) * 0.2;

        // wrap the maggots around as the crawl
        if (maggot.x < bounds.x) {
            maggot.x += bounds.width;
        }
        else if (maggot.x > bounds.x + bounds.width) {
            maggot.x -= bounds.width;
        }

        if (maggot.y < bounds.y) {
            maggot.y += bounds.height;
        }
        else if (maggot.y > bounds.y + bounds.height) {
            maggot.y -= bounds.height;
        }
    }
});
