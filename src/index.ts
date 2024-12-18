import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES, AnimatedSprite } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------

Assets.load('https://pixijs.com/assets/spritesheet/mc.json').then(() => {
    const explosionTextures = [];
    let i;

    for (i = 0; i < 26; i++) {
        const texture = Texture.from(`Explosion_Sequence_A ${i + 1}.png`);

        explosionTextures.push(texture);
    }

    for (i = 0; i < 50; i++) {
        // create an explosion AnimatedSprite
        const explosion = new AnimatedSprite(explosionTextures);

        explosion.x = Math.random() * app.screen.width;
        explosion.y = Math.random() * app.screen.height;
        explosion.anchor.set(0.5);
        explosion.rotation = Math.random() * Math.PI;
        explosion.scale.set(0.75 + Math.random() * 0.5);
        explosion.gotoAndPlay((Math.random() * 26) | 0);
        app.stage.addChild(explosion);
    }
});