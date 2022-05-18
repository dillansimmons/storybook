
// Helpers
export function weave(context, from, to, frequency, amplitude, smoothness) {
    // context.fillStyle = `#${scheme[Math.floor(fxrand() * scheme.length)]}`;
    // context.strokeStyle = `#${scheme[Math.floor(fxrand() * scheme.length)]}`;

    let cx = 0; let cy = 0;
    const fx = from.x; const fy = from.y;
    const tx = to.x; const ty = to.y;
    let i = 0; let waveOffsetLength = 0;

    const ang = Math.atan2(ty - fy, tx - fx);
    const distance = Math.sqrt((fx - tx) * (fx - tx) + (fy - ty) * (fy - ty));
    const a = amplitude;
    const f = Math.PI * frequency;

    for (i; i <= distance; i += smoothness) {
        waveOffsetLength = Math.sin((i / distance) * f) * a;
        cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI / 2) * waveOffsetLength;
        cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI / 2) * waveOffsetLength;
        if (i > 0) {
            context.lineTo(cx, cy);
        } else {
            context.moveTo(cx, cy);
        }
    }
}

export async function wave(ctx, config, x, y, width, height, freq, smooth, fill) {
    const r1 = freq ? freq : config.randomizer[0] * 40;
    const r2 = smooth ? smooth : width / (120 * config.randomizer[0]);
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = width / 55;
    ctx.lineWidth = (width / 500) * 0.1;
    for (let i = 1; i < height * 4; i++) {
        fill = fill || randColor(config, i);
        ctx.beginPath();
        // using a single color fill can be interesting
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        weave(ctx,
            {
                x: x - width - width / 800 * i,
                y: y + height + height / 800 * i - config.randomizer[i] * 10
            },
            {
                x: x + width + width / 800 * i,
                y: y - height + height / 800 * i - config.randomizer[i] * 10
            },
            // config.randomizer[i]*20 === patchwork
            r1, r2, 1, fill
        );
        ctx.stroke();
        ctx.closePath();
        // await new Promise(resolve => setTimeout(resolve, 0.25));
    }
}

export async function grow(ctx, config, x, y, width, height, freq, smooth, stopGrow, fill) {
    const r1 = freq ? freq : config.randomizer[0] * 40;
    const r2 = smooth ? smooth : width / (120 * config.randomizer[0]);
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = (width / 60) * 0.1;
    for (let i = 1; i < width/2; i++) {
        fill = fill || randColor(config, i);
        ctx.beginPath();
        // using a single color fill can be interesting
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        weave(ctx,
            {
                x: x + width / 100 * i,
                y: y + (config.randomizer[i] * stopGrow)
            },
            {
                x: x + width / 100 * i,
                y: y + height
            },
            // config.randomizer[i]*20 === patchwork
            r1, r2, 1, fill
        );
        ctx.stroke();
        ctx.closePath();
        const fill2 = randColor(config, i);
        bloomMaker(ctx, x + width / 100 * i, y + (config.randomizer[i] * stopGrow), width / 100 * config.randomizer[i], 'daisy', fill2)
        // await new Promise(resolve => setTimeout(resolve, 0.25));
    }
}

