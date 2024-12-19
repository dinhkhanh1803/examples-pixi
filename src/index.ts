import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES, AnimatedSprite, TilingSprite } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------

const basicText = new Text('Basic text in pixi');
basicText.x = 100;
basicText.y = 100;
app.stage.addChild(basicText);



const style = new TextStyle({
    fontFamily: 'Time New Roman',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    // fill: ['#ffffff', '#00ff99'], // gradient
    fill: '#ffffff',
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});

const richText = new Text('Rich text with a lot of options and across multiple lines', style);

richText.x = 50;
richText.y = 220;

app.stage.addChild(richText);


const skewStyle = new TextStyle({
    fontFamily: 'Arial',
    dropShadow: true,
    dropShadowAlpha: 0.8,
    dropShadowAngle: 2.1,
    dropShadowBlur: 4,
    dropShadowColor: '0x111111',
    dropShadowDistance: 10,
    fill: ['#ffffff'],
    stroke: '#004620',
    fontSize: 60,
    fontWeight: 'lighter',
    lineJoin: 'round',
    strokeThickness: 12,
});

const skewText = new Text('SKEW IS COOL', skewStyle);

skewText.skew.set(0.65, -0.3);
skewText.anchor.set(0.5, 0.5);
skewText.x = 300;
skewText.y = 480;

app.stage.addChild(skewText);