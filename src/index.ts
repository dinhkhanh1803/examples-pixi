import { Application, Sprite, Texture } from "pixi.js";
import '@pixi/constants';

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------
interface CustomSprite extends Sprite {
    isdown?: boolean;
    isOver?: boolean;
}
// create a background...
const background = Sprite.from('https://pixijs.com/assets/bg_button.jpg');

background.width = app.screen.width;
background.height = app.screen.height;

// add background to stage...
app.stage.addChild(background);

// create some textures from an image path
const textureButton = Texture.from('https://pixijs.com/assets/button.png');
const textureButtonDown = Texture.from('https://pixijs.com/assets/button_down.png');
const textureButtonOver = Texture.from('https://pixijs.com/assets/button_over.png');

const buttons = [];

const buttonPositions = [175, 75, 655, 75, 410, 325, 150, 465, 685, 445];

for (let i = 0; i < 5; i++) {
    const button = new Sprite(textureButton);

    button.anchor.set(0.5);
    button.x = buttonPositions[i * 2];
    button.y = buttonPositions[i * 2 + 1];

    // make the button interactive...
    button.eventMode = 'static';
    button.cursor = 'pointer';

    button
        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        // button events.
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

    // Use mouse-only events
    // .on('mousedown', onButtonDown)
    // .on('mouseup', onButtonUp)
    // .on('mouseupoutside', onButtonUp)
    // .on('mouseover', onButtonOver)
    // .on('mouseout', onButtonOut)

    // Use touch-only events
    // .on('touchstart', onButtonDown)
    // .on('touchend', onButtonUp)
    // .on('touchendoutside', onButtonUp)

    // add it to the stage
    app.stage.addChild(button);

    // add button to array
    buttons.push(button);
}

// set some silly values...
buttons[0].scale.set(1.2);
buttons[2].rotation = Math.PI / 10;
buttons[3].scale.set(0.8);
buttons[4].scale.set(0.8, 1.2);
buttons[4].rotation = Math.PI;

function onButtonDown(this: CustomSprite) {
    this.isdown = true;
    this.texture = textureButtonDown;
    this.alpha = 1;
}

function onButtonUp(this: CustomSprite) {
    this.isdown = false;
    if (this.isOver) {
        this.texture = textureButtonOver;
    }
    else {
        this.texture = textureButton;
    }
}

function onButtonOver(this: CustomSprite) {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = textureButtonOver;
}

function onButtonOut(this: CustomSprite) {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = textureButton;
}

