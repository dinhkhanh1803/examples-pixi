import { Application, Assets, Container, filters, Graphics, SimplePlane, Sprite, TextStyle, Texture, Text, RenderTexture, Point, FederatedPointerEvent, SimpleRope, BLEND_MODES, AnimatedSprite, TilingSprite, BitmapText } from "pixi.js";

const app = new Application({ width: 1024, height: 768, background: '#1099bb' });
document.body.appendChild(app.view as HTMLCanvasElement);

//---------------------------------------------------------
declare global {
    interface Window {
        WebFontConfig?: {
            google: {
                families: string[];
            };
            active?: () => void;
        };
    }
}
// Load them google fonts before starting...
window.WebFontConfig = {
    google: {
        families: ['Snippet'],
    },
    active() {
        init();
    },
};

/* eslint-disable */
// include the web-font loader script
(function() {
    const wf = document.createElement('script');
    wf.src = `${
        document.location.protocol === 'https:' ? 'https' : 'http'
        }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = 'text/javascript';
    wf.async = true;
    const s = document.getElementsByTagName('script')[0];
    if (s.parentNode) {
        s.parentNode.insertBefore(wf, s);
    } else {
        console.error('No parentNode found for the script element.');
    }
})();
/* eslint-enabled */

function init() {
    // create some white text using the Snippet webfont
    const textSample = new Text('PixiJS text using the\ncustom "Snippet" Webfont', {
        fontFamily: 'Snippet',
        fontSize: 50,
        fill: 'white',
        align: 'left',
    });
    textSample.position.set(50, 200);
    app.stage.addChild(textSample);
}
