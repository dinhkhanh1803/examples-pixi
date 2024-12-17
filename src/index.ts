import { Application, Assets, Container, Rectangle, Sprite, Texture } from "pixi.js";


const app = new Application({ resizeTo: window, backgroundAlpha: 0 });
document.body.appendChild(app.view as HTMLCanvasElement);

app.stop();


// -----------------------------------------------
Assets.load('https://pixijs.com/assets/spritesheet/monsters.json').then(onAssetsLoaded);

// holder to store aliens
const aliens: Sprite[] = [];
const alienFrames = ['eggHead.png', 'flowerTop.png', 'helmlok.png', 'skully.png'];
let count = 0;

const alienContainer = new Container();
alienContainer.x = 400;
alienContainer.y = 300;

app.stage.eventMode = 'static';
app.stage.addChild(alienContainer);

function onAssetsLoaded() {
    for (let i = 0; i < 100; i++) {
        const frameName = alienFrames[i % 4];

        const alien = Sprite.from(frameName);
        alien.anchor.set(0.5);
        alien.x = Math.random() * 800 - 400;
        alien.y = Math.random() * 600 - 300;
        alien.tint = Math.random() * 0xffffff;

        aliens.push(alien);
        alienContainer.addChild(alien);
    }
    app.start();
}

app.stage.on('pointertap', onclick);

function onclick() {
    alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap;
    console.log(alienContainer.cacheAsBitmap);
}

app.ticker.add(() => {
    for (let i = 0; i < 100; i++) {
        const alien = aliens[i];
        alien.rotation += 0.1;
    }
    count += 0.01;

    alienContainer.scale.x = Math.sin(count);
    alienContainer.scale.y = Math.sin(count);
    alienContainer.rotation += 0.01;
});
