import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES, Filter, MIPMAP_MODES, SimpleRope, Geometry, Shader, Mesh, Program, TYPES, RenderTexture, groupD8, Resource, BaseTexture, Renderer } from "pixi.js";


const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

class GradientResource extends Resource {
    constructor() {
        // pass width and height. (0,0) if we dont know yet
        // gradient needs only 1 pixel height
        super(256, 1);
    }

    upload(renderer: Renderer, baseTexture: BaseTexture, glTexture: WebGLTexture) {
        const { width, height } = baseTexture;

        // temporary canvas, we dont need it after texture is uploaded to GPU
        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {


            const grd = ctx.createLinearGradient(0, 0, width, 0);

            grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
            grd.addColorStop(0.3, 'cyan');
            grd.addColorStop(0.7, 'red');
            grd.addColorStop(1, 'green');

            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, width, height);
        }
        // This info ios usseful if upload happens second time
        // Some people use that to track used memory


        // PURE WEBGL CALLS - that's what its all about.
        // PixiJS cant wrap all that API, we give you acceess to it!
        const { gl } = renderer;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage2D(baseTexture.target, 0, baseTexture.format, baseTexture.format, baseTexture.type, canvas);

        return true;
    }

}


const gradBaseTexture = new BaseTexture(new GradientResource());
// Here you can fake baseTexture size to avoid resizing all sprites
// There can be multiple baseTextures per gradient, but be careful:
// resource will spawn more glTextures!

gradBaseTexture.setSize(500, 50);

const gradTexture = new Texture(gradBaseTexture);

const sprite = new Sprite(gradTexture);

sprite.position.set(100, 100);
sprite.rotation = Math.PI / 8;
app.stage.addChild(sprite);