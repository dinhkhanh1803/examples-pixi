import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES, Filter, MIPMAP_MODES, SimpleRope, Geometry, Shader, Mesh, Program, TYPES, RenderTexture, groupD8 } from "pixi.js";


const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

const container = new Container();

app.stage.addChild(container);

const texture = Texture.from('https://pixijs.com/assets/bunny.png');

for (let i = 0; i < 25; i++) {
    const bunny = new Sprite(texture);

    bunny.x = (i % 5) * 30;
    bunny.y = Math.floor(i / 5) * 30;
    bunny.rotation = Math.random() * (Math.PI * 2);
    container.addChild(bunny);
}

const rt = RenderTexture.create({
    width: 300,
    height: 300,
    scaleMode: SCALE_MODES.LINEAR,
    resolution: 1,
});

const sprite = new Sprite(rt);

sprite.x = 450;
sprite.y = 60;
app.stage.addChild(sprite);

/*
 * All the bunnies are added to the container with the addChild method
 * when you do this, all the bunnies become children of the container, and when a container moves,
 * so do all its children.
 * This gives you a lot of flexibility and makes it easier to position elements on the screen
 */
container.x = 100;
container.y = 60;

app.ticker.add(() => {
    app.renderer.render(container, { renderTexture: rt });
});
