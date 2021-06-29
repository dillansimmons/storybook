import { prose, proseBuilder } from './poem';

/**
 * TODO:
 * - resize animation fixer
 * - color names
 * - crop logic
 * - cleanup
 */


export function randomizer(R) {
  // peg sizes
  const sizes = [9, 15, 30, 45, 60, 75, 90, 105, 120];
  // outputs
  const outputs = ['dumbbell', 'ringer', 'starburst', 'abacus', 'multiply', 'gas', 'block', 'puzzle'];
    // colors
  let schemes = [
    { mono: ['ffffff', '111111', '222222'] }, 
    { lastdayofsummer: ['4281a4','48a9a6','eeeeee','d4b483','c1666b'] },
    { blueberry: ['e7e6f7','e3d0d8','aea3b0','827081','c6d2ed'] },
    { remove: ['5d2a42', 'C70039', 'fb6376','fcb1a6','ffdccc','fff9ec'] },
    { sundown: ['fcd0a1','b1b695','53917e','63535b','6d1a36'] },
    { merca: ['b32134','ebebeb','c0c0c0','3a6ea5','004e98'] },
    { liger: ['5bc0eb','fde74c','9bc53d','c3423f','404e4d'] }, // meh
    { moody: ['161925','23395b','406e8e','8ea8c3','cbf7ed'] },
    { hydroclassic: ['55dde0','33658a','2f4858','f6ae2d','f26419'] },
    { dino: ['dbf9f4','e6fdff','d9d7dd','b07bac','5f7367'] }, 
    { lilac: ['330c2f','7b287d','7067cf','b7c0ee','cbf3d2'] },
    { orangecountry: ['588b8b','ffffff','ffd5c2','f28f3b','c8553d'] },
    { zombie: ['8daa91','788475','5e5d5c','453643','28112b'] },
    { mint: ['a3e7fc','26c485','32908f','553a41','2f0601'] },
    { july: ['0d3b66','faf0ca','f4d35e','ee964b','f95738'] },
    { blackeye: ['0d1821','344966','e6aace','f0f4ef','bfcc94'] },
    { jazz: ['34f6f2','78e3fd','d1f5ff','eef8ff','7d53de'] },
    // 9 color scheme
    { pastel: ['eae4e9','fff1e6','fde2e4','fad2e1','e2ece9','bee1e6','f0efeb','dfe7fd','cddafd'] },
    // 10 color schemes
    { lizard: ['007f5f','2b9348','55a630','80b918','aacc00','bfd200','d4d700','dddf00','eeef20','ffff3f'] },
    { miami: ['f72585','b5179e','7209b7','560bad','480ca8','3a0ca3','3f37c9','4361ee','4895ef','4cc9f0'] },
    { germany: ['03071e','370617','6a040f','9d0208','d00000','dc2f02','e85d04','f48c06','faa307','ffba08'] },
    { toyland: ['f94144','f3722c','f8961e','f9844a','f9c74f','90be6d','43aa8b','4d908e','577590','277da1'] },
    { blues: ['012a4a','013a63','01497c','014f86','2a6f97','2c7da0','468faf','61a5c2','89c2d9','a9d6e5'] },
    { reddawn: ['641220','6e1423','85182a','a11d33','a71e34','b21e35','bd1f36','c71f37','da1e37','e01e37'] },
    { rainbow: ['ff0000','ff8700','ffd300','deff0a','a1ff0a','0aff99','0aefff','147df5','580aff','be0aff'] },
    { candy: ['54478c','2c699a','048ba8','0db39e','16db93','83e377','b9e769','efea5a','f1c453','f29e4c'] },
    { martian: ['b76935','a56336','935e38','815839','6f523b','5c4d3c','4a473e','38413f','263c41','143642'] },
  ];
  const schemeObj = R.random_choice(schemes);
  const schemeName = Object.keys(schemeObj)[0];
  const scheme = Object.values(schemeObj)[0];

  const size = R.random_choice(sizes)

  // All the pegs
  const all = (size / 2) * (size / 3);

  // Arrays for peg coloring
  const generatePegArray = () => Array.from({length: R.random_between(0, all / 2)}, () => R.random_int(0, all))

  // Peg groupings
  let greenland = generatePegArray();
  let canada = generatePegArray();
  let america = generatePegArray();
  let mexico = generatePegArray();
  let southAmerica = generatePegArray();
  let europe = generatePegArray();
  let africa = generatePegArray();
  let russia = generatePegArray();
  let china = generatePegArray();
  let japan = generatePegArray();
  let asia = generatePegArray();
  let australia = generatePegArray();
  
  // All the groupings
  let countries = [greenland, canada, america, mexico, southAmerica, europe, africa, russia, china, japan, asia, australia];

  // Randomly assign peg groupings into good / bad groups
  let good = R.random_choice(countries);
  let newList = [...countries];
  newList.filter(item => item !== good);
  let bad = R.random_choice(newList);
  newList.filter(item => item !== bad);

  // Based on intensity, add more to good and bad
  const intensity = R.random_int(1, 100);
  if (intensity > 50) {
    newList.forEach(country => {
      let random = R.random_int(1, 9);
      if (random >= 6) {
        if (random > 8) {
          bad = [...bad, ...country];
          return;
        }
        good = [...good, ...country];
        return;
      }
    });
  }

  // Build the prose
  const prose = proseBuilder(R);

  // Random array used for setting by hash
  const randomArray = Array.from({length: all}, () => Math.random());
  let output = R.random_choice(outputs);
  let croppedInt = R.random_int(0,9);
  let cropped = 'none';
  if ((croppedInt > 3 && croppedInt < 8 && ['gas','puzzle'].includes(output)) || ('puzzle' === output && size < 90)) {
    cropped = 'square'
  }
  if (croppedInt === 2 && (('puzzle' === output) || ('gas' === output && size > 15))) {
    cropped = 'swept'
  }
  if (croppedInt === 1 && (['puzzle','gas','block','starburst'].includes(output) || (['multiply','abacus'].includes(output) && size > 30) || ('ringer' === output && size > 90))) {
    cropped = 'mundi'
  }
  if (croppedInt === 0 && (size > 30 && size % 10 !== 5) && ['puzzle','gas','block','starburst'].includes(output)) {
    cropped = R.random_between(0,1) > 0 
      ? 'cross'
      : 'sando'
  }

  let hyper = R.random_int(0,9) < 1 && ['starburst', 'abacus', 'dumbbell'].includes(output); // (1/10 + 3/8) 3/80
  let squarePeg = R.random_int(0,4) < 1; // 1/4

  // Config values
  // 1/2016 (size / output / color)
  return {
    size: size, // 1/9
    output: output, // 1/8
    // square 3/5 + (1/4 || 1/8 + 2/9)
    // swept 1/10 + (1/8 || 1/8 + 2/9)
    // mundi 1/10 + (1/2 || 1/4 + 1/3 || 1/8 + 2/9)
    // none ???  
    cropped: cropped,
    behind: R.random_int(0,3), // 1/3
    hyper: hyper, // 3/80
    squarePeg: squarePeg, // 1/3
    schemeName: schemeName,
    scheme: scheme, // 1/28
    countries: countries,
    good: good,
    bad: bad,
    prose: prose,
    int: R.random_int(1,scheme.length - 1),
    randomizer: randomArray
  }
}

