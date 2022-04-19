import { bone } from "./type/bone";
import { normi } from "./type/normi";
import { berry } from "./type/berry";
import { oddball } from "./type/oddball";
import { mystery } from "./type/mystery";
import { lined } from "./type/lined";
import { chonky } from "./type/chonky";

export function buildType(ctx, x,y, fontSize, width, height, fill, color, letter, dropType, randomArray){
    width = width*1.5
    ctx.save()
    const size = fontSize*3;
    ctx.strokeStyle = fill;

    dropCapFiller(ctx,x,y,size,width,fill,color,letter,dropType);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth=fontSize/2;

    if (dropType === 'normi'){
        normi(letter, ctx, fontSize, x, y, width)
    }
    if (dropType === 'berry'){
        berry(letter, ctx, fontSize, x, y, width)
    }
    if (dropType === 'bones') {
        bone(letter, ctx, fontSize, x, y, width, size)
    }
    if (dropType === 'chonk') {
        chonky(letter, ctx, fontSize, x, y, width, randomArray)
    }
    if (dropType === 'myst') {
        mystery(letter, ctx, fontSize, x, y, width, randomArray)
    }
    if (dropType === 'lined') {
        lined(letter, ctx, fontSize, x, y, width, randomArray)
    }
    if (dropType === 'oddball') {
        oddball(letter, ctx, fontSize, x, y, width, randomArray)
    }

    ctx.closePath();
    ctx.restore();
}


// TODO: THIS BREAKS
let run = 0;
export function dropCapFiller(ctx, x, y, size, width, fill, color, letter, type, reverse=false) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = fill;
    ctx.rect(x, y, width/2, size);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = color;

    if (type === 'berry' || type === 'bones') {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(
            x+width/10 + (reverse ? width/6 : 0),
            y + size/10,
            size/25,
            0,
            2 * Math.PI,
            false
        );
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(
            x+width/4 + (reverse ? width/6 : 0),
            y + size/10,
            size/25,
            0,
            2 * Math.PI,
            false
        );
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(
            x+width/6 + (reverse ? width/6 : 0),
            y + size/5,
            size/25,
            0,
            2 * Math.PI,
            false
        );
        ctx.fill();
        ctx.closePath();
    }

    if (run === 0) {
        run = 1;
        dropCapFiller(ctx, x+width/2, y, size, width, fill, color, letter, type, true);
    }
}