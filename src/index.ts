import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES, Filter, MIPMAP_MODES, SimpleRope, Geometry, Shader, Mesh, Program, TYPES, RenderTexture, groupD8, Resource, BaseTexture, Renderer } from "pixi.js";


const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

// Add the assets to load
Assets.add({ alias: 'flowerTop', src: 'https://pixijs.com/assets/flowerTop.png' });
Assets.add({ alias: 'eggHead', src: 'https://pixijs.com/assets/eggHead.png' });

// Load the assets and get a resolved promise once both are loaded
const texturesPromise = Assets.load(['flowerTop', 'eggHead']); // => Promise<{flowerTop: Texture, eggHead: Texture}>

// Load the assets directly with Assets.load
// const texturesPromise = Assets.load({
//     flowerTop: 'https://pixijs.com/assets/flowerTop.png',
//     eggHead: 'https://pixijs.com/assets/eggHead.png'
// });

// When the promise resolves, we have the texture!
texturesPromise.then((textures) => {
    // create a new Sprite from the resolved loaded Textures

    const flower = Sprite.from(textures.flowerTop);

    flower.anchor.set(0.5);
    flower.x = app.screen.width * 0.25;
    flower.y = app.screen.height / 2;
    app.stage.addChild(flower);

    const egg = Sprite.from(textures.eggHead);

    egg.anchor.set(0.5);
    egg.x = app.screen.width * 0.75;
    egg.y = app.screen.height / 2;
    app.stage.addChild(egg);
});
