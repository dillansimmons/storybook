import { drawChallenge } from './drawings/challenge';
import { drawMood } from './drawings/state';
import { drawPlace } from './drawings/place';
import { prose, dropCapWrapText } from './prose';

async function drawAll(ctx, config, x, y, width, height, fontSize, poemFill, canvasBgHex, layout){
    console.log(layout);
    await drawPlace(ctx, config, x, y, width, height, fontSize, poemFill, canvasBgHex);
    await drawMood(ctx,config,x,y,width,height,canvasBgHex);
    await drawChallenge(ctx, config, x, y, width, height)
}


export async function stacked(ctx, config, height, width, midX, midY, widthMax, fontSize, poemFill, canvasBgHex) {
    const heightAdjust = height / 7;
    const textHeights = dropCapWrapText(ctx, config, 0, 0, widthMax, null, null, fontSize, config.fontStyle, 'left', true)
    // const textHeights = dropCapWrapText(ctx, config, Math.ceil(midX - widthMax / 2), midY - textHeights.totalHeight/2, widthMax, null, null, fontSize, config.fontStyle, 'left', true)
    const xStart = midX - widthMax / 2 - textHeights.dropcapWidth * 1.125;
    const yStart = midY - textHeights.totalHeight / 2 - fontSize * 1.1 - heightAdjust;
    const boxWidth = widthMax + textHeights.dropcapWidth * 2.25;
    const boxHeight = textHeights.totalHeight + fontSize + heightAdjust * 2;

    // main box outline
    ctx.save();
    ctx.beginPath();
    ctx.rect(xStart, yStart, boxWidth, boxHeight);
    ctx.strokeStyle = poemFill;
    ctx.lineWidth = fontSize / 8;
    // ctx.stroke();
    ctx.closePath();

    // pattern / design
    ctx.beginPath();
    ctx.save();
    const lineWidth = fontSize / 8;
    ctx.lineWidth = lineWidth
    ctx.rect(xStart, yStart, boxWidth, heightAdjust);
    ctx.rect(xStart, midY + textHeights.totalHeight / 2 - fontSize * .1, boxWidth, heightAdjust);
    ctx.stroke();
    ctx.clip();
    await drawAll(ctx, config, xStart, yStart, boxWidth, boxHeight, fontSize, poemFill, canvasBgHex, 'stacked');
    ctx.restore();
    ctx.closePath();


    // Fill text center
    ctx.beginPath();
    ctx.fillStyle = poemFill;
    prose(
        ctx,
        config,
        Math.ceil(midX - widthMax / 2),
        midY - textHeights.totalHeight / 2,
        widthMax,
        canvasBgHex,
        poemFill,
        fontSize,
        config.fontStyle,
        'left'
    );
    ctx.closePath();
}

export async function gallery(ctx, config, height, width, midX, midY, widthMax, fontSize, poemFill, canvasBgHex) {
    fontSize = fontSize / 2;
    const textHeights = dropCapWrapText(ctx, config, 0, 0, widthMax, null, null, fontSize, config.fontStyle, 'left', true)
    const xStart = midX - widthMax / 2 - textHeights.dropcapWidth * 1.125;
    const yStart = midY - textHeights.totalHeight - height / 5;
    const boxWidth = widthMax + textHeights.dropcapWidth * 2.25;
    const boxHeight = textHeights.totalHeight + height / 2.5;

    // Fill text below image
    ctx.beginPath();
    ctx.fillStyle = poemFill;
    prose(
        ctx,
        config,
        midX,
        yStart + boxHeight + textHeights.totalHeight / 2,
        widthMax,
        canvasBgHex,
        poemFill,
        fontSize,
        config.fontStyle,
        'center',
        false
    );
    ctx.closePath();

    // main image box
    ctx.beginPath();
    ctx.rect(xStart, yStart, boxWidth, boxHeight);
    ctx.strokeStyle = poemFill;
    ctx.lineWidth = fontSize / 8;
    ctx.stroke();
    ctx.clip();
    ctx.closePath();

    await drawAll(ctx, config, xStart, yStart, boxWidth, boxHeight, fontSize, poemFill, canvasBgHex, 'gallery')
}

