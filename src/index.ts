import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES, AnimatedSprite } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------

Assets.load('https://pixijs.com/assets/spritesheet/0123456789.json').then((spritesheet) => {
    const textures = [];
    let i;

    for (i = 0; i < 10; i++) {
        const framekey = `0123456789 ${i}.ase`;
        const texture = Texture.from(framekey);
        const time = spritesheet.data.frames[framekey].duration;

        textures.push({ texture, time });
    }

    const scaling = 4;

    // create a slow AnimatedSprite
    const slow = new AnimatedSprite(textures);

    slow.anchor.set(0.5);
    slow.scale.set(scaling);
    slow.animationSpeed = 0.5;
    slow.x = (app.screen.width - slow.width) / 2;
    slow.y = app.screen.height / 2;
    slow.play();
    app.stage.addChild(slow);

    // create a fast AnimatedSprite
    const fast = new AnimatedSprite(textures);

    fast.anchor.set(0.5);
    fast.scale.set(scaling);
    fast.x = (app.screen.width + fast.width) / 2;
    fast.y = app.screen.height / 2;
    fast.play();
    app.stage.addChild(fast);

    // start animating
    app.start();
});