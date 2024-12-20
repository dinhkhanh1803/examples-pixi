import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES, Filter, MIPMAP_MODES, SimpleRope, Geometry, Shader, Mesh, Program, TYPES, RenderTexture, groupD8 } from "pixi.js";


const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

Assets.load('https://pixijs.com/assets/flowerTop.png').then((texture) => {
    // create rotated textures
    const textures = [texture];
    const D8 = groupD8;

    for (let rotate = 1; rotate < 16; rotate++) {
        const h = D8.isVertical(rotate) ? texture.frame.width : texture.frame.height;
        const w = D8.isVertical(rotate) ? texture.frame.height : texture.frame.width;

        const { frame } = texture;
        const crop = new Rectangle(texture.frame.x, texture.frame.y, w, h);
        const trim = crop;
        let rotatedTexture;

        if (rotate % 2 === 0) {
            rotatedTexture = new Texture(texture.baseTexture, frame, crop, trim, rotate);
        }
        else {
            // HACK to avoid exception
            // PIXI doesnt like diamond-shaped UVs, because they are different in canvas and webgl
            rotatedTexture = new Texture(texture.baseTexture, frame, crop, trim, rotate - 1);
            rotatedTexture.rotate++;
        }
        textures.push(rotatedTexture);
    }

    const offsetX = (app.screen.width / 16) | 0;
    const offsetY = (app.screen.height / 8) | 0;
    const gridW = (app.screen.width / 4) | 0;
    const gridH = (app.screen.height / 5) | 0;

    // normal rotations and mirrors
    for (let i = 0; i < 16; i++) {
        // create a new Sprite using rotated texture
        const dude = new Sprite(textures[i < 8 ? i * 2 : (i - 8) * 2 + 1]);

        dude.scale.x = 0.5;
        dude.scale.y = 0.5;
        // show it in grid
        dude.x = offsetX + gridW * (i % 4);
        dude.y = offsetY + gridH * ((i / 4) | 0);
        app.stage.addChild(dude);
        const text = new Text(`rotate = ${dude.texture.rotate}`, {
            fontFamily: 'Courier New',
            fontSize: '12px',
            fill: 'white',
            align: 'left',
        });

        text.x = dude.x;
        text.y = dude.y - 20;
        app.stage.addChild(text);
    }
});