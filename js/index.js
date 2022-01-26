import { mainFunction, randomizer } from './main';
import { downloadSVG } from './utilities';

// const hash = tokenData.hash
// const hash = '0x11ac128f8b54949c12d04102cfc01960fc496813cbc3495bf77aeed738579738';

// TESTING ONLY : random hash
function random_hash() {
// i.e. not deterministic!
  let result = "0x";
  for (let i = 64; i > 0; --i)
    result += "0123456789abcdef"[~~(Math.random() * 16)];
  return result;
}

const tokenData = {hash: random_hash()}
// parse into large interger
const seed = parseInt(tokenData.hash.slice(0, 16), 16);

// Randomizer helpers
class Random {
  constructor(seed) {
    this.seed = seed
  }
  random_dec() {
    this.seed ^= this.seed << 13
    this.seed ^= this.seed >> 17
    this.seed ^= this.seed << 5
    return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000
  }
  random_between(a, b) {
    return a + (b - a) * this.random_dec()
  }
  random_int(a, b) {
    return Math.floor(this.random_between(a, b+1))
  }
  random_choice(x) {
    return x[Math.floor(this.random_between(0, x.length))]
  }
}

const R = new Random(seed);
const backgrounds = ['111', '222', 'fff', 'f9f4ef'];
const canvas = document.getElementById("canvas");
const seedContainer = document.getElementById('seed');
const c = canvas.getContext('2d');
const config = randomizer(R);
let timeout = false; // holder for timeout id


let canvasWidth;
let canvasHeight;
let currentBackground = R.random_choice(backgrounds);


window.onclick = () => {
  location.reload();
}

// functions -------------------------------------------

function resize() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  // pixelRatio = window.devicePixelRatio;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  seedContainer.innerText = `SEED: ${tokenData.hash}`;
  canvas.style.background = `#${currentBackground}`;
  document.body.style.background = `#${currentBackground}`;
  c.clearRect(0,0,canvasWidth, canvasHeight);
  c.save();
  mainFunction(canvas, c, config, canvasWidth, canvasHeight);
  c.restore();
}

// window.resize event listener // debounce for perf
window.addEventListener('resize', () => {
  clearTimeout(timeout);
  timeout = setTimeout(resize, 500);
});

// window.addEventListener("resize", resize);
window.onload = async () => {
  resize();
};

// TEST CODE ZONE
const storage = window.localStorage;
const control = document.getElementById('controls');
if (storage.getItem('control')) {
  control.hidden = false;
}

// Spacebar to toggle bg
document.body.onkeyup = async e => {
  // space bar
  if(e.keyCode === 32) {
    const isShift = !!window.event.shiftKey;
    const index = backgrounds.indexOf(currentBackground);
    if (isShift) {
      if (index > 0 && index <= backgrounds.length - 1) {
        currentBackground = backgrounds[index - 1];
      } else {
        currentBackground = backgrounds[backgrounds.length - 1];
      }
    } else {
      if (index >= 0 && index < backgrounds.length - 1) {
        currentBackground = backgrounds[index + 1];
      } else {
        currentBackground = backgrounds[0];
      }
    }
    canvas.style.background = `#${currentBackground}`;
    document.body.style.background = `#${currentBackground}`;
    return resize();
  }

  // Hide Prose (no subtitles)
  if (e.key === 'p') {
    if (storage.getItem('hide-prose')) {
      storage.removeItem('hide-prose');
      return;
      // return resize();
    }
    storage.setItem('hide-prose', true);
    // return resize();
  }

  // TESTING ONLY: Remove on import
  // remove animation / static image
  if (e.key === 'n') {
    if (storage.getItem('no-animate')) {
      storage.removeItem('no-animate');
      return;
    }
    storage.setItem('no-animate', true);
  }

  // TESTING ONLY : hide / show controls
  if (e.key === 'c') {
    if (control.hidden === false) {
      storage.removeItem('control');
      control.hidden = true;
      return;
    }
    storage.setItem('control', true);
    control.hidden = false;
  }

  // TESTING ONLY : show seed
  if (e.key === 's') {
    return seedContainer.hidden === true ? seedContainer.hidden = false : seedContainer.hidden = true;
  }

  // TESTING ONLY
  if (e.key === 'd') {
    //serialize your SVG
    await downloadSVG(canvas, config);
  }

  // end
  return;
}
