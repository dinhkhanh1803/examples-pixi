import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES, AnimatedSprite } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------

Assets.load('https://pixijs.com/assets/spritesheet/fighter.json').then(() => {
    const frames = [];

    for (let i = 0; i < 30; i++) {
        const val = i < 10 ? `0${i}` : i;

        frames.push(Texture.from(`rollSequence00${val}.png`));
    }
    const anim = new AnimatedSprite(frames);

    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();

    app.stage.addChild(anim);

    // Animate the rotation
    app.ticker.add(() => {
        anim.rotation += 0.01;
    });
});