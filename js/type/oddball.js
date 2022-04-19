export function oddball(letter, ctx, fontSize, x, y, width, randomArray){
    const random = randomArray[1];
    const random2 = randomArray[0];
    ctx.lineWidth = fontSize/2*(randomArray[2] > 0.1 ? randomArray[2] : (1-randomArray[2]) );
    switch (letter) {
    case 'A':
        ctx.ellipse(x+width/2, y+(fontSize*1.75), (fontSize*(random>0.3 ? random : (1-random)))*1.25, width/1.25/4*(random2>0.2 ? random2 : (1-random2)), Math.PI / 2, .85, 1.75 * Math.PI);
        ctx.rect(x+width/2-width/4, y+(fontSize*1.75), width/2, (fontSize*(random2>0.2 ? random2 : (1-random2)))/10);
        break;
    case 'O':
        ctx.ellipse(x+width/2, y+fontSize*1.55, fontSize*.95*random, width/4*random2, Math.PI / 2, 0, 2 * Math.PI);
        break;
    case 'T':
        ctx.rect(x+width/2-(width/3*(random>0.3 ? random : (1-random))), y+fontSize, (width/1.5*(random>0.3 ? random : (1-random))), fontSize/10);
        ctx.rect(x+width/2-width/60, y+fontSize, width/30, fontSize*2*(random2>0.3 ? random2 : (1-random2)));
        break;
    case 'Y':
        ctx.ellipse(x+width/2, y+(fontSize)*.75, (fontSize*(random>0.2 ? random : (1-random))), (width/3)*(random2>0.2 ? random2 : (1-random2)), Math.PI / 2, 1.5, 1.5 * Math.PI, true);
        ctx.rect(x+width/2, y+(fontSize)*.75+(fontSize*(random>0.2 ? random : (1-random))), width/30/15, fontSize);
        break;
    }
    ctx.stroke();
}