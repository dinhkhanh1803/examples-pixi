import { Application, Assets, Container, ParticleContainer, Rectangle, Renderer, Sprite, Texture } from "pixi.js";

const app = new Application({ resizeTo: window, backgroundAlpha: 0 });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------
class DudeSprite extends Sprite {
    direction: number;
    turningSpeed: number;
    speed: number;
    offset: number;
    constructor(texture: Texture) {
        super(texture);
        this.direction = Math.random() * Math.PI * 2;
        this.turningSpeed = Math.random() - 0.8;
        this.speed = (2 + Math.random() * 2) * 0.2;
        this.offset = Math.random() * 100;

        this.anchor.set(0.5);
        this.scale.set(0.8 + Math.random() * 0.2);

        this.x = Math.random() * app.screen.width;
        this.y = Math.random() * app.screen.height;

        this.tint = Math.random() * 0x808080;
    }
}

const sprite = new ParticleContainer(1000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true,
});

app.stage.addChild(sprite);

const maggots: DudeSprite[] = [];

const totalSprites = app.renderer instanceof Renderer ? 1000 : 100;

for (let i = 0; i < totalSprites; i++) {
    const dude = new DudeSprite(Texture.from('https://pixijs.com/assets/maggot_tiny.png'));
    maggots.push(dude);
    sprite.addChild(dude);
}

const dudeBoundsPadding = 100;
const dudeBounds = new Rectangle(-dudeBoundsPadding, -dudeBoundsPadding, app.screen.width * 2, app.screen.height * 2);

let tick = 0;

app.ticker.add(() => {
    // iterate through the sprites and update their position
    for (let i = 0; i < maggots.length; i++) {
        const dude = maggots[i];
        dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
        dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
        dude.rotation = -dude.direction + Math.PI;

        // wrap the maggots
        if (dude.x < dudeBounds.x) {
            dude.x += dudeBounds.width;
        }
        else if (dude.x > dudeBounds.x + dudeBounds.width) {
            dude.x -= dudeBounds.width;
        }

        if (dude.y < dudeBounds.y) {
            dude.y += dudeBounds.height;
        }
        else if (dude.y > dudeBounds.y + dudeBounds.height) {
            dude.y -= dudeBounds.height;
        }
    }

    // increment the ticker
    tick += 0.1;

});