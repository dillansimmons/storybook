export function mystery(letter, ctx, fontSize, x, y, width, randomArray){
    ctx.lineWidth = fontSize/2*(randomArray[2] > 0.1 ? randomArray[2] : (1-randomArray[2]) );
    switch (letter) {
    case 'A':
        ctx.moveTo(x+width/2, y);
        ctx.lineTo(x, y+fontSize*3.25);
        ctx.lineTo(x+width, y+fontSize*3.25);
        break;
    case 'O':
        ctx.arc(x+width/2, y+fontSize*1.5, fontSize, 0, 2 * Math.PI);
        break;
    case 'T':
        ctx.rect(x+width/2-(width/2.5), y+fontSize/4, (width/1.25), fontSize);
        ctx.rect(x+width/2-fontSize/2, y+fontSize+fontSize/4, fontSize, fontSize*1.5);
        break;
    case 'Y':
        ctx.moveTo(x+width/2, y+fontSize*2);
        ctx.lineTo(x-fontSize, y-fontSize/10);
        ctx.lineTo(x+width+fontSize, y-fontSize/10);
        ctx.rect(x+width/2-fontSize/2, y+fontSize+fontSize/8, fontSize, fontSize*2);        break;
    }
    ctx.fill();
}