export async function computer(ctx, config, height, width, midX, midY, widthMax, fontSize, poemFill, canvasBgHex) {
    const textHeights = dropCapWrapText(ctx, config, 0, 0, widthMax, null, null, fontSize, config.fontStyle, 'left', true)
    const xStart = midX - widthMax / 2 - textHeights.dropcapWidth * 1.125;
    const yStart = midY - textHeights.totalHeight / 2 - fontSize * 1.1 - height / 10;
    const boxWidth = widthMax + textHeights.dropcapWidth * 2.25;
    const boxHeight = textHeights.totalHeight + fontSize + height / 5;

    await drawAll(ctx, config, 0, 0, width, height, fontSize, poemFill, canvasBgHex, 'computer')

    // ctx.globalAlpha = 0.5;
    // main box
    ctx.beginPath();
    ctx.rect(xStart, yStart, boxWidth, boxHeight);
    ctx.fillStyle = canvasBgHex;
    ctx.fill();
    ctx.stroke();
    ctx.clip();
    ctx.closePath();

    // action bar
    ctx.beginPath();
    ctx.rect(xStart, yStart, boxWidth, height / 10);
    ctx.fillStyle = poemFill;
    ctx.fill();

    ctx.lineWidth = fontSize / 4;
    ctx.strokeStyle = poemFill;
    ctx.stroke();
    ctx.closePath();

    // main box outline
    ctx.save();
    ctx.beginPath();
    ctx.rect(xStart, yStart, boxWidth, boxHeight);
    ctx.strokeStyle = poemFill;
    ctx.lineWidth = fontSize / 8;
    ctx.stroke();
    ctx.closePath();
    ctx.globalAlpha = 1;

    // Fill text center
    ctx.beginPath();
    ctx.fillStyle = poemFill;
    prose(
        ctx,
        config,
        Math.ceil(midX - widthMax / 2),
        midY - textHeights.totalHeight / 2,
        widthMax,
        canvasBgHex,
        poemFill,
        fontSize,
        config.fontStyle,
        'left'
    );
    ctx.closePath();
}

export async function novel(ctx, config, height, width, midX, midY, widthMax, fontSize, poemFill, canvasBgHex) {
    fontSize = fontSize * .75;
    const textHeights = dropCapWrapText(ctx, config, 0, 0, widthMax, null, null, fontSize, config.fontStyle, 'left', true)
    const xStart = midX - widthMax / 2 - textHeights.dropcapWidth * 1.125;
    const yStart = midY - textHeights.totalHeight - (fontSize * 1.1 / 3);
    const boxWidth = widthMax + textHeights.dropcapWidth * 2.25;
    const boxHeight = textHeights.totalHeight;

    // Fill text center
    ctx.beginPath();
    ctx.fillStyle = poemFill;
    prose(
        ctx,
        config,
        Math.ceil(midX - widthMax / 2),
        midY + fontSize,
        widthMax,
        canvasBgHex,
        poemFill,
        fontSize,
        config.fontStyle,
        'left'
    );
    ctx.closePath();

    // main box outline
    ctx.save();
    ctx.beginPath();
    ctx.rect(xStart, yStart, boxWidth, boxHeight);
    ctx.strokeStyle = poemFill;
    ctx.lineWidth = fontSize / 8;
    ctx.stroke();
    ctx.clip();
    ctx.closePath();

    await drawAll(ctx, config, xStart, yStart, boxWidth, boxHeight, fontSize, poemFill, canvasBgHex, 'novel')
    // ctx.restore();
}

export async function sidebar(ctx, config, height, width, midX, midY, widthMax, fontSize, poemFill, canvasBgHex) {
    fontSize = fontSize * .75;
    const textHeights = dropCapWrapText(ctx, config, 0, 0, widthMax / 3, null, null, fontSize, config.fontStyle, 'left', true)
    const xStart = midX + textHeights.dropcapWidth * 1.125;
    const yStart = midY - textHeights.totalHeight / 2 - fontSize * 1.1;
    const boxWidth = widthMax / 2;
    const boxHeight = textHeights.totalHeight + fontSize;

    // Fill text center
    ctx.beginPath();
    ctx.fillStyle = poemFill;
    prose(
        ctx,
        config,
        xStart,
        midY - textHeights.totalHeight / 2,
        widthMax / 3,
        canvasBgHex,
        poemFill,
        fontSize,
        config.fontStyle,
        'left'
    );
    ctx.closePath();

    // main box outline
    ctx.save();
    ctx.beginPath();
    ctx.rect(midX - boxWidth - fontSize * .5725, yStart, boxWidth, boxHeight);
    ctx.strokeStyle = poemFill;
    ctx.lineWidth = fontSize / 8;
    ctx.stroke();
    ctx.clip();
    ctx.closePath();

    await drawAll(ctx, config, midX - boxWidth - fontSize * .5725, yStart, boxWidth, boxHeight, fontSize, poemFill, canvasBgHex, 'sidebar');

    // ctx.restore()
}