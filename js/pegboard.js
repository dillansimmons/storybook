import { prose, proseBuilder } from './prose';

export function randomizer(R) {
  // peg sizes
  const sizes = [9, 15, 30, 45, 60, 75, 90, 105, 120];
  if (R.random_int(1,500) === 99) { sizes.push(3) } // 1/5000 chance of a single dot
  // outputs //['Magnetic'] //
  const outputs = [
    'Abacus',
    'Tube',
    'Block',
    'Bubble',
    'Burst',
    'Diamond',
    'Gas',
    'Lines',
    'Multiply',
    'Pilled',
    'Puzzle',
    'Ring',
    'Weave',
    'Web'
  ];
    // colors
  const schemes = [
    // 3 color scheme
    { Mon: ['ffffff', '222222', '111111'] },
    { Pie: ['22B1F6', '7522F6', '2C49EB'] },
    { Goo: ['CBF611', '11F67D', '34EB1C'] },
    { Fry: ['F6A30C', 'EB5900', 'F6220C'] },
    // 5 color scheme
    { Sumer: ['EEEEEE', 'D4B483', '48A9A6', '4281A4', 'C1666B'] },
    { Bluby: ['E7E6F7', 'E3D0D8', 'C6D2ED', 'AEA3B0', '827081'] },
    { Merca: ['EBEBEB', 'C0C0C0', '3A6EA5', 'B32134', '004E98'] },
    { Moody: ['CBF7ED', '8EA8C3', '406E8E', '23395B', '161925'] },
    { Hydro: ['55DDE0', 'F6AE2D', 'F26419', '33658A', '2F4858'] },
    { Lilac: ['CBF3D2', 'B7C0EE', '7067CF', '7B287D', '330C2F'] },
    { Cntry: ['FFFFFF', 'FFD5C2', 'F28F3B', '588B8B', 'C8553D'] },
    { Zombi: ['8DAA91', '788475', '5E5D5C', '453643', '28112B'] },
    { Jazzz: ['EEF8FF', 'D1F5FF', '78E3FD', '34F6F2', '7D53DE'] },
    // 9 color scheme
    { OnThePond: ['2498FF', '0091E2', '0086BF', '00789A', '006977', '005A57', '044A3E', '1A3A2B', '1E2B1E' ] },
    { SirenBoom: ['0091AD', '1780A1', '2E6F95', '455E89', 'B7094C', '5C4D7D', 'A01A58', '723C70', '892B64'] },
    { BigCircus: ['FFFF00', 'FFD700', 'FFA800', 'FF6F25', 'FF0053', 'FF007E', 'FF00AC', 'DE00D9', '7300FF'] },
    { HirstLike: ['A8CCE6', 'EFC6CC', 'FBD601', '1BB6A0', 'E84B18', 'AD497F', 'C73331', 'C12049', '3D3E6E'] },
    // 10 color schemes
    { NeonLizard: ['FFFF3F', 'EEEF20', 'DDDF00', 'D4D700', 'BFD200', 'AACC00', '80B918', '55A630', '2B9348', '007F5F'] },
    { MiamiNight: ['4CC9F0', '4895EF', 'F72585', '4361EE', 'B5179E', '3F37C9', '7209B7', '560BAD', '3A0CA3', '480CA8'] },
    { NewGermany: ['FFBA08', 'FAA307', 'F48C06', 'E85D04', 'DC2F02', 'D00000', '9D0208', '6A040F', '370617', '03071E'] },
    { BigToyland: ['F9C74F', '90BE6D', 'F8961E', 'F9844A', '43AA8B', '4D908E', 'F3722C', '577590', '277DA1', 'F94144'] },
    { Blueliners: ['A9D6E5', '89C2D9', '61A5C2', '468FAF', '2C7DA0', '2A6F97', '014F86', '01497C', '013A63', '012A4A'] },
    { RedSkyDawn: ['E01E37', 'DA1E37', 'C71F37', 'BD1F36', 'B21E35', 'A11D33', 'A71E34', '85182A', '6E1423', '641220'] },
    { RainbowMad: ['0AEFFF', '0AFF99', 'FFD300', 'DEFF0A', 'A1FF0A', 'FF8700', '147DF5', 'FF0000', 'BE0AFF', '580AFF'] },
    { Candymaker: ['B9E769', 'EFEA5A', 'F1C453', '83E377', '16DB93', 'F29E4C', '0DB39E', '048BA8', '2C699A', '54478C'] },
    { MartianDay: ['B76935', 'A56336', '935E38', '815839', '6F523B', '5C4D3C', '4A473E', '38413F', '263C41', '143642'] }
  ];
  const schemeObj = R.random_choice(schemes);
  const schemeName = Object.keys(schemeObj)[0];
  const scheme = Object.values(schemeObj)[0];

  const size = R.random_choice(sizes)

  // All the pegs : TODO check coverage
  const all = (size / 2) * (size / 3);

  // Arrays for peg coloring
  const generatePegArray = () => Array.from({length: R.random_between(0, all / 2)}, () => R.random_int(0, all))

  // Peg groupings
  const greenland = generatePegArray();
  const canada = generatePegArray();
  const america = generatePegArray();
  const mexico = generatePegArray();
  const southAmerica = generatePegArray();
  const europe = generatePegArray();
  const africa = generatePegArray();
  const russia = generatePegArray();
  const china = generatePegArray();
  const japan = generatePegArray();
  const asia = generatePegArray();
  const australia = generatePegArray();

  // All the groupings
  const countries = [greenland, canada, america, mexico, southAmerica, europe, africa, russia, china, japan, asia, australia];

  // Randomly assign peg groupings into good / bad groups
  let good = R.random_choice(countries);
  const newList = [...countries];
  newList.filter(item => item !== good);
  let bad = R.random_choice(newList);
  newList.filter(item => item !== bad);

  // Based on intensity, add more to good and bad
  const intensity = R.random_int(1, 100);
  if (intensity > 50) {
    newList.forEach(country => {
      const random = R.random_int(1, 9);
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
  const output = R.random_choice(outputs);
  const croppedInt = R.random_int(0,9);

  // Cropping
  let cropped = 'none';
  if ((croppedInt > 3 && croppedInt < 8 && (['Gas','Puzzle', 'Pilled', 'Tube'].includes(output)) || ('Puzzle' === output && size < 90))) {
    cropped = 'square'
  }
  if (croppedInt === 2 && (['Bubble','Lines','Puzzle', 'Pilled', 'Tube', 'Diamond'].includes(output) || ('Gas' === output && size > 15))) {
    cropped = 'swept'
  }
  if (croppedInt === 1 && (['Puzzle','Gas','Block','Burst','Lines', 'Pilled', 'Tube', 'Diamond', 'Web'].includes(output) || (['Multiply','Abacus'].includes(output) && size > 30) || ('Ring' === output && size > 90))) {
    cropped = 'mundi'
  }
  if (croppedInt === 0 && (size > 30 && size % 10 !== 5) && ['Puzzle','Gas','Block','Burst','Lines', 'Pilled', 'Tube', 'Web'].includes(output)) {
    cropped = R.random_int(0,1) === 1
      ? 'cross'
      : 'sando'
  }

  const hyper = R.random_int(0,9) < 1 && ['Burst', 'Gas', 'Abacus', 'Weave', 'Lines', 'Pilled', 'Diamond', 'Web'].includes(output); // (1/10 + 4/8) 1/20
  const squarePeg = R.random_int(0,4) < 1; // 1/4
  const behind = output !== 'Multiply' && output !== 'Ring' && output !== 'Bubble' && R.random_int(0,3) === 1; // (1/3 + 3/10) 1/10
  const orderly = R.random_int(0,7) < 1 ||  ['Weave', 'Lines', 'Bubble'].includes(output);

  // Config values
  // 1/2016 (size / output / color)
  return {
    size, // 1/9
    output, // 1/10
    // square 3/5 + (1/4 || 1/8 + 2/9)
    // swept 1/10 + (1/8 || 1/8 + 2/9)
    // mundi 1/10 + (1/2 || 1/4 + 1/3 || 1/8 + 2/9)
    // none ???
    cropped,
    behind, // 1/3
    orderly, // 1/8
    hyper, // 3/80
    squarePeg, // 1/3
    schemeName,
    scheme, // 1/30
    countries,
    good,
    bad,
    prose,
    int: R.random_int(1,scheme.length - 1),
    randomizer: randomArray
  }
}

// Dots
export async function drillPegs(canvas, ctx, config, canvasWidth, canvasHeight) {
  // prose or no based on localstorage value / keypress
  const showProse = window.localStorage.getItem('no-prose') === null ? true : false;
  const width = canvasWidth;
  const height = canvasHeight;
  const midX = canvasWidth / 2;
  const midY = canvasHeight / 2;
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
  // fontsize
  const fontSize = columnCount * base / 30 * 1.125;
  // maxes
  const heightMax = (rowCount * base + (showProse ? (fontSize * 1.5) + fontSize * 2 : 0));
  const widthMax = (columnCount * base);
  // all the dots
  const allDots = columnCount * rowCount;
  // the x starting point: 1/6 the width
  let cx = Math.ceil(midX - widthMax / 2);
  // a static of this cx / used for resets
  const cxStatic = cx;
  // the y starting point: 1/6 the height
  const cy = Math.ceil(midY - heightMax / 2);
  // the row count / used for grid draw
  let row = 0;
  // initial background
  const canvasBg = canvas.style.backgroundColor;
  // empty animated points array
  let points = [];
  const columnFirst = [];
  const columnLast = [];

  // TESTING ONLY: Build controls UI
  const pallete = [];
  config.scheme.forEach(s => {
    pallete.push(`<span style='background: #${s}'>&nbsp;</span>`)
  })
  const controlSettings =
  `
    <span>Output: ${config.output}</span>
    <span>Size: ${config.size}</span>
    <span>Cropped: ${config.cropped}</span>
    <span>Hyper: ${config.hyper}</span>
    <span>SquarePeg: ${config.squarePeg}</span>
    <span>Behind: ${config.behind}</span>
    <span>Orderly: ${config.orderly}</span>
    <br/>
    <span>Base: ${base}</span>
    <span>All: ${allDots}</span>
    <span>Columns: ${columnCount}</span>
    <span>Rows: ${rowCount}</span>
    <span>Animation: ${((allDots * 5 + 500 % 60000) / 1000).toFixed(0)}s</span>
    <span>Font Size: bold ${Math.floor(fontSize)}px serif</span>
    <br />
    <span>Scheme:${config.schemeName}</span>
    ${pallete.toString().replaceAll(',', '')}
  `;
  document.getElementById('controls').innerHTML = controlSettings;
  // END Controls

  // TESTING ONLY: draw a rectangle around the pegs
  // ctx.beginPath();
  // ctx.rect(cx - halfBase, cy - halfBase, widthMax + base, heightMax + base);
  // ctx.lineWidth = base / 10;
  // ctx.strokeStyle = `#${config.scheme[2]}`
  // ctx.stroke();

  // TESTING ONLY : background stuff
  // ctx.beginPath();
  // ctx.fillStyle = `${canvasBg}`;
  // ctx.fillRect(0, 0, width, height);

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
    const rowMax = (columnCount) * row;
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
        cx - (base * .75) + (config.output === 'Multiply' ? quarterBase : 0),
        (cy + row * base) - (base * .75),
        (halfBase),
        (halfBase)
      );
    } else {
      ctx.arc(
        cx - halfBase + (config.output === 'Multiply' ? quarterBase : 0),
        (cy + row * base) - halfBase,
        quarterBase,
        0,
        2 * Math.PI,
        false
      );
    }
    // TESTING ONLY: Text helper, grid troubleshooting
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
    points.push({x: cx - base, y: cy + row * base - base, start: i === columnCount * row});

    // abacus points
    if (i < columnCount) {
      columnFirst.push({x: cx - base, y: cy + row * base - base})
    }
    if (i > (allDots - columnCount - 1)) {
      columnLast.push({x: cx - base, y: cy + row * base - base})
    }
  }

  // make a non random copy of points
  let pointsCopy = [...points]; // used for Weave / blocked
  // randomize points
  for (let i = points.length; i >= 0; i--) {
    const j = Math.floor(config.randomizer[i] * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }
  // remove undefined
  points = points.filter(x => x !== undefined);

  // for Bubble reduce to only the points used
  if (config.output === 'Bubble' && config.size > 15) {
    pointsCopy = pointsCopy.filter((point, i) => (i % 5 === 0 && i / columnCount % 5 < 1));
  }

  if (config.output === 'Lines') {
    pointsCopy = pointsCopy.filter((point, i) => i % columnCount === 0);
  }

  // build our prose
  if (showProse) {
    const poem = config.prose;
    const canvasBgHex = rgba2hex(canvasBg).toUpperCase();
    let poemFill = `#${config.scheme[canvasBgHex === '#FFFFFF' ? config.scheme.length - 1 : 0]}`;
    // account for canvas bg : bg should not be same as text
    poemFill = (canvasBgHex === poemFill) ? (canvasBgHex === '#FFFFFF') ? '#000000' : '#FFFFFF' : poemFill;
    ctx.fillStyle = poemFill;

    prose(
      ctx,
      poem,
      cxStatic + widthMax / 2,
      cy + heightMax - (fontSize * 2),
      widthMax,
      fontSize,
      poemFill
    );
  }

  // wait a second would ya
  await new Promise(resolve => setTimeout(resolve, 1000));

  // cropped
  if (config.cropped !== 'none') {
    ctx.beginPath();
    switch (config.cropped) {
      case 'square':
        ctx.rect(cxStatic, cy, widthMax, row * base);
        break;
      case 'swept':
        if (config.output === 'Bubble') {
          ctx.rect(cxStatic - doubleBase, cy - doubleBase, widthMax + halfBase + doubleBase, row * base + doubleBase);
        } else {
          ctx.arc(cxStatic, cy, row * base, 0, 2 * Math.PI);
        }
        break;
      case 'mundi':
        ctx.arc(cxStatic + (widthMax / 2), cy + (row * halfBase), (row * halfBase) - (config.base < 15 ? doubleBase : base), 0, 2 * Math.PI);
        break;
      case 'sando':
        ctx.rect(cxStatic, cy, widthMax, (row * base / 2) - doubleBase * 2);
        ctx.rect(cxStatic, cy + (row * base / 2) + doubleBase * 2, widthMax, (row * base / 2) - doubleBase * 2);
        break;
      case 'cross':
        ctx.rect(cxStatic, cy, widthMax / 2 - doubleBase * 2 - halfBase, (row * base / 2) - doubleBase * 2);
        ctx.rect(cxStatic + (widthMax / 2 + doubleBase * 2) + halfBase, cy, widthMax / 2 - doubleBase * 2 - halfBase, (row * base / 2) - doubleBase * 2);
        ctx.rect(cxStatic, cy + (row * base / 2) + doubleBase * 2, widthMax / 2 - doubleBase * 2 - halfBase, (row * base / 2) - doubleBase * 2);
        ctx.rect(cxStatic + (widthMax / 2 + doubleBase * 2) + halfBase, cy + (row * base / 2) + doubleBase * 2, widthMax / 2 - doubleBase * 2 - halfBase, (row * base / 2) - doubleBase * 2);
        break;
    }
    ctx.clip();
  }

  // if not swept crop special for bubble
  if (config.cropped !== 'swept' && config.output === 'Bubble') {
    ctx.rect(cxStatic - doubleBase, cy - doubleBase, widthMax + halfBase + doubleBase, row * base + doubleBase);
    ctx.clip();
  }

  if (config.behind) {
    ctx.globalCompositeOperation = 'destination-over';
  }

  if (config.hyper) {
    ctx.globalCompositeOperation = 'lighter';
  }

  const i = -1;
  myLoop(i)

  // animator
  async function myLoop(i) {
    i++;
    const fill = `#${config.scheme[Math.floor(config.randomizer[i + 1 ? i + 1 : i] * config.scheme.length)]}`;
    const blurArray = [1,2,3,4];

    ctx.beginPath();
    ctx.fillStyle = fill;
    if (config.orderly) {
      points = pointsCopy;
    }
    if (points[i]) {
      switch(config.output) {

        case 'Multiply':
          // multiply
          if (config.squarePeg) {
            ctx.rect(points[i].x, points[i].y - quarterBase, halfBase, halfBase);
          } else {
            ctx.arc(points[i].x + quarterBase, points[i].y, quarterBase, 0, 2 * Math.PI);
            ctx.arc(points[i].x + quarterBase, points[i].y, base / 8, 0, 2 * Math.PI);
          }

          // stack
          // if (config.squarePeg) {
          //   ctx.rect(points[i].x + halfBase, points[i].y - quarterBase, halfBase, halfBase);
          // } else {
          //   ctx.arc(points[i].x + quarterBase + halfBase, points[i].y, quarterBase, 0, 2 * Math.PI);
          //   ctx.arc(points[i].x + quarterBase + halfBase, points[i].y, base / 8, 0, 2 * Math.PI);
          // }
          break;

        case 'Puzzle':
          ctx.globalAlpha = 0.8;
          ctx.shadowColor = fill;
          ctx.shadowOffsetX = config.randomizer[i] < 0.5 ? doubleBase * config.randomizer[i] : -doubleBase * config.randomizer[i];
          ctx.shadowOffsetY = config.randomizer[i] < 0.5 ? doubleBase * config.randomizer[i] : -doubleBase * config.randomizer[i];
          if (config.squarePeg) {
            ctx.arc(
              config.randomizer[i] < 0.5 ? points[i].x + halfBase : points[i].x - quarterBase,
              config.randomizer[i] < 0.5 ? points[i].y + quarterBase : points[i].y - quarterBase,
              base,
                0, 2 * Math.PI
            );
            ctx.arc(points[i].x + halfBase, points[i].y + halfBase, halfBase * .75, 0, 2 * Math.PI);
          } else {
            ctx.rect(
              points[i].x,
              points[i].y,
              base,
              base
            );
          }
          break;

        case 'Gas':
          ctx.globalAlpha = 0.4;
          ctx.shadowColor = fill;
          ctx.shadowBlur = base * blurArray[Math.floor(config.randomizer[i] * blurArray.length)];
          ctx.shadowOffsetY = width // + (config.randomizer[i] < 0.5 ? base : -base);
          ctx.rect(points[i].x, points[i].y - width, base, base);
          ctx.fill();
          break;

        case 'Block':
          ctx.rect(points[i].x, points[i].y, base, base);
          ctx.globalAlpha = 0.8;
          break;

        case 'Ring':
          if (!config.bad.includes(i)) {
            ctx.strokeStyle = fill;
            ctx.lineWidth = config.size === 9
                              ? config.size * 2
                              : config.size === 15
                                ? config.size / 2
                                : 2;
            ctx.fillStyle = 'transparent';
            ctx.shadowColor = fill;
            if (config.squarePeg) {
              ctx.rect(points[i].x + base * .125, points[i].y + base * .125, base * .75, base * .75);
              if (i % 5) {
                ctx.rect(points[i].x + quarterBase, points[i].y + quarterBase, halfBase, halfBase);
              }
            } else {
              ctx.arc(points[i].x + halfBase, points[i].y + halfBase, halfBase * .75, 0, 2 * Math.PI);
              if (i % 5) {
                ctx.moveTo(points[i].x + halfBase + quarterBase, points[i].y + halfBase);
                ctx.arc(points[i].x + halfBase, points[i].y + halfBase, quarterBase, 0, 2 * Math.PI);
              }
            }
            ctx.stroke();
          }
          break;

        case 'Abacus':
          if (columnFirst.filter(point => (point.x === points[i].x))) {
            ctx.beginPath();
            ctx.fillStyle = 'transparent';
            ctx.shadowColor = fill;
            ctx.globalAlpha = 0.15;
            ctx.shadowOffsetX = config.randomizer[i] < 0.5 ? halfBase : -halfBase;
            ctx.shadowOffsetY = config.randomizer[i + 1 ? i + 1 : i] > 0.5 ? halfBase : -halfBase;
            ctx.lineWidth = base / 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = fill;
            const first = columnFirst.filter(point => point.x === points[i].x);
            const last = columnLast.filter(point => point.x === points[i].x)

            ctx.moveTo(first[0].x + halfBase, first[0].y + halfBase);
            ctx.lineTo(last[0].x + halfBase, last[0].y + halfBase);

            ctx.stroke();
          }
          break;

        case 'Burst':
          ctx.beginPath();
          ctx.fillStyle = 'transparent';
          ctx.shadowColor = 'transparent';
          ctx.globalAlpha = 0.2;
          ctx.shadowOffsetX = config.randomizer[9] < 0.5 ? halfBase : -halfBase;
          ctx.shadowOffsetY = config.randomizer[10] < 0.5 ? halfBase : -halfBase;
          ctx.lineWidth = base / 5;
          ctx.lineCap = 'round';
          ctx.strokeStyle = fill;

          ctx.moveTo(midX, midY - (showProse ? ((fontSize * 1.5 + fontSize * 2) / 2) : 0));
          ctx.lineTo(points[i].x + halfBase, points[i].y + halfBase);
          ctx.stroke();
          break;

        case 'Weave':
          if (!(config.bad.includes(i) || config.good.includes(i))) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'transparent';
            ctx.shadowColor = fill;
            ctx.lineWidth = base / 3;
            ctx.lineCap = 'round';
            ctx.strokeStyle = fill;

            weave(
              ctx,
              {x: pointsCopy[i].x + halfBase, y:(pointsCopy[i].y + halfBase )},
              checkIfBad(pointsCopy, halfBase, i, i+1, config.good, config.bad),
              2 * config.randomizer[i]
            );
            ctx.stroke();
          }
          break;

        case 'Bubble':
          ctx.globalAlpha = 0.8;
          if (config.size <= 15) {
                ctx.rect(pointsCopy[i].x, pointsCopy[i].y, base, base);
                ctx.arc(pointsCopy[i].x + quarterBase, pointsCopy[i].y + quarterBase, halfBase, 0, 2 * Math.PI);
            break;
          }
            ctx.rect(pointsCopy[i].x, pointsCopy[i].y, doubleBase * 2.5, doubleBase * 2.5);
            ctx.arc(pointsCopy[i].x + doubleBase * .75, pointsCopy[i].y + doubleBase * .75, (doubleBase * 1.25), 0, 2 * Math.PI);
          break;

        case 'Lines':
            ctx.globalAlpha = 0.75;
            ctx.rect(pointsCopy[i].x, pointsCopy[i].y + quarterBase, widthMax, base + 2 - halfBase);
          break;

        case 'Magnetic':
          ctx.globalAlpha = 0.5;
          // ctx.fillStyle = 'transparent';
          ctx.beginPath();
          // ctx.fillStyle = shadeColor(fill, (i * config.randomizer[i]));
          ctx.setTransform(1, 0, 0, 1, points[i].x + (base * .375), points[i].y);
          // ctx.rotate(90 * Math.PI / 360);
          ctx.rect(0,0,quarterBase,base);
          ctx.rect(0 - (base * .375),0 +(base * .375),base,quarterBase);
          // ctx.arc(0, 0, quarterBase * config.randomizer[i], halfBase, 0, 2 * Math.PI);
          // ctx.arc(0, 0, halfBase * config.randomizer[i], halfBase, 0, 2 * Math.PI);
          // ctx.stroke();
          break;

          case 'Web':
            ctx.globalAlpha = 0.75;
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, points[i].x + (base * .375), points[i].y);
            ctx.rect(0,0,quarterBase,base);
            ctx.rect(0 - (base * .375),0 +(base * .375),base,quarterBase);
            break;

        case 'Pilled':
          ctx.globalAlpha = 0.75;
          // 45 Edition
          // *.75 to help with rotation
          ctx.setTransform(1, 0, 0, 1, points[i].x + quarterBase, points[i].y - quarterBase *.75);
          ctx.rotate(45 * Math.PI / 360);
          ctx.arc(0, 0 + halfBase, halfBase, 0, 2 * Math.PI);
          ctx.rect(0, 0, base, base);
          ctx.arc(0 + base, 0 + halfBase, halfBase, 0, 2 * Math.PI);
          break;

          case 'Tube':
            ctx.globalAlpha = 0.75;
            ctx.setTransform(1, 0, 0, 1, points[i].x, points[i].y);
            // 45 Edition
            // *.75 to help with rotation
            // ctx.setTransform(1, 0, 0, 1, points[i].x + quarterBase, points[i].y - quarterBase *.75);
            // ctx.rotate(45 * Math.PI / 360);
            ctx.arc(0, 0 + halfBase, halfBase, 0, 2 * Math.PI);
            ctx.rect(0, 0, base, base);
            ctx.arc(0 + base, 0 + halfBase, halfBase, 0, 2 * Math.PI);
            break;

          case 'Diamond':
            ctx.globalAlpha = 0.8;
            ctx.setTransform(1, 0, 0, 1, points[i].x + halfBase, points[i].y - quarterBase);
            ctx.rotate(90 * Math.PI / 360);
            ctx.rect(0, 0, base, base);
            break;
        }
      }
    // fill event for all
    ctx.fill();
    // the window resizes or the background changes : those signal we've restarted the animation so stop the old ones
    if (i < points.length - 1 && window.innerWidth === width && window.innerHeight === height && canvasBg === document.querySelector('canvas').style.backgroundColor) {
      // TESTING ONLY : allow no animate
      if (!window.localStorage.getItem('no-animate')) {
        await new Promise(resolve => setTimeout(resolve, 5));
      }
      myLoop(i);
    }
  }
}

