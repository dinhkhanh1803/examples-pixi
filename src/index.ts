import { Application, Container, DisplayObject, EventBoundary, FederatedPointerEvent, Graphics, Matrix, Text, BitmapFont, BitmapText, Rectangle, Sprite, SCALE_MODES, Point, Assets, filters, BlurFilter, ColorMatrixFilter, Texture, DisplacementFilter, WRAP_MODES } from "pixi.js";
import '@pixi/graphics-extras';

const app = new Application({ width: 1024, height: 768 });
document.body.appendChild(app.view as HTMLCanvasElement);
//---------------------------------------------------------

app.stage.eventMode = 'static';

const container = new Container();

app.stage.addChild(container);

const flag = Sprite.from('https://pixijs.com/assets/pixi-filters/flag.png');

container.addChild(flag);
flag.x = 100;
flag.y = 100;

const displacementSprite = Sprite.from('https://pixijs.com/assets/pixi-filters/displacement_map_repeat.jpg');
// Make sure the sprite is wrapping.

displacementSprite.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
const displacementFilter = new DisplacementFilter(displacementSprite);

displacementFilter.padding = 10;

displacementSprite.position = flag.position;

app.stage.addChild(displacementSprite);

flag.filters = [displacementFilter];

displacementFilter.scale.x = 30;
displacementFilter.scale.y = 60;

app.ticker.add(() => {
    // Offset the sprite position to make vFilterCoord update to larger value.
    // Repeat wrapping makes sure there's still pixels on the coordinates.
    displacementSprite.x++;

    // Reset x to 0 when it's over width to keep values from going to very huge numbers.
    if (displacementSprite.x > displacementSprite.width) {
        displacementSprite.x = 0;
    }
});