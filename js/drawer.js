// import { randomizer } from "./main";

import { randomizer } from "./main";

export function draw(ctx,config,x,y,width,height,fontSize,poemFill,canvasBgHex,layout){
  // place
  // 22 places (Abstraction is key)
  ctx.save();

    // fill
    ctx.fillStyle = canvasBgHex;
    ctx.rect(0,0,width,height);
    ctx.fill();


    ctx.beginPath();
    // switch('river') {
    switch(config.mood.place) {
        // circles
        case 'anything':
            // console.log('a');
            gridWork(ctx, width, height, x-width/2, y-width/2, width/(config.randomizer[1]*300), config, undefined, 'anything')
            break;
        case 'acid vat':
        case 'manhole opening':
            wave(ctx,config,x,y,width,height, 6*config.randomizer[1], 200*config.randomizer[0], randColor(config, 1));
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = randColor(config, config.scheme.length-1);
            ctx.ellipse(x+width/2, y+height/2-height/48, width/3, height/16, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.restore();

            if (config.mood.place === 'acid vat') {
                ctx.save();
                ctx.beginPath();
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = randColor(config, config.scheme.length-1);
                ctx.rect(x+width/2-width/3, y+height/2, width/1.5, height);
                // ctx.moveTo(x+width/2-width/3, y+height/2);
                // ctx.lineTo(x+width/2, y+height/1.5);
                // ctx.lineTo(x+width/2+width/3, y+height/2);
                // ctx.ellipse(x+width/2, y+height/2-height/48, width/3, height/16, 0, 0, 2 * Math.PI);
                // ctx.fill();
                ctx.clip();
                wave(ctx,config,x,y,width,height, 1, 25, randColor(config, 0));
                ctx.closePath();
                ctx.restore();
            }

            ctx.beginPath();
                ctx.globalAlpha = 1;
                ctx.fillStyle = canvasBgHex;
                ctx.ellipse(x+width/2, y+height/2, width/3, height/16, 0, 0, 2 * Math.PI);
                ctx.fill();
            ctx.closePath();
            break;
        case 'power-plant':
            gridWork(ctx, width, height, x-width/2, y-width/2, width/(config.randomizer[1]*100), config, `#${config.scheme[Math.floor(config.randomizer[0] * config.scheme.length)]}`, 'power-plant')
            break;
        case 'fortress':
            break;
        case 'dungeon':
            ctx.beginPath();
            ctx.rect(x,y+height/(config.randomizer[0]*12),width,height);
            ctx.fill();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = canvasBgHex;
            ctx.arc(
                x + width/1.5,
                y+height/2-4,
                width/(4*3)+4,
                0,
                2 * Math.PI,
                false
            );
            ctx.rect(
                x + width/1.5-(width/(4*1.5))/2-4,
                y+height/2-4,
                width/(4*1.5)+8,
                height/2+8
            )
            ctx.arc(
                x + width - width/1.5,
                y+height/2-4,
                width/(4*3)+4,
                0,
                2 * Math.PI,
                false
            );
            ctx.rect(
                x + width - width/1.5-(width/(4*1.5))/2-4,
                y+height/2-4,
                width/(4*1.5)+8,
                height/2+8
            )
            ctx.fill();
            ctx.clip();
            hatch(ctx,config,x,y,width,height, 200, 1, `#${config.scheme[config.scheme.length - 1]}`);
            ctx.closePath();
            ctx.restore();

            ctx.fillStyle = canvasBgHex;
            for (let i = width/10; i > 0; --i){
                ctx.beginPath();
                ctx.arc(
                    (x - width/2.5 + width/2.5 * i),
                    y+height/(config.randomizer[0]*12),
                    width/10,
                    0,
                    2 * Math.PI,
                    false
                );
                ctx.fill();
                ctx.closePath();
            }
            break;
        // blocky buildings
        case 'battleship':
            ctx.beginPath();
            ctx.rect(x,y+height/3,width,height);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = `#${config.scheme[config.scheme.length - 1]}`
            ctx.arc(
                x+width/2,
                y+height/2,
                width/(config.randomizer[0]*8),
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
            ctx.closePath();

            ctx.globalAlpha = 1;
            ctx.fillStyle = canvasBgHex;
            ctx.beginPath();
                ctx.moveTo(x, y+height/2+height/(4*config.randomizer[1]));
                ctx.lineTo(x, y-height*1.5);
                ctx.lineTo(x+width/6, y+height/2+height/(4*config.randomizer[1]));
                ctx.fill();
            ctx.closePath();

            ctx.beginPath();
                ctx.moveTo(x+width, y+height/2+height/(4*config.randomizer[0]));
                ctx.lineTo(x+width, y-height*1.5);
                ctx.lineTo(x+width-width/6, y+height/2+height/(4*config.randomizer[0]));
                ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(
                x+width/2,
                y+height/2,
                width/10,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
            ctx.closePath();

            ctx.save();
            ctx.beginPath();
            ctx.rect(x,y+height/2,width,height/2);
            ctx.clip();
            wave(ctx, config, x, y+height/2, width, height, config.randomizer[0]*20, config.randomizer[1]*80);
            ctx.closePath();
            ctx.restore();

            // ctx.beginPath();
            //     ctx.rect(
            //         x,
            //         y,
            //         width,
            //         height/100
            //     );
            //     ctx.fill();
            // ctx.closePath();
            break;
        case 'hanger':
            ctx.beginPath();
                ctx.ellipse(x+width/2, y+height+height/(100*config.randomizer[0]), width/2, height, 0, 0, 2 * Math.PI);
                ctx.fill();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.beginPath();
                ctx.fillStyle = canvasBgHex;
                ctx.arc(
                    x+width/2,
                    y+height,
                    width/3,
                    0,
                    2 * Math.PI,
                    false
                );
                ctx.fill();
            ctx.closePath();
            gridWork(ctx, width, height, x+width/2, y+height/2, width/(config.randomizer[1]*4), config, canvasBgHex, 'dissapear');
            break;
        case 'castle':
        case 'pagoda':
        case 'spacecraft':
        case 'landing-pad':
            ctx.beginPath();
            hatch(ctx,config,x,y,width,height, 1, 1, `#${config.scheme[config.scheme.length - 1]}`);
            ctx.closePath();

            ctx.globalAlpha = 1;
            ctx.fillStyle = canvasBgHex;

            // if (config.mood.place === 'castle') {
                ctx.beginPath();
                    ctx.moveTo(x, y+height/(4*config.randomizer[0]));
                    ctx.lineTo(x, y+height*1.5);
                    ctx.lineTo(x+width/6, y+height/(4*config.randomizer[0]));
                    ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                    ctx.moveTo(x+width, y+height/(4*config.randomizer[0]));
                    ctx.lineTo(x+width, y+height*1.5);
                    ctx.lineTo(x+width-width/6, y+height/(4*config.randomizer[0]));
                    ctx.fill();
                ctx.closePath();
            // }

            ctx.beginPath();
                ctx.rect(
                    x,
                    y,
                    width,
                    height/100
                );
                ctx.fill();
            ctx.closePath();

            ctx.beginPath();
                ctx.arc(
                    x+width/7.5,
                    y,
                    width/10,
                    0,
                    2 * Math.PI,
                    false
                );
                ctx.fill();
            ctx.closePath();
            ctx.beginPath();
                ctx.arc(
                    x+width/2,
                    y,
                    width/10,
                    0,
                    2 * Math.PI,
                    false
                );
                ctx.fill();
            ctx.closePath();
            ctx.beginPath();
                ctx.arc(
                    x+width-width/7.5,
                    y,
                    width/10,
                    0,
                    2 * Math.PI,
                    false
                );
                ctx.fill();
            ctx.closePath();
            break;
        case 'water tower':
            ctx.beginPath();
            ctx.moveTo(x+width/2 - height/(config.randomizer[0]*5), y+height+height/(config.randomizer[0]*10));
            ctx.lineTo(x+width/2, y-height);
            ctx.lineTo(x+width/2+height/(config.randomizer[0]*5), y+height+height/(config.randomizer[0]*10));
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(
                x+width/2,
                y+height/(config.randomizer[0]*5),
                height/(config.randomizer[0]*4),
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
                x+width/2,
                y+height/(config.randomizer[0]*5),
                height/(config.randomizer[0]*5),
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();
            ctx.clip();
            wave(ctx, config, x, y, width, height, config.randomizer[0]*10, config.randomizer[1]*20);
            ctx.closePath();
            ctx.restore();
            break;
        // underground / doors
        case 'fruit cellar':
        case 'hideout':
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
                break;
        // anything goes (abstract)
        case 'memory':
        case 'dreamscape':
            grow(ctx,config,x,y,width,height, 7*config.randomizer[0], 20*config.randomizer[1], height/1.5);
            wave(ctx, config, x-width/2, y-height/2, width, height, 1, 1);
            break;
        // city
        case 'city':
            gridWork(ctx, width, height, x-width/2, y-width/2, width/(config.randomizer[1]*100), config, `#${config.scheme[Math.floor(config.randomizer[0] * config.scheme.length)]}`, 'city')
            hatch(ctx, config, x-width/2, y-height/2, width, height, 1, 1);
            break;
        // orderly interiors
        case 'labratory':
        case 'library':

            ctx.beginPath();
            ctx.arc(
                x + width/2,
                y+height/2,
                width/2.5,
                0,
                2 * Math.PI,
                false
            );
            ctx.clip();
            hatch(ctx, config, x, y, width, height, 1, 1);
            ctx.closePath();
            break;
        // water
        case 'ocean':
            wave(ctx, config, x, y+height/2, width, height, config.randomizer[0]*20, config.randomizer[1]*80);
            break;
        case 'river':
            // TBD not happy with lines
            hatch(ctx,config,x,y,width,height, 6, 18);
            ctx.save();
                ctx.beginPath();
                ctx.lineWidth = width/3;
                ctx.strokeStyle = canvasBgHex;
                weave(
                    ctx,
                    {x:x+width/2, y:y-height/2},
                    {x:x+width/2, y:y+height+height/2},
                    config.randomizer[1]*5,
                    width/(4*config.randomizer[0]),
                    1
                );
                ctx.stroke();
                ctx.closePath();
            ctx.restore();
            wave(ctx,config,x,y,width,height, 6, 66);
            break;
        // hatches
        case 'patchwork farm':
            hatch(ctx, config, x+width/2, y, width/2, height/2, 2, 1);
            hatch(ctx, config, x, y, width/2, height/2, 2, 1);
            // hatch(ctx, config, x+width/2, y+height/2, width/2, height/2, 2, 1);
            // hatch(ctx, config, x, y+height/2, width/2, height/2, 2, 1);
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
            break;
      }
    ctx.closePath();
  ctx.restore();
  drawMood(ctx,config,x,y,width,height,canvasBgHex);
}

export function drawMood(ctx,config,x,y,width,height,canvasBgHex){
    switch(config.mood.state){
    // switch('blood-soaked'){
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
            gridWork(ctx, width, height, x-width/2, y-width/2, width/(config.randomizer[1]*300), config, canvasBgHex)
            break;
        case 'twinkling':
        case 'glimering':
        case 'charming':
            break;
        case 'grimy':
        case 'bug infested':
            break;
        case 'overgrown':
            grow(ctx,config,x,y,width,height, 7*config.randomizer[1], 20*config.randomizer[2], height/1.5);
            break;
        case 'corroded':
        case 'ancient':
        case 'battered':
        case 'creepy':
            // maybe use the hatch here
            break;
        case 'shadow of the':
            ctx.beginPath();
                ctx.fillStyle = `hsla(0,0,0,0.25)`;
                ctx.arc(
                    width/2,
                    y,
                    width,
                    0,
                    2 * Math.PI,
                    false
                )
                ctx.fill();
            ctx.closePath();            break;
        case 'cluttered':
            gridWork(ctx, width, height, x-width/2, y-width/2, width/(config.randomizer[1]*300), config, undefined, 'cluttered')
            break;
    }
}

export function drawChallenge(ctx,config,x,y,width,height){
    switch(config.mood.challenge){
        case 'challenge':
        case 'puzzle':
        case 'labrynth':
        case 'chessgame':
            break;
        case 'sadness':
        case 'heartbreak':
            break;
        case 'contest':
        case 'skirmish':
        case 'head-to-head':
        case 'fight':
        case 'battle':
        case 'dogfight':
        case 'deathmatch':
        case 'struggle':
            break;
        // Anything goes
        case 'monster':
            break;
        case 'test':
        case 'conspiracy':
        case 'trial':
        case 'chase':
        case 'caper':
            break;
    }
}

// Helpers
function weave(context, from, to, frequency, amplitude, smoothness) {
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
		cx = from.x + Math.cos(ang) * i + Math.cos(ang - Math.PI/2) * waveOffsetLength;
		cy = from.y + Math.sin(ang) * i + Math.sin(ang - Math.PI/2) * waveOffsetLength;
        if (i > 0) {
            context.lineTo(cx, cy);
        } else {
            context.moveTo(cx, cy);
        }
	}
}

function wave(ctx,config,x,y,width,height,freq,smooth, fill) {
    const r1 = freq ? freq : config.randomizer[0]*40;
    const r2 = smooth ? smooth : width/(120*config.randomizer[0]);
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = width/55;
    ctx.lineWidth = (width/500)*0.1;
    for (let i = 1; i < height*4; i++) {
        fill = fill || randColor(config, i);
        ctx.beginPath();
        // using a single color fill can be interesting
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        weave(ctx,
                {x:x - width - width/800*i,
                y:y+height+height/800*i-config.randomizer[i]*10},
                {x:x + width + width/800*i,
                y:y-height+height/800*i-config.randomizer[i]*10},
                // config.randomizer[i]*20 === patchwork
                r1, r2, 1, fill
        );
        ctx.stroke();
        ctx.closePath();
    }
}

function grow(ctx,config,x,y,width,height,freq,smooth,stopGrow,fill) {
    const r1 = freq ? freq : config.randomizer[0]*40;
    const r2 = smooth ? smooth : width/(120*config.randomizer[0]);
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = (width/60)*0.1;
    for (let i = 1; i < width; i++) {
        fill = fill || randColor(config, i);
        ctx.beginPath();
        // using a single color fill can be interesting
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        weave(ctx,
                {x:x + width/100*i,
                y:y + (config.randomizer[i] * stopGrow)},
                {x:x + width/100*i,
                y:y+height},
                // config.randomizer[i]*20 === patchwork
                r1, r2, 1, fill
        );
        ctx.stroke();
        ctx.closePath();
        const fill2 = randColor(config, i);
        bloomMaker(ctx, x + width/100*i, y + (config.randomizer[i] * stopGrow), width/100 * config.randomizer[i], 'daisy', fill2)
    }
}

function bloomMaker(ctx, x, y, size, bloom, fill){
    ctx.beginPath();
    switch(bloom){
        case 'daisy':
            ctx.beginPath();
            ctx.fillStyle = fill;
            ctx.ellipse(x, y-size*2, size, size*2, Math.PI / 1, 0, 2 * Math.PI);
            ctx.ellipse(x, y+size*2, size, size*2, Math.PI / 1, 0, 2 * Math.PI);
            ctx.ellipse(x-size*2, y, size, size*2, Math.PI / 2, 0, 2 * Math.PI);
            ctx.ellipse(x+size*2, y, size, size*2, Math.PI / 2, 0, 2 * Math.PI);
            ctx.ellipse(x-size*2, y-size*2, size, size*2, Math.PI / 1.5, 0, 2 * Math.PI);
            ctx.ellipse(x+size*2, y+size*2, size, size*2, Math.PI / 1.5, 0, 2 * Math.PI);
            ctx.ellipse(x-size*2, y+size*2, size, size*2, Math.PI / 3.5, 0, 2 * Math.PI);
            ctx.ellipse(x+size*2, y-size*2, size, size*2, Math.PI / 3.5, 0, 2 * Math.PI);
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

function hatch(ctx,config,x,y,width,height,freq,smooth, fill) {
    const r1 = freq ? freq : config.randomizer[0]*40;
    const r2 = smooth ? smooth : width/(120*config.randomizer[0]);
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = (width/500);
    for (let i = 1; i < height*4; i++) {
        // const fill = `#${config.scheme[0]}`
        fill = randColor(config, i);
        ctx.beginPath();
        // using a single color fill can be interesting
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        weave(ctx,
                {x:x + width/100*i,
                y},
                {x:x + width/100*i,
                y:y+height},
                // config.randomizer[i]*20 === patchwork
                r1, r2, 1, fill
        );
        weave(ctx,
            {x,
            y:y+height/100*i},
            {x:x + width,
            y:y+height/100*i},
            // config.randomizer[i]*20 === patchwork
            r1, r2, 1, fill
    );
        ctx.stroke();
        ctx.closePath();
    }
}

// resets new grid for noise in background
export function gridWork(ctx, width, height, midX, midY, noiseFactor, config, fill, spec) {
    // the size of the dots based on config
    const base = Math.floor(width / noiseFactor);
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

      switch(spec){
        case 'city':
            ctx.rect(
                cx - base*.75,
                (cy + row * base) - base*.75,
                (base*.5),
                (base*.5)
            );
            ctx.fill();
            break;
        case 'anything':
            // // abstract : painting quality
            // ctx.globalAlpha = config.randomizer[i];
            // ctx.beginPath();
            // ctx.setTransform(1, 0, 0, 1, cx, cy+row*base);
            // ctx.arc(0, base/2, base/2, 0, 2 * Math.PI);
            // ctx.rect(0, 0, base, base);
            // ctx.arc(base, base/2, base/2, 0, 2 * Math.PI);
            // ctx.fill();
            // ctx.closePath();

            // // Pilled : cluttered???
            // ctx.setTransform(1, 0, 0, 1, cx, cy+row*base-((base/4) * .75));
            // ctx.rotate(45 * Math.PI / 360);
            // ctx.arc(0, base/2, base/2, 0, 2 * Math.PI);
            // ctx.rect(0, 0, base, base);
            // ctx.arc(0 + base, base/2, base/2, 0, 2 * Math.PI);
            // ctx.fill();
            break;
            case 'cluttered':
            // 8 bit: cluttered
            ctx.globalAlpha = 0.1;
            ctx.shadowColor = fill;
            ctx.shadowOffsetX = config.randomizer[2] < 0.5 ? (base/2) : -(base/2);
            ctx.shadowOffsetY = config.randomizer[3] < 0.5 ? (base/2) : -(base/2);
              ctx.rect(
                cx,
                cy+row*base-((base/4) * .75),
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
                ctx.setTransform(1, 0, 0, 1, cx, cy+row*base);
                ctx.arc(0, base/4, base/4, 0, 2 * Math.PI);
                ctx.rect(0, 0, base/2, base/2);
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

  function randColor(config, i){
      return `#${config.scheme[Math.floor(config.randomizer[i] * config.scheme.length)]}`;
  }