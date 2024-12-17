import { Application, Assets, SimplePlane, Sprite, Texture } from "pixi.js";

const app = new Application({ resizeTo: window, backgroundAlpha: 0 });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------

Assets.load('https://pixijs.com/assets/bg_grass.jpg').then((texture) => {
    const plane = new SimplePlane(texture, 10, 10);

    plane.x = 100;
    plane.y = 100;

    app.stage.addChild(plane);

    const buffer = plane.geometry.getBuffer('aVertexPosition');

    let timer = 0;

    app.ticker.add(() => {
        for (let i = 0; i < buffer.data.length; i++) {
            buffer.data[i] += Math.sin(timer / 10 + i) * 0.5;
        }
        // for (let i = 0; i < buffer.data.length; i += 2) {
        //     buffer.data[i] += Math.sin(timer / 10 + i / 20) * 1.5; // Thay đổi trên trục X
        // }
        buffer.update();
        timer++;
    });
});