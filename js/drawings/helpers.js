
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

export function wave(ctx, config, x, y, width, height, freq, smooth, fill) {
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
    }
}

export function grow(ctx, config, x, y, width, height, freq, smooth, stopGrow, fill) {
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

export function hatch(ctx, config, x, y, width, height, freq, smooth, fill) {
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
    }
}

// resets new grid for noise in background
export function gridWork(ctx, width, height, midX, midY, amplifier, config, fill, spec) {
    // the size of the dots based on config
    const base = Math.floor(width / amplifier);
    // how many dots can go on the x axis
    const columnCount = Math.floor(width);
    // how many dots can go on the y axis
    const rowCount = Math.floor(height);
    // maxes
    const heightMax = (rowCount * base);
    const widthMax = (columnCount * base);
    // all the dots
    const allDots = columnCount * rowCount;
    // the x starting point: 1/6 the width
    const cx = Math.ceil(midX - widthMax / 2);
    // a static of this cx / used for resets
    const cxStatic = cx;
    // the y starting point: 1/6 the height
    const cy = Math.ceil(midY - heightMax / 2);
    // the row count / used for grid draw
    const row = 0;

    gridMaker(ctx, allDots, base, row, columnCount, cx, cxStatic, cy, config, fill, spec);
}

// lays out noise grid and peg grid
function gridMaker(ctx, allDots, base, row, columnCount, cx, cxStatic, cy, config, fill, spec) {
    const isLight = fill === '#FFFFFF' || fill === '#F9F4EF';
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

        ctx.beginPath();
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle = fill ? fill : randColor(config, i);

        switch (spec) {
        case 'city':
            ctx.rect(
                cx - base * .75,
                (cy + row * base) - base * .75,
                (base * .5),
                (base * .5)
            );
            ctx.fill();
            break;
        case 'ladder':
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, cx, cy + row * base);
            ctx.rect(-base/2,+base/4,base/2*.75,base/4);
            ctx.rect(-base/2,-base/2,base/2*.75,base/4);
            ctx.rect(base/4*.5,+base/4,base/2*.75,base/4);
            ctx.rect(base/4*.5,-base/2,base/2*.75,base/4);
            ctx.fill();
            ctx.closePath();
            break;
        case 'anything':
            // // abstract : painting quality
            ctx.globalAlpha = config.randomizer[i];
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, cx, cy + row * base);
            ctx.arc(0, base / 2, base / 2, 0, 2 * Math.PI);
            ctx.rect(0, 0, base, base);
            ctx.arc(base, base / 2, base / 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            break;
        case 'froth':
            // // abstract : painting quality
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, cx, cy + row * base);
            ctx.arc(base / 2, base / 2, base*2*config.randomizer[i], 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            break;
        case 'diamond':
            // // abstract : painting quality
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, cx, cy + row * base);
            ctx.rotate(90 * Math.PI / 360);
            ctx.rect(0, 0, base, base);
            ctx.fill();
            ctx.closePath();
            break;
        case 'bug infested':
            // Pilled : cluttered???
            ctx.globalAlpha = config.randomizer[i];
            ctx.setTransform(1, 0, 0, 1, cx, cy + row * base - ((base / 4) * .75));
            ctx.rotate(45 * Math.PI / 360);
            ctx.arc(0, (base * config.randomizer[i]) / 2, (base * config.randomizer[i]) / 2, 0, 2 * Math.PI);
            ctx.rect(0, 0, (base * config.randomizer[i]), (base * config.randomizer[i]));
            ctx.arc(0 + (base * config.randomizer[i]), (base * config.randomizer[i]) / 2, (base * config.randomizer[i]) / 2, 0, 2 * Math.PI);
            ctx.fill();
            break;
        case 'cluttered':
            // 8 bit: cluttered
            ctx.globalAlpha = 0.1;
            ctx.shadowColor = fill;
            ctx.shadowOffsetX = config.randomizer[2] < 0.5 ? (base / 2) : -(base / 2);
            ctx.shadowOffsetY = config.randomizer[3] < 0.5 ? (base / 2) : -(base / 2);
            ctx.rect(
                cx,
                cy + row * base - ((base / 4) * .75),
                config.randomizer[[i]] < 0.5
                    ? base : config.randomizer[[i]] < 0.25
                        ? (base) : base * 1.5,
                config.randomizer[[i]] < 0.5
                    ? base : config.randomizer[i + 1 ? i + 1 : i - 1] < 0.25
                        ? (base) : base * 1.5
            )
            ctx.fill();
            break;
        case 'power-plant':
            // bullets : nice architectural outputs
            ctx.globalAlpha = config.randomizer[i];
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, cx, cy + row * base);
            ctx.arc(0, base / 4, base / 4, 0, 2 * Math.PI);
            ctx.rect(0, 0, base / 2, base / 2);
            // ctx.arc(base/2, base/4, base/4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            break;
        case 'dissapear':
            ctx.fillStyle = isLight ? `hsla(0,0%,0%,${0.0000005 * i})` : `hsla(100,100%,100%,${0.0000005 * i})`;
            ctx.rect(
                cx,
                (cy + row * base),
                (base),
                (base)
            );

            // color the peg
            if (config.randomizer[i] > 0.5) {
                ctx.fill();
            }
            continue;
        case 'corroded':
            if (config.randomizer[i] > 0.0005 * row) { continue }
            // if (config.randomizer[i] < 0.0005*row) { continue }
            ctx.strokeStyle = fill;
            ctx.lineWidth = base / 5;
            if (config.randomizer2[i] > 0.5) {
                ctx.moveTo(cx, cy + row * base);
                ctx.lineTo(cx + ((config.randomizer2[i] > 0.5 ? -1 : 1) * base * 2), cy + row * base + ((config.randomizer2[i === 0 ? i : i - 1] > 0.5 ? -1 : 1) * base * 2));
            } else {
                ctx.arc(
                    cx,
                    cy + row * base,
                    base / 4,
                    0,
                    2 * Math.PI,
                    false
                )
            }
            ctx.stroke();
            break;
        case 'lined':
            if (config.randomizer[i] > 0.0005 * row) { continue }
            // if (config.randomizer[i] < 0.0005*row) { continue }
            ctx.strokeStyle = fill;
            ctx.lineWidth = base / 5;
            ctx.moveTo(cx, cy + row * base);
            if (config.randomizer2[i] > 0.5) {
                ctx.lineTo(cx + base * 8, cy + row * base + base * 8);
            }
            ctx.stroke();
            break;
        default:
            ctx.rect(
                cx,
                (cy + row * base),
                (base),
                (base)
            );

            // color the peg
            if (config.randomizer[i] > 0.5) {
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