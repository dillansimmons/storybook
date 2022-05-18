import {randColor, gridWork, grow} from './helpers';


export async function drawMood(ctx,config,x,y,width,height,canvasBgHex){
    ctx.rect(x,y,width,height);
    ctx.clip();
    const halfWidth = width/2;
    const halfHeight = height/2;
    switch(config.mood.state){
    // switch('glimering'){
    case 'enormous':
        break;
    case 'blood-soaked':
        config.scheme = Object.values(config.schemes[20])[0];
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = randColor(config,0);
        ctx.rect(x,y,width,height);
        ctx.fill();
        // ctx.globalAlpha = 1;
        // wave(ctx,config,x,y,width,height, 4*config.randomizer[1], 350*config.randomizer[0], randColor(config, 1));
        break;
    case 'sunken':
        for (let i = config.scheme.length; i > 0; --i){
            ctx.globalAlpha = 0.125;
            ctx.beginPath();
            ctx.fillStyle = `#${config.scheme[i]}`;
            ctx.rect(
                x,
                height - height/i,
                width,
                height + height/i
            );
            ctx.fill();
            ctx.closePath();
        }
        break;
    case 'carcass of the':
    case 'decrepit':
        await gridWork(ctx, width, height, x, y, 100, config, undefined, 'lined')
        break;
    case 'twinkling':
    case 'glimering':
    case 'charming':
        await gridWork(ctx, width, height, x, y, 100, config, undefined, 'twinkle')
        break;
    case 'grimy':
    case 'bug infested':
        await gridWork(ctx, width, height, x, y, width/(config.randomizer[1]*300), config, undefined, 'bug infested')
        break;
    case 'overgrown':
        grow(ctx,config,x,y,width,height, 7*config.randomizer[1], 20*config.randomizer[2], height/1.5);
        break;
    case 'corroded':
    case 'ancient':
    case 'battered':
    case 'creepy':
        await gridWork(ctx, width, height, x, y, 100, config, undefined, 'lined')
        break;
    case 'shadow of the':
        ctx.beginPath();
        ctx.fillStyle = `hsla(0,0%,0%,0.125)`;
        ctx.arc(
            halfWidth,
            y,
            width,
            0,
            2 * Math.PI,
            false
        )
        ctx.fill();
        ctx.closePath();            break;
    case 'cluttered':
        await gridWork(ctx, width, height, x, y, width/(config.randomizer[1]*100), config, undefined, 'cluttered')
        break;
    }
}