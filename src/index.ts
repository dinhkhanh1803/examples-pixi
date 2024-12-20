import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES, Filter, MIPMAP_MODES, SimpleRope, Geometry, Shader, Mesh, Program } from "pixi.js";


const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

const geometry = new Geometry()
    .addAttribute(
        'aVertexPosition', // the attribute name
        [
            -100,
            -100, // x, y
            100,
            -100, // x, y
            100,
            100,
        ], // x, y
        2,
    ) // the size of the attribute

    .addAttribute(
        'aUvs', // the attribute name
        [
            0,
            0, // u, v
            1,
            0, // u, v
            1,
            1,
        ], // u, v
        2,
    ); // the size of the attribute

const program = Program.from(
    `

    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {

        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`,

    `precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D uSamplerTexture;

    void main() {

        gl_FragColor = texture2D(uSamplerTexture, vUvs);
    }

`,
);

const triangle = new Mesh(
    geometry,
    new Shader(program, {
        uSamplerTexture: Texture.from('https://pixijs.com/assets/bg_scene_rotate.jpg'),
    }),
);

const triangle2 = new Mesh(
    geometry,
    new Shader(program, {
        uSamplerTexture: Texture.from('https://pixijs.com/assets/bg_rotate.jpg'),
    }),
);

const triangle3 = new Mesh(
    geometry,
    new Shader(program, {
        uSamplerTexture: Texture.from('https://pixijs.com/assets/bg_displacement.jpg'),
    }),
);

triangle.position.set(400, 300);
triangle.scale.set(2);

triangle2.position.set(200, 100);

triangle3.position.set(500, 400);
triangle3.scale.set(3);

app.stage.addChild(triangle3, triangle2, triangle);

app.ticker.add((delta) => {
    triangle.rotation += 0.01;
    triangle2.rotation -= 0.01;
    triangle3.rotation -= 0.005;
});