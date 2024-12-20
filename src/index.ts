import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES, Filter } from "pixi.js";


const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------
// Create background image
const background = Sprite.from('https://pixijs.com/assets/bg_grass.jpg');

background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

// Stop application wait for load to finish
app.stop();

fetch('https://pixijs.com/assets/pixi-filters/shader.frag')
    .then((res) => res.text())
    .then(onLoaded);

let filter: Filter;

// // Handle the load completed
function onLoaded(data: string) {
    // Create the new filter, arguments: (vertexShader, framentSource)
    filter = new Filter(undefined, data, {
        customUniform: 0.0,
    });

    //     // === WARNING ===
    //     // specify uniforms in filter constructor
    //     // or set them BEFORE first use
    //     // filter.uniforms.customUniform = 0.0

    //     // Add the filter
    background.filters = [filter];

    //     // Resume application update
    app.start();
}

// // Animate the filter
// Cập nhật giá trị của customUniform mỗi frame
app.ticker.add((delta) => {
    filter.uniforms.customUniform += 0.04 * delta; // Tăng dần giá trị của customUniform
});