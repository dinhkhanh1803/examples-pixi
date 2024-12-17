import { Application, Container, Rectangle, Sprite, Texture } from "pixi.js";


const app = new Application({ resizeTo: window, backgroundAlpha: 0 });
document.body.appendChild(app.view as HTMLCanvasElement);

const container = new Container();
app.stage.addChild(container);

// -----------------------------------------------

class AlienSprite extends Sprite {
    direction: number;
    turningSpeed: number;
    speed: number;

    constructor(texture: Texture) {
        super(texture);
        this.direction = Math.random() * Math.PI * 2;
        this.turningSpeed = Math.random() - 0.8;
        this.speed = 2 + Math.random() * 2;

        this.anchor.set(0.5);
        this.scale.set(Math.random() * 0.5 + 0.5);
        this.position.set(
            Math.random() * app.screen.width,
            Math.random() * app.screen.height
        );
        this.tint = Math.random() * 0xffffff;
    }
}


const aliens: AlienSprite[] = [];
const alienBoundsPadding = 100;
const alienBounds = new Rectangle(
    -alienBoundsPadding,
    -alienBoundsPadding,
    app.screen.width + alienBoundsPadding * 2,
    app.screen.height + alienBoundsPadding * 2,
);

for (let i = 0; i < 20; i++) {
    const alien = new AlienSprite(Texture.from('https://pixijs.com/assets/eggHead.png'));
    aliens.push(alien);
    app.stage.addChild(alien);
}

// Ticker loop
app.ticker.add(() => {
    for (let i = 0; i < aliens.length; i++) {
        const alien = aliens[i];
        alien.direction += alien.turningSpeed * 0.01;
        alien.x += Math.sin(alien.direction) * alien.speed;
        alien.y += Math.cos(alien.direction) * alien.speed;
        alien.rotation = -alien.direction - Math.PI / 2;

        // Wrap bounds logic
        if (alien.x < alienBounds.x) {
            alien.x += alienBounds.width;
        } else if (alien.x > alienBounds.x + alienBounds.width) {
            alien.x -= alienBounds.width;
        }

        if (alien.y < alienBounds.y) {
            alien.y += alienBounds.height;
        } else if (alien.y > alienBounds.y + alienBounds.height) {
            alien.y -= alienBounds.height;
        }
    }
});