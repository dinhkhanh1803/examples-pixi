import { Application, settings, SCALE_MODES, BaseTexture, Sprite } from "pixi.js";
import '@pixi/constants';

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
//settings.SCALE_MODE = SCALE_MODES.NEAREST;

const sprite = Sprite.from('https://pixijs.com/assets/bunny.png');

// Set the initial position
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

// Opt-in to interactivity
sprite.eventMode = 'static';

// Shows hand cursor
sprite.cursor = 'pointer';

// Pointers normalize touch and mouse (good for mobile and desktop)
sprite.on('pointerdown', onClick);

app.stage.addChild(sprite);

function onClick() {
    sprite.scale.x *= 1.25;
    sprite.scale.y *= 1.25;
}