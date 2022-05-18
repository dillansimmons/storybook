import { proseBuilder, stateQue, placeQue, challengeQue } from './prose';
import {stacked, gallery, computer, novel, sidebar} from './layouts';
import { gridWork } from './drawings/helpers';

export function configBuilder(R) {
    // Colors
    const schemes = [
        // 3 color scheme
        { Coo: ['DDD1C7', '0F2D2F', '5F8585' ] },
        { Fry: ['F6A30C', 'EB5900', 'F6220C'] },
        // { Goo: ['CBF611', '11F67D', '34EB1C'] },
        { Mon: ['ffffff', '222222', '111111'] },
        { Pie: ['22B1F6', '7522F6', '2C49EB'] },
        // 5 color scheme
        { Bluby: ['E7E6F7', 'E3D0D8', 'C6D2ED', 'AEA3B0', '827081'] },
        // { Cntry: ['FFFFFF', 'FFD5C2', 'F28F3B', '588B8B', 'C8553D'] },
        { Flame: ['E04B00', 'F57E00', 'F59700', 'FFD399', 'FFFFFF'] },
        // { Hydro: ['55DDE0', 'F6AE2D', 'F26419', '33658A', '2F4858'] },
        // { Lilac: ['CBF3D2', 'B7C0EE', '7067CF', '7B287D', '330C2F'] },
        { Lizar: ['AACC00', '80B918', '55A630', '2B9348', '007F5F'] },
        { Merca: ['EBEBEB', 'C0C0C0', '3A6EA5', 'B32134', '004E98'] },
        { Moody: ['CBF7ED', '8EA8C3', '406E8E', '23395B', '161925'] },
        { Prsia: ['512888', '4C2C96', '4634A7', '3D3BBB', '3A41C6'] },
        { Sumer: ['EEEEEE', 'D4B483', '48A9A6', '4281A4', 'C1666B'] },
        { Zombi: ['8DAA91', '788475', '5E5D5C', '453643', '28112B'] },
        // 9 color scheme
        { FrogHound: ['D8F3DC', 'B7E4C7', '95D5B2', '74C69D', '52B788', '40916C', '2D6A4F', '1B4332', '081C15' ] },
        { OnThePond: ['2498FF', '0091E2', '0086BF', '00789A', '006977', '005A57', '044A3E', '1A3A2B', '1E2B1E' ] },
        { SirenBoom: ['0091AD', '1780A1', '2E6F95', '455E89', 'B7094C', '5C4D7D', 'A01A58', '723C70', '892B64' ] },
        // 10 color schemes
        { MiamiNight: ['4CC9F0', '4895EF', 'F72585', '4361EE', 'B5179E', '3F37C9', '7209B7', '560BAD', '3A0CA3', '480CA8'] },
        { NewGermany: ['FFBA08', 'FAA307', 'F48C06', 'E85D04', 'DC2F02', 'D00000', '9D0208', '6A040F', '370617', '03071E'] },
        { MarshPaths: ['582F0E', '7F4F24', '936639', 'A68A64', 'B6AD90', 'C2C5AA', 'A4AC86', '656D4A', '414833', '333D29'] },
        { MustardJar: ['FFE169', 'FAD643', 'EDC531', 'DBB42C', 'C9A227', 'B69121', 'A47E1B', '926C15', '805B10', '76520E'] },
        // ^ Fix base color (TOO ORANGE)
        { Blueliners: ['A9D6E5', '89C2D9', '61A5C2', '468FAF', '2C7DA0', '2A6F97', '014F86', '01497C', '013A63', '012A4A'] },
        { RedSkyDawn: ['E01E37', 'DA1E37', 'C71F37', 'BD1F36', 'B21E35', 'A11D33', 'A71E34', '85182A', '6E1423', '641220'] },
        { MartianDay: ['B76935', 'A56336', '935E38', '815839', '6F523B', '5C4D3C', '4A473E', '38413F', '263C41', '143642'] }
    ];

    const schemeObj = schemes[Math.floor(R.random_dec() * schemes.length)];
    const schemeName = Object.keys(schemeObj)[0];
    const scheme = Object.values(schemeObj)[0];

    const fontStyles = ['serif', 'sans-serif', 'monospace'];
    const fontStyle = fontStyles[Math.floor(R.random_dec() * fontStyles.length)];

    const layouts = [
        // // NAH 'computer',
        'gallery',
        'novel',
        'sidebar',
        'stacked'
    ]

    const dropCaps = ['chonk', 'myst', 'lined', 'oddball', 'normi', 'berry', 'bones'];

    const layout = layouts[Math.floor(R.random_dec() * layouts.length)];
    const dropCap = dropCaps[Math.floor(R.random_dec() * dropCaps.length)];


    // Build the prose
    const prose = proseBuilder(R);
    const title = proseBuilder(R, true)

    // Random array used for setting by hash
    const dotsMax = R.random_int(750,1000);
    const randomArray = Array.from({length: (window.innerWidth * window.innerHeight)}, () => R.random_dec());
    const randomArray2 = Array.from({length: (window.innerWidth * window.innerHeight)}, () => R.random_dec());

    const state = containsAny(prose,stateQue);
    const place = containsAny(prose, placeQue);
    const challenge = containsAny(prose, challengeQue);

    const pattern = ['[]', '()', '#', '0', '|||', '///'];

    // Config values
    // 1/2016 (size / output / color)
    return {
        dropCap,
        fontStyle,
        layout,
        pattern: R.random_choice(pattern),
        noisy: R.random_int(0,3) === 3,
        mood: {
            state,
            place,
            challenge
        },
        noiseFactor: dotsMax,
        spacing: R.random_num(0.2,1),
        prose,
        title,
        scheme,
        schemes,
        schemeName,
        size: R.random_int(4,12),
        randomizer: randomArray,
        randomizer2: randomArray2
    }
}

