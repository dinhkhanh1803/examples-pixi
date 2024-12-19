import { Application, DisplayObject, FederatedPointerEvent, Graphics, Text } from "pixi.js";


const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------
const title = app.stage.addChild(
    new Text(
        `Move your mouse slowly over the boxes to
    see the order of pointerenter, pointerleave,
    pointerover, pointerout events on each target!`,
        {
            fontSize: 16,
        },
    ),
);

const logs: string[] = [];
const logText = app.stage.addChild(
    new Text('', {
        fontSize: 14,
    }),
);

logText.y = 80;
logText.x = 2;

app.stage.name = 'stage';

// Mount outer black box
const blackBox = app.stage.addChild(new Graphics().beginFill(0).drawRect(0, 0, 600, 400).endFill());

blackBox.name = 'black box';
blackBox.x = 400;

// Mount white box inside the white one
const whiteBox = blackBox.addChild(new Graphics().beginFill(0xffffff).drawRect(100, 100, 400, 200).endFill());

whiteBox.name = 'white box';

// Enable interactivity everywhere!
app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;
whiteBox.eventMode = 'static';
blackBox.eventMode = 'static';

[app.stage, whiteBox, blackBox].forEach((object) => {
    object.addEventListener('pointerenter', onEvent);
    object.addEventListener('pointerleave', onEvent);
    object.addEventListener('pointerover', onEvent);
    object.addEventListener('pointerout', onEvent);
});


function onEvent(e: FederatedPointerEvent) {
    const type = e.type;
    const targetName = (e.target as DisplayObject).name;
    const currentTargetName = (e.currentTarget as DisplayObject).name;

    // Add event to top of logs
    logs.push(`${currentTargetName} received ${type} event (target is ${targetName})`);

    if (currentTargetName === 'stage' || type === 'pointerenter' || type === 'pointerleave') {
        logs.push('-----------------------------------------', '');
    }

    // Prevent logs from growing too long
    if (logs.length > 30) {
        while (logs.length > 30) {
            logs.shift();
        }
    }

    // Update logText
    logText.text = logs.join('\n');
}