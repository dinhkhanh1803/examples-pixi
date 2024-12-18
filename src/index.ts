import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------
const texture = Texture.from('https://pixijs.com/assets/bunny.png');
const containerFrame = new Container();
const bunnyContainer = new Container();

let screenshot: HTMLAnchorElement | undefined;


// Take the screenshot and download it
async function takeScreenshot() {
    if (screenshot !== undefined) {
        screenshot.remove();
    }

    app.stop();
    const url = await app.renderer.extract.base64(containerFrame);

    screenshot = document.createElement('a');

    document.body.append(screenshot);

    screenshot.style.position = 'fixed';
    screenshot.style.top = '20px';
    screenshot.style.right = '20px';
    screenshot.download = 'screenshot';
    screenshot.href = url;

    const image = new Image();

    image.width = app.screen.width / 5;
    image.src = url;

    screenshot.innerHTML = image.outerHTML;

    app.start();
}

app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;
app.stage.on('pointerdown', takeScreenshot);

for (let i = 0; i < 25; i++) {
    const bunny = new Sprite(texture);

    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    bunnyContainer.addChild(bunny);
}

bunnyContainer.x = 400;
bunnyContainer.y = 300;
bunnyContainer.pivot.x = bunnyContainer.width / 2;
bunnyContainer.pivot.y = bunnyContainer.height / 2;

app.ticker.add((delta) => {
    bunnyContainer.rotation += 0.01 * delta;
});

const style = new TextStyle({
    fontFamily: 'Roboto',
    fill: '#fff',
});

const screenshotText = new Text('Click To Take Screenshot', style);

screenshotText.x = Math.round((app.screen.width - screenshotText.width) / 2);
screenshotText.y = Math.round(screenshotText.height / 2);

containerFrame.addChild(bunnyContainer);
app.stage.addChild(screenshotText, containerFrame);