// Dots
export async function drillPegs(ctx, config, canvasWidth, canvasHeight) {
  const width = canvasWidth;
  const height = canvasHeight;
  // the size of the dots based on config
  const base = Math.floor(width / config.size);
  // quarter size 
  const quarterBase = base / 4;
  // half size 
  const halfBase = base / 2;
  // double size 
  const doubleBase = base * 2;
  // how many dots can go on the x axis
  const columnCount = Math.floor(config.size / 2);
  // how many dots can go on the y axis
  const rowCount = Math.floor(config.size / 3);
  // all the dots
  const allDots = columnCount * rowCount;
  // the x starting point: 1/6 the width
  let cx = Math.ceil( window.innerWidth / 4);
  // a static of this cx / used for resets
  const cxStatic = cx;
  // the y starting point: 1/6 the height
  const cy = Math.ceil(height / 5);
  // the row count / used for grid draw
  let row = 0;
  // empty animated points array
  let points = [];
  let columnFirst = [];
  let columnLast = [];
  // fontsize
  let fontSize = columnCount * base / 30 * 1.125; 

  // Testing Only: Build controls UI
  let pallete =[];
  config.scheme.forEach(s => {
    pallete.push(`<span style='background: #${s}'>&nbsp;</span>`)
  })
  let controlSettings = 
  `
    <span>Output: ${config.output}</span>
    <span>Size: ${config.size}</span>
    <span>Cropped: ${config.cropped}</span>
    <span>Behind: ${config.output !== 'multiply' && config.output !== 'ringer' && config.behind === 1}</span>
    <span>Hyper: ${config.hyper}</span>
    <span>SquarePeg: ${config.squarePeg}</span>
    <span>Base: ${base}</span>
    <span>width: ${width}</span>
    <span>All: ${allDots}</span>
    <span>Columns: ${columnCount}</span>
    <span>Rows: ${rowCount}</span>
    <span>Animation: ${((points.length * 5 + 500 % 60000) / 1000).toFixed(0)}s</span>
    <span>Font Size: bold ${Math.floor(fontSize)}px serif</span>
    <span>Randomizer:</span>
    <span>Scheme:${config.schemeName}</span>
    <span>Colors:</span>
    ${pallete.toString().replaceAll(',', '')}
  `;
  document.getElementById('controls').innerHTML = controlSettings;
  // END Controls

  // Testing Only: draw a rectangle around the pegs
  // ctx.beginPath();
  // ctx.rect(cxStatic + halfBase, cy, columnCount * base, rowCount * base);
  // ctx.stroke();
  
  // for all our available grid fill in our pegs
  for (let i = 0; i < allDots; i++) {
    // loop through countries and assign color
    config.countries.forEach( country => {
      countryFill(ctx, country, i, config);
    })

    // move the x axis by one dot
    cx = cx + base;
    // if the grid is wider than all the pegs that will fit into max columns then reset back to first column
    if (cx >= Math.floor((columnCount + 1) * base + cxStatic)) {
      cx = cxStatic + base;
    }

    // move down a row once we've filled it 
    let rowMax = (columnCount) * row;
    if (i === rowMax) {
      row++
    }
    
    // drill the peg
    ctx.beginPath();
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // round of square
    if (config.squarePeg) {
      ctx.rect(
        cx - quarterBase,
        (cy + row * base) - (base * .75),
        (halfBase),
        (halfBase)
      );
    } else {
      ctx.arc(
        cx,
        (cy + row * base) - halfBase,
        quarterBase,
        0,
        2 * Math.PI,
        false
      );
    }
    // Testing Only: Text helper
    // if (i < columnCount) {
    //   ctx.font = 'bold 16px serif';
    //   ctx.fillText(
    //     i,
    //     cx,
    //     (cy - row * base),
    //   );
    // }

    // color the peg
    ctx.fill();

    // push points for later animation values
    points.push({x: cx - halfBase, y: cy + row * base - base, start: i === columnCount * row});
    
    // abacus points
    if (i < columnCount) {
      columnFirst.push({x: cx - halfBase, y: cy + row * base - base})
    }
    if (i > (allDots - columnCount - 1)) {
      columnLast.push({x: cx - halfBase, y: cy + row * base - base})
    }
  }

  // randomize points
  const pointsCopy = [...points]; // used for dumbbell
  for (let i = points.length; i > 0; i--) {
    const j = Math.floor(config.randomizer[i] * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }

  // build our prose
  const poem = config.prose;
  let canvasBg = document.querySelector('canvas').style.backgroundColor;
  canvasBg = rgba2hex(canvasBg);
  let poemFill = `#${config.scheme[Math.floor(config.randomizer[1] * config.scheme.length)]}`;
  // account for canvas bg : bg should not be same as text
  poemFill = (canvasBg === poemFill) ? (canvasBg === '#ffffff') ? '#000' : '#fff' : poemFill;
  ctx.fillStyle = poemFill; 

  prose(
    ctx,
    poem,
    cxStatic + (config.output === 'multiply' ? quarterBase : halfBase) + (columnCount * halfBase),
    cy + (rowCount * base) + (fontSize * 1.5),
    columnCount * base,
    fontSize
  );

  // wait half a second would ya
  await new Promise(resolve => setTimeout(resolve, 1000));

  let i = -1;
  myLoop(i)

  //animator 
  async function myLoop(i) {
    i++;
    const fill = `#${config.scheme[Math.floor(config.randomizer[i + 1 ? i + 1 : i] * config.scheme.length)]}`;
    const blurArray = [1,2,3,4];
    // const lineArray = [base / 4, base / 3, base / 2, base];
    if (config.output !== 'multiply' && config.output !== 'ringer' && config.behind === 1) {
        ctx.globalCompositeOperation = 'destination-over';
    }
    if (config.cropped !== 'none') {
      ctx.beginPath();
      switch (config.cropped) {
        case 'square':
          ctx.rect(cxStatic + halfBase, cy, columnCount * base, row * base);
          break;
        case 'swept':
          ctx.arc(cxStatic + halfBase, cy, row * base, 0, 2 * Math.PI);
          break;
        case 'mundi':
          ctx.arc(cxStatic + halfBase + (columnCount * halfBase), cy + (row * halfBase), (row * halfBase) - (config.base < 15 ? doubleBase : base), 0, 2 * Math.PI);
          break;
        case 'sando':
          ctx.rect(cxStatic + halfBase, cy, columnCount * base, (row * base / 2) - doubleBase * 2);
          ctx.rect(cxStatic + halfBase, cy + (row * base / 2) + doubleBase * 2, columnCount * base, (row * base / 2) - doubleBase * 2);
          break;
        case 'cross':
          ctx.rect(cxStatic + halfBase, cy, columnCount * base / 2 - doubleBase * 2 - halfBase, (row * base / 2) - doubleBase * 2);
          ctx.rect(cxStatic + halfBase + (columnCount * base / 2 + doubleBase * 2) + halfBase, cy, columnCount * base / 2 - doubleBase * 2 - halfBase, (row * base / 2) - doubleBase * 2);
          ctx.rect(cxStatic + halfBase, cy + (row * base / 2) + doubleBase * 2, columnCount * base / 2 - doubleBase * 2 - halfBase, (row * base / 2) - doubleBase * 2);
          ctx.rect(cxStatic + halfBase + (columnCount * base / 2 + doubleBase * 2) + halfBase, cy + (row * base / 2) + doubleBase * 2, columnCount * base / 2 - doubleBase * 2 - halfBase, (row * base / 2) - doubleBase * 2);
          break;
      }
      ctx.clip();
    }
    if (config.hyper) {
      ctx.globalCompositeOperation = 'lighter';
    }
    // important after
    ctx.beginPath();
    ctx.fillStyle = fill;
    if (points[i]) {
      switch(config.output){
        case 'multiply':
          // multiply
          if (config.squarePeg) {
            ctx.rect(points[i].x - quarterBase, points[i].y - quarterBase, halfBase, halfBase);
          } else {
            ctx.arc(points[i].x, points[i].y, quarterBase, 0, 2 * Math.PI);
            ctx.arc(points[i].x, points[i].y, base / 8, 0, 2 * Math.PI);
          }
          break;
        case 'puzzle':
          // Puzzle
          ctx.globalAlpha = 0.8;
          ctx.shadowColor = fill;
          ctx.shadowOffsetX = config.randomizer[2] < 0.5 ? halfBase : -halfBase;
          ctx.shadowOffsetY = config.randomizer[3] < 0.5 ? halfBase : -halfBase;
          if (config.squarePeg) {
            ctx.rect(
              points[i].x,
              points[i].y,
              config.randomizer[[i]] < 0.5 
                ? base : config.randomizer[[i]] < 0.25
                ? doubleBase : base * 2.5,
              config.randomizer[[i]] < 0.5
                ? base : config.randomizer[i + 1 ? i + 1 : i - 1] < 0.25
                ? doubleBase : base * 2.5
            );
          } else {
            ctx.rect(
              points[i].x,
              points[i].y,
              base,
              base
            );
          }
          break;
        case 'gas':
          // Gas
          ctx.globalAlpha = 0.5;
          ctx.filter = `blur(${halfBase * blurArray[Math.floor(config.randomizer[4] * blurArray.length)]}px)`;
          ctx.shadowOffsetX = config.randomizer[5] < 0.5 ? base : -base;
          ctx.shadowOffsetY = config.randomizer[6] < 0.5 ? base : -base;
          ctx.rect(points[i].x, points[i].y, base, base);
          break;
        case 'block':
          // LEGO
          ctx.rect(points[i].x, points[i].y, base, base);
          ctx.globalAlpha = 0.4;
          break;
        case 'ringer':
          if (!(config.bad.includes(i) || config.good.includes(i))) {
            ctx.strokeStyle = fill;
            ctx.fillStyle = 'transparent';
            ctx.shadowColor = fill;
            if (config.squarePeg) {
              ctx.rect(points[i].x, points[i].y, base, base);
              if (i % 5) {
                ctx.rect(points[i].x + quarterBase, points[i].y + quarterBase, halfBase, halfBase);
              }
            } else {
              ctx.arc(points[i].x + halfBase, points[i].y + halfBase, halfBase, 0, 2 * Math.PI);
              if (i % 5) {
                ctx.arc(points[i].x + halfBase, points[i].y + halfBase, quarterBase, 0, 2 * Math.PI);
              }
            }
            ctx.stroke();
          }
          break;
        case 'abacus':
          // Lines
          if (columnFirst.filter(point => (point.x === points[i].x))) {
            ctx.beginPath();
            ctx.fillStyle = 'transparent';
            ctx.shadowColor = fill;
            ctx.globalAlpha = 0.05;
            ctx.shadowOffsetX = config.randomizer[7] < 0.5 ? halfBase : -halfBase;
            ctx.shadowOffsetY = config.randomizer[8] < 0.5 ? halfBase : -halfBase;
            ctx.lineWidth = base / 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = fill;
            const first = columnFirst.filter(point => point.x === points[i].x);
            const last = columnLast.filter(point => point.x === points[i].x)

            ctx.moveTo(first[0].x + halfBase, first[0].y - 1);
            ctx.lineTo(last[0].x + halfBase, last[0].y + base);

            ctx.stroke();
          }
          break;
        case 'starburst':
          // Starburst
          ctx.beginPath();
          ctx.fillStyle = 'transparent';
          ctx.shadowColor = 'transparent';
          ctx.globalAlpha = 0.2;
          ctx.shadowOffsetX = config.randomizer[9] < 0.5 ? halfBase : -halfBase;
          ctx.shadowOffsetY = config.randomizer[10] < 0.5 ? halfBase : -halfBase;
          ctx.lineWidth = base / 5;
          ctx.lineCap = 'round';
          ctx.strokeStyle = fill;

          ctx.moveTo(cxStatic + halfBase + (columnCount * halfBase), cy + (row * halfBase));
          ctx.lineTo(points[i].x + halfBase, points[i].y + halfBase);
          ctx.stroke();
          break;
        case 'dumbbell':
          // Dumbbell
          if (!(config.bad.includes(i) || config.good.includes(i))) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'transparent';
            ctx.shadowColor = fill;
            ctx.lineWidth = base / 10;
            ctx.lineCap = 'round';
            ctx.strokeStyle = fill;

            ctx.dumbbell(
              {x: pointsCopy[i].x + halfBase, y:(pointsCopy[i].y + halfBase )},
              checkIfBad(pointsCopy, halfBase, i, i+1, config.good, config.bad),
              1, 1, 1
              );           
            ctx.stroke();
          }
          break;
        }
      }
    // fill event for all
    ctx.fill();
    if (i < points.length - 1 && window.innerWidth === width){
      await new Promise(resolve => setTimeout(resolve, 5));
      myLoop(i);
    }
  }
}

