export function berry(letter, ctx, fontSize, x, y, width){
    switch (letter) {
    case 'A':
        ctx.ellipse(x+width/2, y+fontSize*1.75, fontSize*1.25, width/1.25/4, Math.PI / 2, .85, 1.75 * Math.PI);
        ctx.rect(x+width/2-width/4, y+fontSize*1.75, width/2, fontSize/10);
        break;
    case 'O':
        ctx.ellipse(x+width/2, y+fontSize*1.55, fontSize*.95, width/4, Math.PI / 2, 0, 2 * Math.PI);
        break;
    case 'T':
        ctx.rect(x+width/2-width/5, y+fontSize, width/2.5, fontSize/10);
        ctx.rect(x+width/2, y+fontSize, width/2/15, fontSize*1.5);
        break;
    case 'Y':
        ctx.ellipse(x+width/2, y+fontSize*.75, fontSize, width/5, Math.PI / 2, 1.5, 1.5 * Math.PI, true);
        ctx.rect(x+width/2, y+fontSize*1.75, width/30/15, fontSize*.75);
        break;
    }
    ctx.stroke();
}