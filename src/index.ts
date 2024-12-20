import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES, Filter, MIPMAP_MODES, SimpleRope, Geometry, Shader, Mesh, Program, TYPES, RenderTexture, groupD8 } from "pixi.js";


const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

function createGradTexture() {
    // adjust it if somehow you need better quality for very very big images
    const quality = 256;
    const canvas = document.createElement('canvas');

    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

    // use canvas2d API to create gradient
    if (ctx) {

        const grd = ctx.createLinearGradient(0, 0, quality, 0);


        grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
        grd.addColorStop(0.3, 'cyan');
        grd.addColorStop(0.7, 'red');
        grd.addColorStop(1, 'green');

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, quality, 1);
    }
    return Texture.from(canvas);
}

const gradTexture = createGradTexture();

const sprite = new Sprite(gradTexture);

sprite.position.set(100, 100);
sprite.rotation = Math.PI / 8;
sprite.width = 500;
sprite.height = 50;
app.stage.addChild(sprite);