import { drillPegs, randomizer } from './pegboard';

// const hash = tokenData.hash
// const hash = '0x11ac128f8b54949c12d04102cfc01960fc496813cbc3495bf77aeed738579738';

function random_hash() {
  let chars = "0123456789abcdef";
  let result = '0x';
  for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const tokenData = {"hash": random_hash()}
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
const backgrounds = ['111', '222', 'fff'];
const canvas = document.getElementById("canvas");
const seedContainer = document.getElementById('seed');
const c = canvas.getContext("2d");
const config = randomizer(R);
let timeout = false; // holder for timeout id


let render;
let canvasWidth, canvasHeight, pixelRatio;
let currentBackground = R.random_choice(backgrounds);
let fullBackgrounds = [...backgrounds, ...config.scheme];
fullBackgrounds = [...new Set(fullBackgrounds)];


window.onclick = () => {
  location.reload();
}

// functions -------------------------------------------

const draw = () => {
  console.log(seed);
  c.save();
  c.scale(pixelRatio, pixelRatio);
  render = drillPegs(c, config, canvasWidth, canvasHeight);
  c.restore();
};

function resize() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  pixelRatio = window.devicePixelRatio;
  canvas.width = ~~(canvasWidth * pixelRatio);
  canvas.height = ~~(canvasHeight * pixelRatio);
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  seedContainer.innerText = `SEED: ${tokenData.hash}`;
  canvas.style.background = `#${currentBackground}`;
  document.body.style.background = `#${currentBackground}`;
  
  if (render) draw();
}

// window.resize event listener // debounce for perf
window.addEventListener('resize', () => {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  clearTimeout(timeout);
  timeout = setTimeout(resize, 250);
});

// window.addEventListener("resize", resize);

window.onload = () => {
  resize();
  render = drillPegs(c, config, canvasWidth, canvasHeight);
  draw();
  // poem();
}

// keypress
document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    let isShift = !!window.event.shiftKey;
    let index = fullBackgrounds.indexOf(currentBackground);
    if (isShift) {
      if (index > 0 && index <= fullBackgrounds.length - 1) {
        currentBackground = fullBackgrounds[index - 1];
      } else {
        currentBackground = fullBackgrounds[fullBackgrounds.length - 1];
      }
    } else {
      if (index >= 0 && index < fullBackgrounds.length - 1) {
        currentBackground = fullBackgrounds[index + 1];
      } else {
        currentBackground = fullBackgrounds[0];
      }
    }
    canvas.style.background = `#${currentBackground}`;
    document.body.style.background = `#${currentBackground}`;
    return;
  }

  if (e.key === 'D') {
    fadeOut();
  }

  if (e.key === 'c'){
    const control = document.getElementById('controls');
    control.hidden === true ? control.hidden = false : control.hidden = true;
  }

  if (e.key === 's'){
    seedContainer.hidden === true ? seedContainer.hidden = false : seedContainer.hidden = true;
  }

  return;
}

function fadeOut() {
  canvas.style.transition = `${R.random_int(1, 30)}s`;
  canvas.style.opacity = 0;
}

