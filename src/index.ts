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
            -100,
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
            0,
            1,
        ], // u, v
        2,
    ) // the size of the attribute
    .addIndex([0, 1, 2, 0, 2, 3]);

const geometry2 = new Geometry()
    .addAttribute(
        'aVertexPosition', // the attribute name
        [
            -100 + 100,
            -100, // x, y
            100 + 100,
            -100, // x, y
            100 + 100,
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
    ) // the size of the attribute
    .addIndex([0, 1, 2]);

const geometry3 = Geometry.merge([geometry, geometry2]);

const shader = Shader.from(
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

    uniform sampler2D uSampler2;

    void main() {

        gl_FragColor = texture2D(uSampler2, vUvs );
    }

`,
    {
        uSampler2: Texture.from('https://pixijs.com/assets/bg_scene_rotate.jpg'),
    },
);

const quad = new Mesh(geometry3, shader);

quad.position.set(400, 300);
quad.scale.set(2);

app.stage.addChild(quad);

app.ticker.add((delta) => {
    quad.rotation += 0.01;
});