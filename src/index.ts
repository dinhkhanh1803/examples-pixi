import { Application, FederatedPointerEvent, SCALE_MODES, Sprite, Texture } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------
// Css style for icons
const defaultIcon = 'url(\'https://pixijs.com/assets/bunny.png\'),auto';
const hoverIcon = 'url(\'https://pixijs.com/assets/bunny_saturated.png\'),auto';

// Add custom cursor stylesevents/custom-mouse-icon
app.renderer.events.cursorStyles.default = defaultIcon;
app.renderer.events.cursorStyles.hover = hoverIcon;


const sprite = Sprite.from('https://pixijs.com/assets/button.png');
sprite.anchor.set(.5);
sprite.position.set(512, 384);

sprite.eventMode = 'static';
sprite.cursor = 'hover';
app.stage.addChild(sprite);