// Dots
export async function mainFunction(canvas, ctx, config, canvasWidth, canvasHeight) {
    // prose or no based on localstorage value / keypress
    const width = canvasWidth;
    const height = canvasHeight;
    const midX = canvasWidth / 2;
    const midY = canvasHeight / 2;
    // the size of the dots based on config
    const base = Math.floor(width / config.size);
    // how many dots can go on the x axis
    const columnCount = Math.floor(config.size / 1.33333333333);
    // how many dots can go on the y axis
    // const rowCount = Math.floor(config.size / 2);
    // fontsize
    const fontSize = columnCount * base / 20 * 1.125;
    // maxes
    const widthMax = columnCount * base / 1.5;
    // all the dots
    // const allDots = columnCount * rowCount;

    // // TEST Align
    // ctx.strokStyle=config.scheme[0];
    // ctx.beginPath();
    //   ctx.moveTo(0, midY);
    //   ctx.lineTo(width,midY);
    //   ctx.stroke();
    // ctx.closePath();

    // ctx.beginPath();
    //   ctx.moveTo(midX, 0);
    //   ctx.lineTo(midX, height);
    //   ctx.stroke();
    // ctx.closePath();

    // TESTING ONLY: Build controls UI
    const pallete = [];
    config.scheme.forEach(s => {
        pallete.push(`<span style='background: #${s}'>&nbsp;</span>`)
    })

    let mood = '';
    // config.mood.forEach(s => {
    for (const [key, value] of Object.entries(config.mood)) {
        mood += `<span>${key[0].toUpperCase() + key.slice(1)}: ${value}</span>`;
    }
    // })
    const controlSettings =
  `
    <span>Noisy: ${config.noisy}</span>
    <span>Spacing: ${config.spacing}</span>
    <span>Noise Level: ${config.noiseFactor}</span>
    ${mood}
    <br/>
    <span>Dropcap: ${config.dropCap}</span>
    <span>Base: ${base}</span>
    <span>Layout: ${config.layout}</span>
    <span>Font Size: bold ${Math.floor(fontSize)}px serif</span>
    <br />
    <span>Scheme:${config.schemeName}</span>
    ${pallete.toString().replaceAll(',', '')}
  `;
    document.getElementById('controls').innerHTML = controlSettings;
    // END Controls

    const canvasBg = canvas.style.backgroundColor;
    const backgroundArray = ['#000000','#222222', '#F9F4EF', '#FFFFFF'];
    const canvasBgHex = rgba2hex(canvasBg).toUpperCase();
    const isLight = canvasBgHex === '#FFFFFF' || canvasBgHex === '#F9F4EF';
    // account for canvas bg : bg should not be same as text
    let poemFill = `#${config.scheme[isLight ? config.scheme.length - 1 : 0]}`;
    poemFill = backgroundArray.includes(poemFill) ? isLight ? '#000000' : '#FFFFFF' : poemFill;
    ctx.fillStyle = poemFill;

    // ctx.rect(midX-base*.75, midY-base*3, base*1.5, base*1.5);
    // ctx.stroke();
    // end place

    // ctx.save();
    // ctx.rotate(5 * Math.PI / 180);
    // ctx.fillRect(0, midY, width*1.5, height);
    // ctx.restore();

    // ctx.save();
    // ctx.fillStyle = poemFill;

    // title(
    //   ctx,
    //   config.title,
    //   cxStatic + (align === 'center' ? widthMax/2 : 0),
    //   midY - halfBase,
    //   widthMax,
    //   fontSize/2,
    //   align
    // );

    switch(config.layout){
    case 'computer':
        computer(ctx,config,height,width,midX,midY,widthMax,fontSize,poemFill, canvasBgHex);
        break;
    case 'gallery':
        gallery(ctx,config,height,width,midX,midY,widthMax,fontSize,poemFill, canvasBgHex);
        break;
        // config.prose.length > 155 looks off not square
    case 'sidebar':
        sidebar(ctx,config,height,width,midX,midY,widthMax,fontSize,poemFill, canvasBgHex);
        break;
    case 'stacked':
        stacked(ctx,config,height,width,midX,midY,widthMax,fontSize,poemFill, canvasBgHex);
        break;
    case 'novel':
        novel(ctx,config,height,width,midX,midY,widthMax,fontSize,poemFill, canvasBgHex);
        break;
    }

    // if noisy
    if (config.noisy) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        gridWork(ctx, width, height, midX, midY, config.noiseFactor, config, canvasBgHex);
    }
}
// Utilities

// RGA 2 Hex
function rgba2hex(rgba){
    return `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;
}

function containsAny(str, substrings) {
    for (let i = 0; i !== substrings.length; i++) {
        const substring = substrings[i];
        if (str.indexOf(substring) !== - 1) {
            return substring;
        }
    }
    return null;
}