// Utilities

// Used for Weave, only return x/y point if it's good / bad, don't jump to next row
function checkIfBad(array, halfBase, numOg, num, badArray, goodArray) {
  // if it
  if (array[numOg]?.y !== array[num]?.y) {
    return {x: (array[numOg]).x + halfBase, y:(array[numOg]).y + halfBase }
  } else if ((!badArray.includes(num) || !goodArray.includes(num)) && array[num]) {
    return {x: (array[num]).x + halfBase, y:(array[num]).y + halfBase }
  } else {
    return checkIfBad(array, halfBase, numOg, num + 1, badArray, goodArray)
  }
}

// slight slope
function weave(context, from, to, frequency) {
	let cx;
  let cy;
  let waveOffsetLength;
	const fx = from.x;
  const fy = from.y;
  const tx = to.x;
  const ty = to.y;
	const ang = Math.atan2(ty - fy, tx - fx);
	const distance = Math.sqrt((fx - tx) * (fx - tx) + (fy - ty) * (fy - ty));
	const f = Math.PI * frequency;

	for (let i = 0; i <= distance; i += 1) {
		waveOffsetLength = Math.sin((i / distance) * f);
		cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI/2) * waveOffsetLength;
		cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI/2) * waveOffsetLength;
    if (i > 0) {
      context.lineTo(cx, cy);
    } else {
      context.moveTo(cx, cy);
    }
	}
}

// RGA 2 Hex
const rgba2hex = rgba => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;

// filter colors based on good / bad
function countryFill(ctx, country, num, config) {
  const s = config.scheme;
  let fill = `#${s[config.int, num % config.int]}`;
  if (country.includes(num)) {
    if (config.bad.includes(num)) {
      fill = `#${s[0]}`
    }
    if (config.good.includes(num)) {
      fill = `#${s[s.length - 1]}`
    }
  }
  ctx.fillStyle = fill;
}
