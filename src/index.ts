import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES } from "pixi.js";
import '@pixi/graphics-extras';

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------


const stageHeight = app.screen.height;
const stageWidth = app.screen.width;

// Make sure stage covers the whole scene
app.stage.hitArea = app.screen;

// Make the slider
const sliderWidth = 320;
const slider = new Graphics().beginFill(0x272d37).drawRect(0, 0, sliderWidth, 4);

slider.x = (stageWidth - sliderWidth) / 2;
slider.y = stageHeight * 0.75;

// Draw the handle
const handle = new Graphics().beginFill(0xffffff).drawCircle(0, 0, 8);

handle.y = slider.height / 2;
handle.x = sliderWidth / 2;
handle.eventMode = 'static';
handle.cursor = 'pointer';

handle.on('pointerdown', onDragStart).on('pointerup', onDragEnd).on('pointerupoutside', onDragEnd);

app.stage.addChild(slider);
slider.addChild(handle);


const bunny = app.stage.addChild(Sprite.from('https://pixijs.com/assets/bunny.png'));

bunny.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
bunny.scale.set(3);
bunny.anchor.set(0.5);
bunny.x = stageWidth / 2;
bunny.y = stageHeight / 2;

// Add title
const title = new Text('Drag the handle to change the scale of bunny.', {
    fill: '#272d37',
    fontFamily: 'Roboto',
    fontSize: 20,
    align: 'center',
});

title.roundPixels = true;
title.x = stageWidth / 2;
title.y = 40;
title.anchor.set(0.5, 0);
app.stage.addChild(title);

function onDragStart() {
    app.stage.eventMode = 'static';
    app.stage.addEventListener('pointermove', onDrag);
}

// Stop dragging feedback once the handle is released.
function onDragEnd(e: FederatedPointerEvent) {
    app.stage.eventMode = 'auto';
    app.stage.removeEventListener('pointermove', onDrag);
}

// Update the handle's position & bunny's scale when the handle is moved.
function onDrag(e: FederatedPointerEvent) {
    const halfHandleWidth = handle.width / 2;
    // Set handle y-position to match pointer, clamped to (4, screen.height - 4).

    handle.x = Math.max(halfHandleWidth, Math.min(slider.toLocal(e.global).x, sliderWidth - halfHandleWidth));
    // Normalize handle position between -1 and 1.
    const t = 2 * (handle.x / sliderWidth - 0.5);

    bunny.scale.set(3 * (1.1 + t));
}
