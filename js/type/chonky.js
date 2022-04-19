export function chonky(letter, ctx, fontSize, x, y, width, randomArray, bg, fill){
    const random = randomArray[1];
    const random2 = randomArray[0];
    switch (letter) {
    case 'A':
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.moveTo(x+width/2, y-(fontSize*random2));
        ctx.lineTo(x-(fontSize*random), y+fontSize*3.25);
        ctx.lineTo(x+width+(fontSize*random), y+fontSize*3.25);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = bg;
        ctx.moveTo(x+width/2, y+fontSize/2+(fontSize*random2));
        ctx.lineTo(x+width/2-(fontSize*random), y+fontSize*1.5);
        ctx.lineTo(x+width/2+(fontSize*random), y+fontSize*1.5);
        ctx.fill();
        ctx.closePath();
        break;
    case 'O':
        ctx.arc(x+width/2, y+fontSize*1.5, fontSize*random, 0, 2 * Math.PI);
        ctx.fill();
        break;
    case 'T':
        ctx.rect(x+width/2-(width/2.5+random), y+fontSize/4, (width/1.25+(random/2)), fontSize);
        ctx.rect(x+width/2-fontSize/2, y+fontSize+fontSize/4, fontSize, fontSize*1.5);
        ctx.fill();
        break;
    case 'Y':
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.moveTo(x+width/2, y+fontSize*2.5+random);
        ctx.lineTo(x-fontSize*random2, y-fontSize/5);
        ctx.lineTo(x+width+fontSize*random2, y-fontSize/5);
        ctx.rect(x+width/2-fontSize/2, y+fontSize+fontSize/8, fontSize, fontSize*2);
        ctx.fill();
        ctx.closePath();


        ctx.beginPath();
        ctx.fillStyle = bg;
        ctx.moveTo(x+width/2, y+fontSize*1.5*random);
        ctx.lineTo(x+fontSize, y);
        ctx.lineTo(x+width-fontSize, y);
        ctx.fill();
        ctx.closePath();
        break;
    }
}