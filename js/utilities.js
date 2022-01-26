import { drillPegs } from './main';
import Canvas2Svg from 'canvas2svg';

// TESTING ONLY - Remove file pre compile : Download SVG
export async function downloadSVG(canvas, config) {
    const delay = 20;
    const inWidth = window.innerWidth;
    const inHeight = window.innerHeight;
    const svg = new Canvas2Svg(inWidth, inHeight);
    drillPegs(canvas, svg, config, inWidth, inHeight);
    consoleTimer(delay);
    const timerPromise = new Promise(resolve => setTimeout(resolve, delay * 1000));
    await timerPromise;
    const mySerializedSVG = svg.getSerializedSvg();
    const blob = new Blob([mySerializedSVG], {type: 'image/svg+xml'});
    const filename = "PbDi.svg";

    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['image/svg+xml', a.download, a.href].join(':');
    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }

  function consoleTimer(seconds) {
    let i = seconds;
    function startTimer() {
        const countdownTimer = setInterval( () => {
            // eslint-disable-next-line no-console
            console.log(i);
            i = i - 1;
            if (i <= 0) {
                // eslint-disable-next-line no-console
                console.log('Downloaded!');
                clearInterval(countdownTimer);
            }
        }, 1000);
    }
    startTimer();
  }