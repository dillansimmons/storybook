export function bone(letter, ctx, fontSize, x, y, width, size){
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
            y+fontSize+size/20
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
            y+fontSize-size/25
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