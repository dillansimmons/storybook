import { wave, randColor, gridWork, hatch, grow, weave } from './helpers';

export function drawPlace(ctx, config, x, y, width, height, fontSize, canvasBgHex) {
    // place
    // 22 places (Abstraction is key)
    ctx.save();

    // TEST
    // ctx.fillStyle = canvasBgHex;
    // ctx.rect(x, y, width, height);
    // ctx.fill();

    const halfWidth = width/2;
    const halfHeight = height/2;


    ctx.beginPath();
    // switch('dungeon') {
    switch (config.mood.place) {
    // circle
    case 'acid vat':
    case 'manhole opening':
        wave(ctx, config, x, y, width, height, 6 * config.randomizer[1], 200 * config.randomizer[0], randColor(config, 1));
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = randColor(config, config.scheme.length - 1);
        ctx.ellipse(x + halfWidth, y + height / 2 - height / 48, width / 3, height / 16, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        if (config.mood.place === 'acid vat') {
            ctx.save();
            ctx.beginPath();
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = randColor(config, config.scheme.length - 1);
            ctx.rect(x + halfWidth - width / 3, y + halfHeight, width / 1.5, height);
            // ctx.moveTo(x+width/2-width/3, y+height/2);
            // ctx.lineTo(x+width/2, y+height/1.5);
            // ctx.lineTo(x+width/2+width/3, y+height/2);
            // ctx.ellipse(x+width/2, y+height/2-height/48, width/3, height/16, 0, 0, 2 * Math.PI);
            // ctx.fill();
            ctx.clip();
            wave(ctx, config, x, y, width, height, 1, 25, randColor(config, 0));
            ctx.closePath();
            ctx.restore();
        }

        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = canvasBgHex;
        ctx.ellipse(x + halfWidth, y + halfHeight, width / 3, height / 16, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        break;
    case 'power-plant':
        gridWork(ctx, width, height, x - halfWidth, y - halfWidth, width / (config.randomizer[1] * 100), config, `#${config.scheme[Math.floor(config.randomizer[0] * config.scheme.length)]}`, 'power-plant')
        break;
    case 'dungeon':
        ctx.beginPath();
        ctx.rect(x, y + height / (config.randomizer[0] * 12), width, height);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = canvasBgHex;
        for (let i = width / 10; i > 0; --i) {
            ctx.beginPath();
            ctx.arc(
                (x - width / 8 + width / 8 * i),
                y + height / (config.randomizer[0] * 12),
                width / 20,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
            ctx.closePath();
        }

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = canvasBgHex;
        ctx.arc(
            x + width / 1.5,
            y + height / (config.randomizer[0] * 12) + height/4,
            width / (4 * 3) + 4,
            0,
            2 * Math.PI,
            false
        );
        ctx.rect(
            x + width / 1.5 - (width / (4 * 1.5)) / 2 - 4,
            y + height / (config.randomizer[0] * 12) + height/4,
            width / (4 * 1.5) + 8,
            height-height / (config.randomizer[0] * 12) + height/4
        )
        ctx.arc(
            x + width - width / 1.5,
            y + height / (config.randomizer[0] * 12) + height/4,
            width / (4 * 3) + 4,
            0,
            2 * Math.PI,
            false
        );
        ctx.rect(
            x + width - width / 1.5 - (width / (4 * 1.5)) / 2 - 4,
            y + height / (config.randomizer[0] * 12) + height/4,
            width / (4 * 1.5) + 8,
            height-height / (config.randomizer[0] * 12) + height/4
        )
        ctx.fill();
        ctx.clip();
        hatch(ctx, config, x, y, width, height, 200, 1, `#${config.scheme[config.scheme.length - 1]}`);
        ctx.closePath();
        ctx.restore();
        break;
    case 'battleship': // TBD: refine
        break;
    case 'hanger':
        break;
    case 'pagoda':
        ctx.fillStyle = `#${config.scheme[config.scheme.length - 1]}`;

        ctx.beginPath();
        ctx.moveTo(x + halfWidth-width/5*config.randomizer[1], y + height/10*config.randomizer[2]);
        ctx.lineTo(x + (width/2.5*config.randomizer[2]), y + height - (height / 5 * config.randomizer[1]));
        ctx.lineTo(x + width - (width/2.5*config.randomizer[2]), y + height - (height / 5 * config.randomizer[1]));
        ctx.lineTo(x + halfWidth+width/5*config.randomizer[1], y + height/10*config.randomizer[2]);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(x+halfWidth-(width*config.randomizer[3])/4,y+height - height / 3, (width*config.randomizer[3])/2, (width*config.randomizer[3])/3);
        ctx.fill();
        ctx.closePath();

        for (let i = 5; i > 0; i--) {
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, 1, 0, y+(height/5*i));
            ctx.ellipse(
                x+halfWidth,
                0,
                width/(15*config.randomizer[3])*i,
                width/(15*config.randomizer[4])*i,
                0,
                0 * Math.PI,
                1 * Math.PI,
                false
            );
            ctx.fill();
            ctx.closePath();
        }
        break;
    case 'spacecraft':
        gridWork(ctx, width, height, x - halfWidth, y - halfWidth, width / (config.randomizer[0] * 25), config, undefined, 'diamond')
        break;
    case 'landing-pad':
        ctx.beginPath();
        ctx.fillStyle = randColor(config, 1);
        ctx.rect(x, height - (height / 8), width, height);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = randColor(config, 2);
        ctx.rect(x + halfWidth, height - (height / 8), halfWidth, height);
        ctx.fill();
        ctx.closePath();

        [width/4, width- width/4].forEach(num => {
            ctx.beginPath();
            ctx.fillStyle = canvasBgHex;
            ctx.arc(
                x + num,
                y + height / 1.25,
                width / (4 * 3) + (4),
                0,
                2 * Math.PI,
                false
            );
            ctx.rect(
                x + num - (width / (4 * 1.5)) / 2 - (4),
                y + height / 1.25,
                width / (4 * 1.5) + (8),
                height / 2 + (8)
            )
            ctx.fill();
            ctx.closePath();
        })

        ctx.beginPath();
        ctx.fillStyle = randColor(config, 0);
        ctx.moveTo(x + halfWidth, height - (height / 8) + height / 8);
        ctx.lineTo(x + halfWidth - (width / 2), height - (height / 8));
        ctx.lineTo(x + halfWidth, height - (height / 8) - height / 8);
        ctx.lineTo(x + halfWidth + (width / 2), height - (height / 8));
        ctx.lineTo(x + halfWidth, height - (height / 8) + height / 8);
        ctx.fill();
        ctx.closePath();
        break;
    case 'castle':
    case 'fortress':
        ctx.beginPath();
        hatch(ctx, config, x, y, width, height, 1, 1, `#${config.scheme[config.scheme.length - 1]}`);
        ctx.closePath();

        ctx.globalAlpha = 1;
        ctx.fillStyle = canvasBgHex;

        ctx.beginPath();
        ctx.rect(
            x,
            y,
            width,
            height / 100
        );
        ctx.fill();
        ctx.closePath();

        [width/6, width - width/6].forEach(num => {
            ctx.beginPath();
            ctx.moveTo(x, y + height / (4 * config.randomizer[0]));
            ctx.lineTo(x, y + height * 1.5);
            ctx.lineTo(x + num, y + height / (4 * config.randomizer[0]));
            ctx.fill();
            ctx.closePath();
        });

        [width/7.5, halfWidth, width-width/7.5].forEach(num => {
            ctx.beginPath();
            ctx.arc(
                x + num,
                y,
                width / 10,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
            ctx.closePath();
        })

        break;
    case 'water tower':
        ctx.beginPath();
        ctx.moveTo(x + halfWidth - height / (config.randomizer[0] * 5), y + height + height / (config.randomizer[0] * 10));
        ctx.lineTo(x + halfWidth, y - height);
        ctx.lineTo(x + halfWidth + height / (config.randomizer[0] * 5), y + height + height / (config.randomizer[0] * 10));
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(
            x + halfWidth,
            y + height / (config.randomizer[0] * 5),
            height / (config.randomizer[0] * 4),
            0,
            2 * Math.PI,
            false
        );
        ctx.fill();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = canvasBgHex;
        ctx.arc(
            x + halfWidth,
            y + height / (config.randomizer[0] * 5),
            height / (config.randomizer[0] * 5),
            0,
            2 * Math.PI,
            false
        );
        ctx.fill();
        ctx.clip();
        wave(ctx, config, x, y, width, height, config.randomizer[0] * 10, config.randomizer[1] * 20);
        ctx.closePath();
        ctx.restore();
        break;
        // underground / doors
    case 'hideout':
        ctx.fillStyle = randColor(config, 0);

        ctx.beginPath();
        ctx.rect(x + halfWidth - width / 4, y + height / 2 - height / 4, halfWidth, height / 2);
        ctx.fill();
        ctx.closePath();

        break;
    case 'fruit cellar':
        for (let i = config.scheme.length; i > 0; --i) {
            ctx.beginPath();
            ctx.fillStyle = `#${config.scheme[i]}`
            ctx.arc(
                x + halfWidth,
                y + height / 2 - (i * 4),
                width / (4 * 3) + (i * 4),
                0,
                2 * Math.PI,
                false
            );
            ctx.rect(
                x + halfWidth - (width / (4 * 1.5)) / 2 - (i * 4),
                y + height / 2 - (i * 4),
                width / (4 * 1.5) + (i * 8),
                height / 2 + (i * 8)
            )
            ctx.fill();
            ctx.closePath();
        }
        break;
        // anything goes (abstract)
    case 'memory':
    case 'dreamscape':
    case 'garden':
        grow(ctx, config, x, y, width, height, 7 * config.randomizer[0], 20 * config.randomizer[1], height / 1.5);
        wave(ctx, config, x - halfWidth, y - halfHeight, width, height, 1, 1);
        break;
        // city
    case 'city':
        gridWork(ctx, width, height, x - halfWidth, y - halfWidth, width / (config.randomizer[1] * 100), config, `#${config.scheme[Math.floor(config.randomizer[0] * config.scheme.length)]}`, 'city')
        hatch(ctx, config, x - halfWidth, y - halfHeight, width, height, 1, 1);
        break;
        // orderly interiors
    case 'labratory':
        ctx.beginPath();
        ctx.arc(
            x + halfWidth,
            y + halfHeight,
            width / 2.5,
            0,
            2 * Math.PI,
            false
        );
        ctx.clip();
        hatch(ctx, config, x, y, width, height, 1, 1);
        ctx.closePath();
        break;
    case 'library':
        gridWork(ctx, width, height, x - halfWidth, y - halfWidth, width / (config.randomizer[0] * 25), config, undefined, 'ladder');
        break;
        // water
    case 'ocean':
        wave(ctx, config, x, y + halfHeight, width, height, config.randomizer[0] * 20, config.randomizer[1] * 80);
        break;
    case 'river':
        // TBD not happy with lines
        hatch(ctx, config, x, y, width, height, 6, 18);
        wave(ctx, config, x, y, width, height, 6, 66);
        break;
        // hatches
    case 'patchwork farm':
        hatch(ctx, config, x, y, width, height, 2, 1);
        break;
        // gate / opening
    case 'portal':
        for (let i = config.scheme.length; i > 0; --i){
            ctx.beginPath();
            ctx.fillStyle = `#${config.scheme[i]}`
            ctx.arc(
                x + width/2,
                y+height/2-(i*4),
                width/(4*3)+(i*4),
                0,
                2 * Math.PI,
                false
            );
            ctx.rect(
                x + width/2-(width/(4*1.5))/2-(i*4),
                y+height/2-(i*4),
                width/(4*1.5)+(i*8),
                height/2+(i*8)
            )
            ctx.fill();
            ctx.closePath();
        }
        // ctx.globalAlpha = 0.1;
        // for (let i = 0; i < 10; i++) {
        //     ctx.beginPath();
        //     ctx.fillStyle = `#${config.scheme[config.scheme.length - 1]}`;
        //     ctx.moveTo(x + halfWidth, y + height / 10);
        //     ctx.lineTo(x + (width / 5 * i), y + height);
        //     ctx.lineTo(x + width - (width / 5 * i), y + height);
        //     ctx.lineTo(x + halfWidth, y + height / 10);
        //     ctx.fill();
        //     ctx.closePath();

        //     ctx.beginPath();
        //     ctx.fillStyle = `#${config.scheme[config.scheme.length - 1]}`;
        //     ctx.moveTo(x + halfWidth, y + height / 10);
        //     ctx.lineTo(x + (width / 5 * i), y - height);
        //     ctx.lineTo(x + width - (width / 5 * i), y - height);
        //     ctx.lineTo(x + halfWidth, y + height / 10);
        //     ctx.fill();
        //     ctx.closePath();
        // }
        break;
    default:
        gridWork(ctx, width, height, x - halfWidth, y - halfWidth, width / (config.randomizer[0] * 300), config, undefined, 'anything')
        break;
    }
    ctx.closePath();
    ctx.restore();
}