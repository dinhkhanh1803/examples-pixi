import { Application, Assets, BLEND_MODES, Container, ParticleContainer, Rectangle, Renderer, Sprite, Texture } from "pixi.js";

const app = new Application({ resizeTo: window, backgroundAlpha: 0 });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------
class DudeSprite extends Sprite {
    direction: number;
    turningSpeed: number;
    speed: number;

    constructor(texture: Texture) {
        super(texture);
        this.direction = Math.random() * Math.PI * 2;
        this.turningSpeed = Math.random() - 0.8;
        this.speed = 2 + Math.random() * 2;


        this.anchor.set(0.5);
        this.scale.set(0.8 + Math.random() * 0.2);

        this.x = Math.floor(Math.random() * app.screen.width);
        this.y = Math.floor(Math.random() * app.screen.height);

        this.tint = Math.random() * 0x808080;
        this.blendMode = BLEND_MODES.ADD;
    }
}

const background = Sprite.from('https://pixijs.com/assets/bg_rotate.jpg');
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

const dudeArray: DudeSprite[] = [];
const totaldudes = 20;


// Khởi tạo các sprite và thông tin liên quan
for (let i = 0; i < totaldudes; i++) {
    const dude = new DudeSprite(Texture.from('https://pixijs.com/assets/flowerTop.png'));

    dudeArray.push(dude);
    app.stage.addChild(dude);

}

const dudeBoundsPadding = 100;

const dudeBounds = new Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2,
);

app.ticker.add(() => {
    // iterate through the dudes and update the positions
    for (let i = 0; i < dudeArray.length; i++) {
        const dude = dudeArray[i];

        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * dude.speed;
        dude.y += Math.cos(dude.direction) * dude.speed;
        dude.rotation = -dude.direction - Math.PI / 2;

        // wrap the dudes by testing their bounds...
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
});