import { Application, FederatedPointerEvent, SCALE_MODES, Sprite, Texture } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------
// create a texture from an image path
const texture = Texture.from('https://pixijs.com/assets/bunny.png');

// Scale mode for pixelation
texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

for (let i = 0; i < 10; i++) {
    createBunny(Math.floor(Math.random() * app.screen.width), Math.floor(Math.random() * app.screen.height));
}

function createBunny(x: number, y: number) {
    // create our little bunny friend..
    const bunny = new Sprite(texture);

    bunny.eventMode = 'static';

    bunny.cursor = 'pointer';

    bunny.anchor.set(0.5);

    bunny.scale.set(3);

    bunny.on('pointerdown', onDragStart, bunny);

    bunny.x = x;
    bunny.y = y;

    // add it to the stage
    app.stage.addChild(bunny);
}

let dragTarget: Sprite | null = null;

app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

function onDragMove(event: FederatedPointerEvent) {
    if (dragTarget) {
        dragTarget.parent.toLocal(event.global, undefined, dragTarget.position);
    }
}

function onDragStart(this: Sprite) {
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
}

function onDragEnd() {
    if (dragTarget) {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
    }
}
