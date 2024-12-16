import { Application } from '@pixi/app';
import { Texture } from '@pixi/core';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';


const app = new Application({ resizeTo: window, backgroundAlpha: 0 });
document.body.appendChild(app.view as HTMLCanvasElement);

const container = new Container();
app.stage.addChild(container);

const texture = Texture.from('https://pixijs.com/assets/bunny.png');

for (let i = 0; i < 30; i++) {
    const sprite = new Sprite(texture);
    sprite.x = (i % 6) * 40;
    sprite.y = i % 5 * 40;
    sprite.anchor.set(0.5);
    container.addChild(sprite);
}

container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

app.ticker.add((time) => {
    container.rotation += 0.01 * time;
})