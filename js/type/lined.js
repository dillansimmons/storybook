export function lined(letter, ctx, fontSize, x, y, width, randomArray){
    const random = randomArray[1];
    const random2 = randomArray[0];
    const counter = Math.ceil(random2*5);
    const line = fontSize/4*(randomArray[2] > 0.1 ? randomArray[2] : (1-randomArray[2]) );
    const adjust = i => (i*fontSize/3)-(counter/2*(fontSize/3)-fontSize/5)
    ctx.lineWidth = line;
    // ctx.lineCap = 'round';
    switch (letter) {
    case 'A':
        for (let i = 0; i < (counter); i++) {
            ctx.beginPath();
            ctx.moveTo(x+(fontSize*random)+adjust(i), y+fontSize*2.5);
            ctx.lineTo(x+width/2+adjust(i), y+fontSize/1.5);
            ctx.lineTo(x+width-(fontSize*random)+adjust(i), y+fontSize*2.5);
            ctx.stroke();
            ctx.closePath();
        }
        break;
    case 'O':
        for (let i = 0; i < (counter); i++) {
            ctx.beginPath();
            ctx.arc(x+width/2+adjust(i), y+fontSize*1.5, fontSize*random, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }
        break;
    case 'T':
        for (let i = 0; i < (counter); i++) {
            ctx.beginPath();
            ctx.moveTo(x+(fontSize*random), y+fontSize/1.5+adjust(i));
            ctx.lineTo(x+width-(fontSize*random), y+fontSize/1.5+adjust(i));
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(x+width/2+adjust(i), y+fontSize/1.5);
            ctx.lineTo(x+width/2+adjust(i), y+fontSize*2.5);
            ctx.stroke();
            ctx.closePath();
        }
        break;
    case 'Y':
        for (let i = 0; i < (counter); i++) {
            ctx.beginPath();
            ctx.moveTo(x+(fontSize*random)+adjust(i), y+fontSize/1.5);
            ctx.lineTo(x+width/2+adjust(i), y+fontSize*1.5);
            ctx.lineTo(x+width-(fontSize*random)+adjust(i), y+fontSize/1.5);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(x+width/2+adjust(i), y+fontSize*1.5);
            ctx.lineTo(x+width/2+adjust(i), y+fontSize*2.5);
            ctx.stroke();
            ctx.closePath();
        }
        break;
    }
}