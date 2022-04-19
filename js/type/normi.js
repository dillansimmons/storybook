export function normi(letter, ctx, fontSize, x, y, width){
    ctx.textAlign = 'center';
    ctx.fontSize = fontSize;
    switch (letter) {
    case 'A':
        ctx.fillText('A', x+width/2, y+fontSize*2.5);
        break;
    case 'O':
        ctx.fillText('O', x+width/2, y+fontSize*2.5);
        break;
    case 'T':
        ctx.fillText('T', x+width/2, y+fontSize*2.5);
        break;
    case 'Y':
        ctx.fillText('Y', x+width/2, y+fontSize*2.5);
        break;
    }
}