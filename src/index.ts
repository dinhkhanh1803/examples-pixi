import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent } from "pixi.js";

const app = new Application({ width: 1024, height: 768, backgroundAlpha: 0 });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------

const brush = new Graphics().beginFill(0xffffff).drawCircle(0, 0, 50);

// Create a line that will interpolate the drawn points
const line = new Graphics();

Assets.add({
    alias: 't1',
    src: 'https://pixijs.com/assets/bg_grass.jpg'
});
Assets.add({
    alias: 't2',
    src: 'https://pixijs.com/assets/bg_rotate.jpg'
});

Assets.load(['t1', 't2']).then(setup);

function setup() {
    const { width, height } = app.screen;
    const stageSize = { width, height };

    const background = Object.assign(Sprite.from('t1'), stageSize);
    const imageToReveal = Object.assign(Sprite.from('t2'), stageSize);
    const renderTexture = RenderTexture.create(stageSize);
    const renderTextureSprite = new Sprite(renderTexture);

    imageToReveal.mask = renderTextureSprite;
    app.stage.addChild(background, imageToReveal, renderTextureSprite);

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage
        .on('pointerdown', pointerDown)
        .on('pointerup', pointerUp)
        .on('pointerupoutside', pointerUp)
        .on('pointermove', pointerMove);

    let dragging = false;
    let lastDrawnPoint: Point | null;;

    function pointerMove({ global: { x, y } }: FederatedPointerEvent) {
        if (dragging) {
            brush.position.set(x, y);
            app.renderer.render(brush, {
                renderTexture,
                clear: false,
                skipUpdateTransform: false,
            });

            if (lastDrawnPoint) {
                line.clear()
                    .lineStyle({ width: 100, color: 0xffffff })
                    .moveTo(lastDrawnPoint.x, lastDrawnPoint.y)
                    .lineTo(x, y);
                app.renderer.render(line, {
                    renderTexture,
                    clear: false,
                    skipUpdateTransform: false,
                });
            }
            lastDrawnPoint = lastDrawnPoint || new Point();
            lastDrawnPoint.set(x, y);
        }
    }

    function pointerDown(event: FederatedPointerEvent) {
        dragging = true;
        pointerMove(event);
    }

    function pointerUp(event: FederatedPointerEvent) {
        dragging = false;
        lastDrawnPoint = null;
    }
}