// Utilities

// Used for dumbell, only return x/y point if it's good / bad, don't jump to next row
function checkIfBad(array, halfBase, numOg, num, badArray, goodArray) {
  if(array[numOg].y !== array[num].y) {
    return {x: (array[numOg]).x + halfBase, y:(array[numOg]).y + halfBase }
  } else if ((badArray.includes(num) || goodArray.includes(num)) && array[num]) {
      return {x: (array[num]).x + halfBase, y:(array[num]).y + halfBase }
  } else {
    return checkIfBad(array, halfBase, numOg, num + 1, badArray, goodArray)
  }
}

// slight slope
CanvasRenderingContext2D.prototype.dumbbell = function(from, to, frequency) { 
	let cx = 0;
  let cy = 0; 
	let fx = from.x, fy = from.y; 
  let tx = to.x, ty = to.y;
  let waveOffsetLength = 0;
	let ang = Math.atan2(ty - fy, tx - fx);
	let distance = Math.sqrt((fx - tx) * (fx - tx) + (fy - ty) * (fy - ty));
	let f = Math.PI * frequency;
	
	for (let i = 0; i <= distance; i += 1) {
		waveOffsetLength = Math.sin((i / distance) * f);
		cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI/2) * waveOffsetLength;
		cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI/2) * waveOffsetLength;

    i > 0 ? this.lineTo(cx, cy) : this.moveTo(cx, cy);
	}
}

// RGA 2 Hex
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;

// filter colors based on good / bad
function countryFill(ctx, country, num, config) {
  const s = config.scheme;
  if (country.includes(num)) {
    let fill = config.bad.includes(num)
    ? `#${s[0]}`
    : config.good.includes(num) 
      ? `#${s[s.length - 1]}`
      : `#${s[config.int, num % config.int]}`
    ctx.fillStyle = fill;
  }
}
