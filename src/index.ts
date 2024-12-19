import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES, AnimatedSprite, TilingSprite, BitmapText } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------

Assets.load('https://pixijs.com/assets/bitmap-font/desyrel.xml').then(() => {

    const bitmapFontText = new BitmapText('bitmap fonts are supported!\nWoo yay!', {
        fontName: 'Desyrel',
        fontSize: 55,
        align: 'left',
    });
    bitmapFontText.x = 50;
    bitmapFontText.y = 200;

    app.stage.addChild(bitmapFontText);
});