function bloomMaker(ctx, x, y, size, bloom, fill) {
    ctx.beginPath();
    switch (bloom) {
    case 'daisy':
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.ellipse(x, y - size * 2, size, size * 2, Math.PI / 1, 0, 2 * Math.PI);
        ctx.ellipse(x, y + size * 2, size, size * 2, Math.PI / 1, 0, 2 * Math.PI);
        ctx.ellipse(x - size * 2, y, size, size * 2, Math.PI / 2, 0, 2 * Math.PI);
        ctx.ellipse(x + size * 2, y, size, size * 2, Math.PI / 2, 0, 2 * Math.PI);
        ctx.ellipse(x - size * 2, y - size * 2, size, size * 2, Math.PI / 1.5, 0, 2 * Math.PI);
        ctx.ellipse(x + size * 2, y + size * 2, size, size * 2, Math.PI / 1.5, 0, 2 * Math.PI);
        ctx.ellipse(x - size * 2, y + size * 2, size, size * 2, Math.PI / 3.5, 0, 2 * Math.PI);
        ctx.ellipse(x + size * 2, y - size * 2, size, size * 2, Math.PI / 3.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = `white`;
        ctx.arc(
            x,
            y,
            size,
            0,
            2 * Math.PI,
            false
        )
        ctx.fill();
        ctx.closePath();
        break;
    case 'orb':
        ctx.fillStyle = `#bada55`;
        ctx.arc(
            x,
            y,
            size,
            0,
            2 * Math.PI,
            false
        )
        ctx.fill();
        break;
    }
    ctx.closePath();
}

export async function hatch(ctx, config, x, y, width, height, freq, smooth, fill) {
    const r1 = freq ? freq : config.randomizer[0] * 40;
    const r2 = smooth ? smooth : width / (120 * config.randomizer[0]);
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = (width / 500);
    for (let i = 1; i < height * 4; i++) {
        // const fill = `#${config.scheme[0]}`
        fill = randColor(config, i);
        ctx.beginPath();
        // using a single color fill can be interesting
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        weave(ctx,
            {
                x: x + width / 100 * i,
                y
            },
            {
                x: x + width / 100 * i,
                y: y + height
            },
            // config.randomizer[i]*20 === patchwork
            r1, r2, 1, fill
        );
        weave(ctx,
            {
                x,
                y: y + height / 100 * i
            },
            {
                x: x + width,
                y: y + height / 100 * i
            },
            // config.randomizer[i]*20 === patchwork
            r1, r2, 1, fill
        );
        ctx.stroke();
        ctx.closePath();
        // await new Promise(resolve => setTimeout(resolve, 0.25));
    }
}

//TODO: randomize points

// resets new grid for noise in background
export async function gridWork(ctx, width, height, midX, midY, amplifier, config, fill, spec) {
    // the size of the dots based on config
    const base = Math.ceil(width / amplifier);
    // how many dots can go on the x axis
    const columnCount = Math.ceil(width / base);
    // how many dots can go on the y axis
    const rowCount = Math.ceil(height / base);
    // maxes
    // const heightMax = (rowCount * base);
    // const widthMax = (columnCount * base);
    // all the dots
    const allDots = columnCount * rowCount;
    // the x starting point: 1/6 the width
    const cx = midX - base;
    // a static of this cx / used for resets
    const cxStatic = cx;
    // the y starting point: 1/6 the height
    const cy = midY- base;
    // the row count / used for grid draw
    const row = 0;

    await gridMaker(ctx, allDots, base, row, columnCount, cx, cxStatic, cy, config, fill, spec);
}

// lays out noise grid and peg grid
async function gridMaker(ctx, allDots, base, row, columnCount, cx, cxStatic, cy, config, fill, spec) {
    console.log('run');
    let points = [];
    const isLight = fill === '#FFFFFF' || fill === '#F9F4EF';
    const blurArray = [1,2,3,4];

    // for all our available grid fill in our pegs
    for (let i = 0; i < allDots; i++) {

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

        points.push({x: cx, y: cy + row * base, start: i === columnCount * row});
    }

    console.log('rand');
    // randomize points
    for (let h = points.length; h >= 0; h--) {
        const j = Math.floor(config.randomizer[h] * (h + 1));
        [points[h], points[j]] = [points[j], points[h]];
    }
    // remove undefined
    points = points.filter(x => x !== undefined);

    for (let q = 0; q < points.length; q++) {
        // await new Promise(resolve => setTimeout(resolve, 0));
        // console.log(points[q]);

        ctx.beginPath();
        // ctx.shadowBlur = 2;
        // ctx.shadowOffsetX = 2;
        // ctx.shadowOffsetY = 2;
        ctx.fillStyle = fill ? fill : randColor(config, q);
        const xx = points[q].x;
        const yy = points[q].y;

        switch (spec) {
        case 'city':
            ctx.rect(
                xx - base * .75,
                (yy) - base * .75,
                (base * .5),
                (base * .5)
            );
            ctx.fill();
            break;
        case 'ladder':
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, xx, yy);
            ctx.rect(-base/2,+base/4,base/2*.75,base/4);
            ctx.rect(-base/2,-base/2,base/2*.75,base/4);
            ctx.rect(base/4*.5,+base/4,base/2*.75,base/4);
            ctx.rect(base/4*.5,-base/2,base/2*.75,base/4);
            ctx.fill();
            ctx.closePath();
            break;
        case 'anything':
            ctx.globalAlpha = config.randomizer[q];
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, xx, yy);
            ctx.arc(0, base / 2, base / 2, 0, 2 * Math.PI);
            ctx.rect(0, 0, base, base);
            ctx.arc(base, base / 2, base / 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            break;
        case 'twinkle':
            if (config.randomizer2[q] > .9) { continue }
            ctx.globalAlpha = config.randomizer[q];
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, xx, yy);
            ctx.rect(0-(base*2*config.randomizer[q]), 0-base/16, base*4*config.randomizer[q], base/8);
            ctx.rect(0-base/16, 0-(base*2*config.randomizer[q]), base/8, base*4*config.randomizer[q]);
            ctx.fill();
            ctx.closePath();
            break;
        case 'smudge':
            ctx.beginPath();
            ctx.globalAlpha = 0.8;
            ctx.shadowColor = randColor(config, q);
            ctx.shadowBlur = base * blurArray[Math.floor(config.randomizer[q] * blurArray.length)];
            ctx.shadowOffsetY = base*1000 // + (config.randomizer[i] < 0.5 ? base : -base);
            ctx.rect(xx, (yy) - base*1000, base, base);
            ctx.fill();
            ctx.closePath();
            break;
        case 'orbs':
            if (config.randomizer2[q] > 0.5) { continue }
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, xx, yy);
            ctx.arc(base / 9, base / 9, base*config.randomizer[q], 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            break;
        case 'diamond':
            // // abstract : painting quality
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, xx, yy);
            ctx.rotate(90 * Math.PI / 360);
            ctx.rect(0, 0, base, base);
            ctx.fill();
            ctx.closePath();
            break;
        case 'bug infested':
            // Pilled : cluttered???
            ctx.globalAlpha = config.randomizer[q];
            ctx.setTransform(1, 0, 0, 1, xx, yy - ((base / 4) * .75));
            ctx.rotate(45 * Math.PI / 360);
            ctx.arc(0, (base * config.randomizer[q]) / 2, (base * config.randomizer[q]) / 2, 0, 2 * Math.PI);
            ctx.rect(0, 0, (base * config.randomizer[q]), (base * config.randomizer[q]));
            ctx.arc(0 + (base * config.randomizer[q]), (base * config.randomizer[q]) / 2, (base * config.randomizer[q]) / 2, 0, 2 * Math.PI);
            ctx.fill();
            break;
        case 'cluttered':
            // 8 bit: cluttered
            ctx.globalAlpha = 0.1;
            ctx.shadowColor = fill;
            ctx.shadowOffsetX = config.randomizer[2] < 0.5 ? (base / 2) : -(base / 2);
            ctx.shadowOffsetY = config.randomizer[3] < 0.5 ? (base / 2) : -(base / 2);
            ctx.rect(
                xx,
                yy - ((base / 4) * .75),
                config.randomizer[[q]] < 0.5
                    ? base : config.randomizer[[q]] < 0.25
                        ? (base) : base * 1.5,
                config.randomizer[[q]] < 0.5
                    ? base : config.randomizer[q + 1 ? q + 1 : q - 1] < 0.25
                        ? (base) : base * 1.5
            )
            ctx.fill();
            break;
        case 'power-plant':
            // bullets : nice architectural outputs
            ctx.globalAlpha = config.randomizer[q];
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, xx, yy);
            ctx.arc(0, base / 4, base / 4, 0, 2 * Math.PI);
            ctx.rect(0, 0, base / 2, base / 2);
            // ctx.arc(base/2, base/4, base/4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            break;
        case 'dissapear':
            ctx.fillStyle = isLight ? `hsla(0,0%,0%,${0.0000005 * q})` : `hsla(100,100%,100%,${0.0000005 * q})`;
            ctx.rect(
                xx,
                (yy),
                (base),
                (base)
            );

            // color the peg
            if (config.randomizer[q] > 0.5) {
                ctx.fill();
            }
            continue;
        case 'corroded':
            if (config.randomizer[q] > 0.0005 * row) { continue }
            // if (config.randomizer[i] < 0.0005*row) { continue }
            ctx.strokeStyle = fill;
            ctx.lineWidth = base / 5;
            if (config.randomizer2[q] > 0.5) {
                ctx.moveTo(xx, yy);
                ctx.lineTo(xx + ((config.randomizer2[q] > 0.5 ? -1 : 1) * base * 2), yy + ((config.randomizer2[q === 0 ? q : q - 1] > 0.5 ? -1 : 1) * base * 2));
            } else {
                ctx.arc(
                    xx,
                    yy,
                    base / 4,
                    0,
                    2 * Math.PI,
                    false
                )
            }
            ctx.stroke();
            break;
        case 'lined':
            if (config.randomizer[q] > 0.0005 * row) { continue }
            // if (config.randomizer[i] < 0.0005*row) { continue }
            ctx.strokeStyle = fill;
            ctx.lineWidth = base / 5;
            ctx.moveTo(xx, yy);
            if (config.randomizer2[q] > 0.5) {
                ctx.lineTo(xx + base * 8, yy + base * 8);
            }
            ctx.stroke();
            break;
        default:
            ctx.rect(
                xx,
                (yy),
                (base),
                (base)
            );

            // color the peg
            if (config.randomizer[q] > 0.5) {
                ctx.fill();
            }
            break;
        }

        ctx.closePath();
    }
}

export function randColor(config, i) {
    return `#${config.scheme[Math.floor(config.randomizer[i] * config.scheme.length)]}`;
}