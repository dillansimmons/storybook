export function buildType(ctx, x,y, fontSize, width, height, fill, color, letter, dropType){
    width = width*1.5
    ctx.save()
        ctx.beginPath();
        const size = fontSize*3;
        ctx.strokeStyle = fill;
        ctx.rect(x-size/20, y-width/20, width + width/10, size + size/10);
        // ctx.lineWidth = fontSize/20;
        // ctx.stroke();
        ctx.clip();
        ctx.closePath();

        dropCapFiller(ctx,x,y,size,width,fill,color,letter,'');

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth=fontSize/2;
        if (dropType === 'chonk'){
            switch (letter) {
            case 'A':
                ctx.beginPath();
                ctx.moveTo(x+width/2-width/10, y+fontSize*1.3);
                ctx.lineTo(x+width/2, y+fontSize*.75);
                ctx.lineTo(x+width/2+width/10, y+fontSize*1.3);
                ctx.lineTo(x+width/2-width/10, y+fontSize*1.3);
                ctx.fill();
                ctx.closePath();

                ctx.rect(x+width/2-width/30, y+fontSize*2.25, width/15, fontSize*1.5);
                ctx.fill();

                ctx.beginPath();
                ctx.lineWidth=fontSize;
                ctx.moveTo(x+width/2-width*1.25, y+fontSize*4);
                ctx.lineTo(x+width/2, y-fontSize*2);
                ctx.lineTo(x+width/2+width*1.25, y+fontSize*4);
                ctx.stroke();
                ctx.closePath();
                break;
            case 'O':
                ctx.beginPath();
                ctx.arc(
                x+width/2,
                y+fontSize*1.55,
                width/20,
                0,
                2 * Math.PI,
                false
                );
                ctx.fill();
                ctx.closePath();
                // ctx.ellipse(x+width/2, y+fontSize*1.55, fontSize*.95, width/4, Math.PI / 2, 0, 2 * Math.PI);
                break;
            case 'T':
                ctx.rect(x, y+fontSize*1.5, width/100, fontSize*4);
                ctx.rect(x+width-width/100, y+fontSize*1.5, width/100, fontSize*4);
                break;
            case 'Y':
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x+width/2-width/10-width/20, y-2);
                ctx.lineTo(x+width/2-width/20, y+fontSize*1.25);
                ctx.lineTo(x+width/2+width/10-width/20, y-2);
                ctx.fill();
                ctx.closePath();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x-2, y);
                ctx.lineTo(x-2+width/6, y+fontSize*1.5);
                ctx.lineTo(x-2+width/6, y+fontSize*4);
                ctx.lineTo(x-2, y+fontSize*4);
                ctx.fill();
                ctx.closePath();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x+width, y);
                ctx.lineTo(x+width-width/6, y+fontSize*1.5);
                ctx.lineTo(x+width-width/6, y+fontSize*4);
                ctx.lineTo(x+width, y+fontSize*4);
                ctx.fill();
                ctx.closePath();
                ctx.restore();
                break;
            }
            ctx.stroke();
        }
        if (dropType === 'berry'){
            // berry
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
        if (dropType === 'bones'){
        ctx.lineWidth=fontSize/4;
        switch (letter) {
            case 'A':
            ctx.moveTo(x+width/2-width/4, y+fontSize*2.5);
            ctx.lineTo(x+width/2, y+fontSize/1.5);
            ctx.lineTo(x+width/2+width/4, y+fontSize*2.5);
            ctx.rect(x+width/2-width/4, y+fontSize*1.75, width/2, fontSize/25);
            ctx.stroke();

            //right
            boneEnds(ctx,size,
                x+width/2+width/4+size/25,
                y+fontSize*1.75-size/25,
                x+width/2+width/4+size/25,
                y+fontSize*1.75+size/25
            );

            //left
            boneEnds(ctx,size,
                x+width/2-width/4-size/25,
                y+fontSize*1.75-size/25,
                x+width/2-width/4-size/25,
                y+fontSize*1.75+size/25
            );

            //bottom
            //right
            boneEnds(ctx,size,
                x+width/2+width/4+size/25,
                y+fontSize*2.5,
                x+width/2+width/4-size/25,
                y+fontSize*2.5+size/125
            );

            //bottom
            //left
            boneEnds(ctx,size,
                x+width/2-width/4+size/25,
                y+fontSize*2.5+size/125,
                x+width/2-width/4-size/25,
                y+fontSize*2.5
            );
            break;
            case 'O':
            ctx.beginPath();
            ctx.ellipse(x+width/2, y+fontSize*1.55, fontSize*.95, width/4, Math.PI / 2, .5, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            //right
            boneEnds(ctx,size,
                x+width/2,
                y+fontSize*2.5-size/25,
                x+width/2,
                y+fontSize*2.5+size/25
            );

            // left
            boneEnds(ctx,size,
                x+width/2-size/6.35,
                y+fontSize*2.35-size/25,
                x+width/2-size/6.35,
                y+fontSize*2.35+size/25
            );
            break;
            case 'T':
            ctx.lineWidth=fontSize/6;
            ctx.rect(x+width/2-width/5, y+fontSize*.95, width/2.5, fontSize/10);
            ctx.rect(x+width/2, y+fontSize*1.30, width/2/14, fontSize*1.2);
            ctx.stroke();

            //right
            boneEnds(ctx,size,
                x+width/2+width/2.5-width/6,
                y+fontSize-size/20,
                x+width/2+width/2.5-width/6,
                y+fontSize+size/20
            );

            //left
            boneEnds(ctx,size,
                x+width/2-width/4.5,
                y+fontSize-size/20,
                x+width/2-width/4.5,
                y+fontSize+size/20,
            );

            //bottom
            boneEnds(ctx,size,
                x+width/2+(width/2/14/2)-size/20,
                y+fontSize*1.30+fontSize*1.2+size/40,
                x+width/2+(width/2/14/2)+size/20,
                y+fontSize*1.30+fontSize*1.2+size/40
            );
            break;
            case 'Y':
            ctx.moveTo(x+width/2-width/4, y+fontSize*0.9);
            ctx.lineTo(x+width/2+width/2/28, y+fontSize*1.75);
            ctx.lineTo(x+width/2+width/4, y+fontSize);
            ctx.stroke();
            ctx.lineWidth=fontSize/6;
            ctx.rect(x+width/2, y+fontSize*1.75, width/2/14, fontSize*.75);
            ctx.stroke();

            //right
            boneEnds(ctx,size,
                x+width/2+width/4+size/25,
                y+fontSize,
                x+width/2+width/4,
                y+fontSize-size/25,
            );
            //left
            boneEnds(ctx,size,
                x+width/2-width/4+size/25,
                y+fontSize*0.9,
                x+width/2-width/4,
                y+fontSize*0.9+size/25
            );
            // bottom
            boneEnds(ctx,size,
                x+width/2+(width/2/14/2)-size/20,
                y+fontSize*1.30+fontSize*1.2+size/40,
                x+width/2+(width/2/14/2)+size/20,
                y+fontSize*1.30+fontSize*1.2+size/40
            );
            break;
        }
        }
        ctx.closePath();
    ctx.restore();
}


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

  if (type === 'flowered') {
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

function boneEnds(ctx,size,x1,y1,x2,y2){
    ctx.beginPath();
    ctx.arc(
        x1,
        y1,
        size/25,
        0,
        2 * Math.PI,
        false
    );
    ctx.arc(
        x2,
        y2,
        size/25,
        0,
        2 * Math.PI,
        false
    );
    ctx.fill();
    ctx.closePath();
}