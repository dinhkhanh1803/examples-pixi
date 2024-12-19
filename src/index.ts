import { Application, Assets, Container, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES, AnimatedSprite, TilingSprite, BitmapText } from "pixi.js";
import '@pixi/graphics-extras';
const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------

const sprite = Sprite.from('https://pixijs.com/assets/bg_rotate.jpg');

const realPath = new Graphics();

realPath.lineStyle(2, 0xffffff, 1);
realPath.moveTo(0, 0);
realPath.lineTo(100, 200);
realPath.lineTo(200, 200);
realPath.lineTo(240, 100);

realPath.position.x = 50;
realPath.position.y = 50;

app.stage.addChild(realPath);

const bezier = new Graphics();

bezier.lineStyle(5, 0xaa0000, 1);
bezier.bezierCurveTo(100, 200, 200, 200, 240, 100);

bezier.position.x = 50;
bezier.position.y = 50;

app.stage.addChild(bezier);

const realPath2 = new Graphics();

realPath2.lineStyle(2, 0xffffff, 1);
realPath2.moveTo(0, 0);
realPath2.lineTo(0, -100);
realPath2.lineTo(150, 150);
realPath2.lineTo(240, 100);

realPath2.position.x = 320;
realPath2.position.y = 150;

app.stage.addChild(realPath2);

const bezier2 = new Graphics();

bezier2.lineTextureStyle({ width: 10, texture: sprite.texture });
bezier2.bezierCurveTo(0, -100, 150, 150, 240, 100);

bezier2.position.x = 320;
bezier2.position.y = 150;

app.stage.addChild(bezier2);

// // // ARC ////
const arc = new Graphics();

arc.lineStyle(5, 0xaa00bb, 1);
arc.arc(600, 100, 50, Math.PI, 2 * Math.PI);

app.stage.addChild(arc);



// // // ARC 2 ////
const arc2 = new Graphics();

arc2.lineStyle(6, 0x3333dd, 1);
arc2.arc(650, 270, 60, 2 * Math.PI, (3 * Math.PI) / 2);

app.stage.addChild(arc2);

// // // ARC 3 ////
const arc3 = new Graphics();

arc3.lineTextureStyle({ width: 20, texture: sprite.texture });
arc3.arc(650, 420, 60, 2 * Math.PI, (2.5 * Math.PI) / 2);

app.stage.addChild(arc3);

// // / Hole ////
const rectAndHole = new Graphics();

rectAndHole.beginFill(0x00ff00);
rectAndHole.drawRect(350, 350, 150, 150);
rectAndHole.beginHole();
rectAndHole.drawCircle(375, 375, 25);
rectAndHole.drawCircle(425, 425, 25);
rectAndHole.drawCircle(475, 475, 25);
rectAndHole.endHole();
rectAndHole.endFill();

app.stage.addChild(rectAndHole);

// // // Line Texture Style ////
const beatifulRect = new Graphics();

beatifulRect.lineTextureStyle({ width: 20, texture: sprite.texture });
beatifulRect.beginFill(0xff0000);
beatifulRect.drawRect(80, 350, 150, 150);
beatifulRect.endFill();

app.stage.addChild(beatifulRect);
