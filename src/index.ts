import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES, AnimatedSprite, TilingSprite, BitmapText } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------

Assets.addBundle('fonts', {
    ChaChicle: 'https://pixijs.com/assets/webfont-loader/ChaChicle.ttf',
    Lineal: 'https://pixijs.com/assets/webfont-loader/Lineal.otf',
    'Dotrice Regular': 'https://pixijs.com/assets/webfont-loader/Dotrice-Regular.woff',
    Crosterian: 'https://pixijs.com/assets/webfont-loader/Crosterian.woff2',
});

Assets.loadBundle('fonts').then(() => {
    const text1 = new Text('ChaChicle.ttf', new TextStyle({ fontFamily: 'ChaChicle', fontSize: 50 }));
    const text2 = new Text('Lineal.otf', new TextStyle({ fontFamily: 'Lineal', fontSize: 50 }));
    const text3 = new Text('Dotrice Regular.woff', new TextStyle({ fontFamily: 'Dotrice Regular', fontSize: 50 }));
    const text4 = new Text('Crosterian.woff2', new TextStyle({ fontFamily: 'Crosterian', fontSize: 50 }));

    text2.y = 150;
    text3.y = 300;
    text4.y = 450;

    app.stage.addChild(text1, text2, text3, text4);

});