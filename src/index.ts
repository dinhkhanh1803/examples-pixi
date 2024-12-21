import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES, Filter, MIPMAP_MODES, SimpleRope, Geometry, Shader, Mesh, Program, TYPES, RenderTexture, groupD8, Resource, BaseTexture, Renderer } from "pixi.js";


const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

// Add the assets to load
Assets.add({ alias: 'flowerTop', src: 'https://pixijs.com/assets/flowerTop.png' });
Assets.add({ alias: 'eggHead', src: 'https://pixijs.com/assets/eggHead.png' });

// Allow the assets to load in the background
Assets.backgroundLoad(['flowerTop', 'eggHead']);


// If the background load hasn't loaded this asset yet, calling load forces this asset to load now.
Assets.load('eggHead').then((texture) => {
    // auxiliar flag for toggling the texture
    let isEggHead = true;

    // create a new Sprite from the resolved loaded texture
    const character = new Sprite(texture);

    character.anchor.set(0.5);
    character.x = app.screen.width / 2;
    character.y = app.screen.height / 2;
    character.eventMode = 'static';
    character.cursor = 'pointer';

    app.stage.addChild(character);

    character.on('pointertap', async () => {
        isEggHead = !isEggHead;
        // These promise are already resolved in the cache.
        character.texture = await Assets.load(isEggHead ? 'eggHead' : 'flowerTop');
    });
});
