import { randColor, gridWork } from "./helpers";

export function drawChallenge(ctx, config, x, y, width, height) {
    switch(config.mood.challenge) {
    // switch ('monster') {
    case 'challenge':
    case 'puzzle':
    case 'labrynth':
    case 'chessgame':
        gridWork(ctx, width, height, x - width/2, y - width/2, width / (config.randomizer[0] * 900), config, undefined, 'diamond')
        break;
    case 'sadness':
    case 'heartbreak':
        //blue
        break;
    case 'contest':
    case 'skirmish':
    case 'head-to-head':
    case 'fight':
    case 'battle':
    case 'dogfight':
    case 'deathmatch':
    case 'struggle':
        destroy(ctx, x, y, width, height, config);
        break;
        // Anything goes
    case 'monster':
        ctx.beginPath();
        ctx.arc(x+width/2, y+height/1.5, width/2, 0, 2*Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x+width/2, y+height/2, width/10, 0, 2*Math.PI);
        ctx.fillStyle = randColor(config, 3)
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.ellipse(x + width/2, y + height/2, width/20, width/15, 0, 0, 2 * Math.PI);
        ctx.fillStyle = randColor(config, 1)
        ctx.fill();
        ctx.closePath();


        ctx.beginPath();
        ctx.arc(x+width/2, y+height/3, width/2, 0, 2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        break;
    case 'test':
    case 'conspiracy':
    case 'trial':
    case 'chase':
    case 'caper':
        // 3 circles forming eye
        break;
    }
}

function destroy(ctx, x, y, width, height, config) {
    const scale = width > height ? height : width;
    const spacer = scale/50;
    const spacerWide = scale / 6;
    ctx.fillStyle = randColor(config, 0);
    // reset position
    ctx.setTransform(1, 0, 0, 1, x, y);

    const quarterCircle = (start, top, left, random1, random2, random3) => {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.rotate(5 * random1 * Math.PI / 360);
        ctx.arc(
            width / 2 - spacer,
            height / 2 - spacer,
            scale / 4,
            start * Math.PI,
            (start + .5 - (random2 / 8)) * Math.PI,
            false
        )
        ctx.lineTo(width / 2 + (left ? -spacer : +spacer), height / 2 + (top ? -(spacer+random3) : +(spacer+random3)));
        ctx.fill();
        ctx.restore();
    }

    ctx.beginPath();
    quarterCircle(1, true, true, config.randomizer[1], config.randomizer[2], config.randomizer[3])
    ctx.closePath();

    ctx.beginPath();
    quarterCircle(0, false, true, config.randomizer[4], config.randomizer[5], config.randomizer[6])
    ctx.closePath();

    ctx.beginPath();
    quarterCircle(.5, false, false, config.randomizer[7], config.randomizer[8], config.randomizer[9])
    ctx.closePath();


    // strike
    ctx.beginPath();
    ctx.globalAlpha = 0.125;
    ctx.lineWidth = scale / 50;
    // ctx.setLineDash([spacer, spacerWide/2, spacerWide, spacer]);
    ctx.moveTo(spacerWide, height - spacerWide);
    ctx.lineTo(width - spacerWide, spacerWide);
    ctx.stroke();
    ctx.closePath();

    // top right
    ctx.beginPath();
    quarterCircle(1.5, true, false, config.randomizer[10], config.randomizer[11], config.randomizer[12])
    ctx.closePath();

    // bullet
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.arc(
        width - spacerWide,
        spacerWide,
        scale / 25,
        0,
        2 * Math.PI,
        false
    )
    ctx.fill();
    ctx.closePath();

    // full
    ctx.beginPath();
    ctx.lineWidth = scale / 100;
    ctx.arc(
        width / 2 - config.randomizer[13] * scale / 100,
        height / 2 + config.randomizer[14] * scale / 100,
        scale / 5,
        0,
        2 * Math.PI,
        false
    )
    ctx.stroke();
    ctx.closePath();
}