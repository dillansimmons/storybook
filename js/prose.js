export const stateQue = ['decrepit', 'enormous', 'blood-soaked', 'twinkling', 'sunken', 'carcass of the', 'glimering', 'grimy', 'bug infested', 'overgrown', 'corroded', 'ancient', 'battered', 'charming', 'shadow of the', 'cluttered', 'creepy'];
export const placeQue = ['castle', 'fortress', 'dungeon', 'river', 'ocean', 'battleship', 'labratory', 'power-plant', 'hideout', 'memory', 'dreamscape', 'city', 'hanger', 'manhole opening', 'acid vat', 'pagoda', 'fruit cellar', 'spacecraft', 'landing-pad', 'water tower', 'patchwork farm', 'library', 'portal' ];
export const challengeQue = ['challenge', 'fight', 'battle', 'puzzle', 'labrynth', 'trial', 'dogfight', 'deathmatch', 'chessgame', 'monster', 'sadness', 'struggle', 'test', 'heartbreak', 'contest', 'skirmish', 'conspiracy', 'chase', 'head-to-head', 'caper' ];


// Builds our generative prose
export function proseBuilder(R, title = false) {
    const word0 = ['the', 'our', 'your'] //'their'
    const word1 = ['disguised', 'solemn', 'lonely', 'rage filled', 'tall', 'tiny', 'hungry', 'beefy', 'rum soaked', 'grizzled', 'plump', 'jolly', 'scruffy', 'unkept', 'injured', 'handsome', 'fancy', 'hard-boiled', 'noseless', 'ditzy', 'cool', 'religious', 'one-armed', 'tight-lipped', 'braniac' ]
    const word2 = ['hero', 'warrior', 'muscle-man', 'commander', 'samarai', 'cosmonaut', 'soldier', 'wizard', 'academic', 'scholor', 'vixen', 'android', 'kiddo', 'detective', 'heroic dog', 'doctor', 'widow', 'pilot', 'diplomat', 'president', 'cowpoke', 'archaeologist', 'art dealer']
    const word2Alt = ['villian', 'scoundral', 'criminal', 'ring leader', 'kill bot', 'brute', 'assasin', 'alien', 'serpant', 'demon', 'giant spider', 'wolfman', 'zombie', 'thug', 'prankster', 'jailbird', 'mad-scientist', 'bounty hunter', 'dictator', 'railroad tycoon', 'grave robber']
    const word3 = ['dresses', 'undresses', 'eats their sushi', 'stands', 'crouches', 'hovers', 'stews', 'shrieks', 'contomplates', 'dreams', 'hallucinates', 'dozes off', 'brawls', 'awakes', 'limps', 'stretches', 'stumbles', 'grimaces', 'smiles', 'loads the revolver', 'scribbles a note']
    const word4 = ['across from', 'under', 'above', 'approaching', 'remembering', 'amongst', 'slinking towards', 'falling into', 'on the way to', 'journeying towards', 'walking from', 'peering at', 'searching', 'astonished by', 'frightened of' ]
    const word5 = stateQue;
    const word6 = placeQue;
    const word7 = ['great', 'dangerous', 'frightful', 'meaningful', 'tense', 'long', 'harrowing', 'mysterious', 'maddening', 'gut wrenching', 'grave', 'solemn', 'confounding', 'cryptic', 'otherworldly', 'mystical', 'baffling', 'paradoxical']
    const word8 = challengeQue;
    const word9 = ['awaits', 'approaches', 'ensnares', 'constricts', 'swallows', 'lies ahead of', 'meets', 'will shake', 'will damage', 'will devour', 'has weakened', 'will enlighten', 'has wounded', 'will cripple', 'haunts', 'enrages', 'hypnotizes' ]
    const word10 = ['him', 'her', 'them'];
    const word11 = ['say', 'scream', 'whisper'];
    const ngmi = ['We\'re both', 'We\'re not', 'You\'re not']
    const sentientThings = ['artwork', 'island', 'machine', 'sculptures', 'storm system']

    const yearLeader = `The year is ${R.random_int(1900,2021)}. `;

    const phrases = [
      'Ain\'t it big enough for us both in this town?',
      'All you had to do was throw the boxing match.',
      'God it is strange to see you again.',
      `I don't think we can ${wordSelector(R, ['bluff', 'Fonzie', 'shoot', 'sweet talk'])} our way out of this one.`,
      'I wanna see the bright lights tonight',
      'I used all the bullets on trick shots.',
      'I used to be hip.',
      'If heaven has an elevator, I hope our song is playing in it.',
      'Once the relic unlocks, everything will be one.',
      'Ten seconds \'til the volcano erupts.',
      `The ${wordSelector(R, sentientThings)} has become sentient`,
      `The rest of our ${wordSelector(R, ['cohorts', 'comrades', 'contemporaries', 'crew', 'friends', 'generation'])} have returned to the earth`,
      `This is one hell of a ${wordSelector(R, ['jam', 'pickle'])}.`,
      'This puzzle hasn\'t got any corners.',
      'This was avoidable if you\'d returned my postcard.',
      'This was the consequence of surrounding oursleves with yes men.',
      `This ${wordSelector(R, word8)} will not be our conclusion...`,
      `${wordSelector(R, ngmi)} gonna make it.`
    ]

    const randomizer = R.random_between(0,1);
    const useYear = R.random_between(0,1) > 0.9 ? yearLeader : '';
    const capitalize = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
    // `[Our] [solemn] [hero] [stands] [across from] the [decrepit] [castle], a [great] [challenge] [awaits] [him].`
    // `The [castle] is [great] and [decrepit]. The [villian] [awaits] [our] [solemn] [hero].`
    // `A [solemn] [villan] and a [lonely] [hero] pair, the final [puzzle] [awaits] them.`
    // `[Our] [solemn] [hero] [ensnares] [your] [villian] deep in the [castle] the [challenge] ends.
    // return `${capitalize(wordSelector(R,word0))} ${wordSelector(R,word1)} ${wordSelector(R,word2Alt)} turns to the ${wordSelector(R,word2)} ${wordSelector(R,word4)} the ${wordSelector(R,word5)} ${wordSelector(R,word6)}. "${wordSelector(R,phrases)}" they ${wordSelector(R,word11)}.`
    if (!title) {
      return randomizer > 0.8
        ? `${useYear}${capitalize(wordSelector(R,word0))} ${wordSelector(R,word1)} ${wordSelector(R,randomizer > 0.1 ? word2 : word2Alt)} ${wordSelector(R,word3)} ${wordSelector(R,word4)} the ${wordSelector(R,word5)} ${wordSelector(R,word6)}, a ${wordSelector(R,word7)} ${wordSelector(R,word8)} ${wordSelector(R,word9)} ${wordSelector(R,word10)}.`
        : randomizer > 0.6 ? `${useYear}The ${wordSelector(R,word6)} is ${wordSelector(R,word7)} and ${wordSelector(R,word5.filter(e => e !== 'carcass of the' && e !== 'shadow of the'))}. The ${wordSelector(R,word2Alt)} ${wordSelector(R,word9)} ${wordSelector(R,word0)} ${wordSelector(R,word1)} ${wordSelector(R,word2)}.`
        : randomizer > 0.4 ? `${useYear}A ${wordSelector(R,word1)} ${wordSelector(R,word2Alt)} and a ${wordSelector(R,word1)} ${wordSelector(R,word2)} pair, a ${wordSelector(R,word7)} ${wordSelector(R,word8)} ${wordSelector(R,word9)} them.`
        : randomizer > 0.2 ? `${useYear}${capitalize(wordSelector(R,word0))} ${wordSelector(R,word1)} ${wordSelector(R,word2)} ${wordSelector(R,word9)} the ${wordSelector(R,word2Alt)}, ${wordSelector(R,word4)} the ${wordSelector(R,word6)} the ${wordSelector(R,word8.filter(word => word !== 'monster'))} ${wordSelector(R, ['appears to end', 'has just begun', 'comes to pass', 'ends'])}.`
          : `${useYear}${capitalize(wordSelector(R,word0))} ${wordSelector(R,word1)} ${wordSelector(R,word2Alt)} turns to the ${wordSelector(R,word2)} ${wordSelector(R,word4)} the ${wordSelector(R,word5)} ${wordSelector(R,word6)}. "${wordSelector(R,phrases)}" they ${wordSelector(R,word11)}.`
    }

    return `${capitalize(wordSelector(R, word0))} ${wordSelector(R,word6)}`;
}

export function prose(ctx, string, x, y, maxWidth, color, fill, fontSize, fontStyle, align, capped = true) {
    ctx.shadowColor = 'transparent';
    ctx.textAlign = align;
    ctx.font = `bold ${fontSize}px ${fontStyle}`;
    ctx.globalCompositeOperation = "source-over";
    if (capped) {
      dropCapWrapText(ctx, string, x, y, maxWidth, color, fill, fontSize, fontStyle, align);
    } else {
      wrapText(ctx, string, x, y, maxWidth, fontSize);
    }
}

// // Prose Utilities
export function getTextHeight(ctx, text, maxWidth, fontSize, fontStyle) {
  // set fontsize for dropcap
  ctx.font = `bold ${fontSize * 3}px ${fontStyle}`;

  // measure dropcap
  const dropcap = text.charAt(0);
  const dropCapMetrics = ctx.measureText(dropcap)
  const dropcapWidth = dropCapMetrics.width;
  const dropcapHeight =  dropCapMetrics.fontBoundingBoxAscent - dropCapMetrics.fontBoundingBoxDescent;

  // cut first character that will be in dropcap
  text = text.substring(1);
  // remove additional character if it is a space
  if (text.charAt(0) === ' ') {
    text = text.substring(1);
  }

  // font size of rest
  ctx.font = `bold ${fontSize}px ${fontStyle}`;

  // cused for reseting font beginning after dropcap
  const spacer = fontSize*1.15;
  let spaceTally = 0;
  let count = 0;

  // words and vars
  const words = text.split(' ');
  let line = '';
  let testWidth = '';
  let repeater = true;
  let repeater2 = true;
  // add dropcap spacer
  let x = dropcapWidth/2;

  // filter through all the words
  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      // set the dropcap, only once
      if (repeater === true) {
        ctx.font = `bold ${fontSize*3}px ${fontStyle}`;
        repeater = false;
        x = x + dropcapWidth*.15;
      }
      // set the text
      ctx.font = `bold ${fontSize}px ${fontStyle}`;
      count++
      line = words[n] + ' ';
      spaceTally += spacer;
      // if the height of the lines is more than dropcap then reset starting point
      if (spaceTally > dropcapHeight * 1.65 && repeater2) {
        repeater2 = false;
        x = x - dropcapWidth * 1.8;
        maxWidth = maxWidth + dropcapWidth
      }
    }
    else {
      line = testLine;
    }
  }
  count++
  return {
    dropcapWidth,
    totalHeight: count*fontSize*1.1
  }
}

function dropCapBuilder(ctx, letter, x, y, height, width, align) {
  const modifier = 1.75;
  const shadow = .03;
  ctx.lineWidth = width/10;
  ctx.save();
    ctx.rect(x - width * modifier, y - height/2, width*modifier, height*modifier);
    ctx.fillStyle = 'hsla(120,100%,50%,0.5'; // dropcap background
    ctx.lineWidth = width/20;
    ctx.fill();
    ctx.stroke();
    if (align === 'center') {
      ctx.fillStyle = '#ccc';
      ctx.fillText(letter, x - width*.79, y);
      ctx.fillStyle = '#000';
      ctx.fillText(letter, x - width*.71, y);
    } else {
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ccc';
      ctx.fillText(letter, x - width*(modifier/2+shadow), y+height*(modifier/2));
      ctx.fillStyle = '#000';
      ctx.fillText(letter, x - width*(modifier/2-shadow), y+height*(modifier/2));
    }
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

  ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(
      x + width/10 + (reverse ? width/6 : 0),
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
      x + width/4 + (reverse ? width/6 : 0),
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
      x + width/6 + (reverse ? width/6 : 0),
      y + size/5,
      size/25,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  ctx.closePath();

  if (run === 0) {
    run = 1;
    dropCapFiller(ctx, x+width/2, y, size, width, fill, color, letter, type, true);
  }
}

function berryDrop(ctx, x,y, fontSize, width, fill, color, letter){
  width = width*1.5
  ctx.save()
    ctx.beginPath();
      const size = fontSize*3;
      ctx.strokeStyle = fill;
      ctx.rect(x-size/20, y-width/20, width + width/10, size + size/10);
      ctx.lineWidth = fontSize/20;
      ctx.stroke();
    ctx.closePath();

    dropCapFiller(ctx,x,y,size,width,fill,color,letter,'flowered');

    ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth=fontSize/2;
      // berry
      // switch (letter) {
      //   case 'A':
      //     ctx.ellipse(x+width/2, y+fontSize*1.75, fontSize*1.25, width/1.25/4, Math.PI / 2, .85, 1.75 * Math.PI);
      //     ctx.rect(x+width/2-width/4, y+fontSize*1.75, width/2, fontSize/10);
      //     break;
      //   case 'O':
      //     ctx.ellipse(x+width/2, y+fontSize*1.55, fontSize*.95, width/4, Math.PI / 2, 0, 2 * Math.PI);
      //     break;
      //   case 'T':
      //     ctx.rect(x+width/2-width/5, y+fontSize, width/2.5, fontSize/10);
      //     ctx.rect(x+width/2, y+fontSize, width/2/15, fontSize*1.5);
      //     break;
      //   case 'Y':
      //     ctx.ellipse(x+width/2, y+fontSize*.75, fontSize, width/5, Math.PI / 2, 1.5, 1.5 * Math.PI, true);
      //     ctx.rect(x+width/2, y+fontSize*1.75, width/30/15, fontSize*.75);
      //     break;
      // }

      ctx.lineWidth=fontSize/4;
      switch (letter) {
        case 'A':
          ctx.ellipse(x+width/2, y+fontSize*1.75, fontSize*1.25, width/1.25/4, Math.PI / 2, .85, 1.75 * Math.PI);
          ctx.rect(x+width/2-width/4, y+fontSize*1.75, width/2, fontSize/10);
          break;
        case 'O':
          ctx.ellipse(x+width/2, y+fontSize*1.55, fontSize*.95, width/4, Math.PI / 2, .5, 2 * Math.PI);
          ctx.stroke();
          ctx.arc(
            x + width/2,
            y+fontSize*1.55,
            size/25,
            0,
            2 * Math.PI,
            false
          );
          ctx.fill();
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
    ctx.closePath();
  ctx.restore();
}

function dropCapWrapText(ctx, text, x, y, maxWidth, color, fill, fontSize, fontStyle, direction) {
  // set fontsize for dropcap
  ctx.font = `bold ${fontSize * 3}px ${fontStyle}`;

  // measure dropcap
  const dropcap = text.charAt(0);
  const dropCapMetrics = ctx.measureText(dropcap)
  const dropcapWidth = dropCapMetrics.width;
  const dropcapHeight =  dropCapMetrics.fontBoundingBoxAscent - dropCapMetrics.fontBoundingBoxDescent;

  // cut first character that will be in dropcap
  text = text.substring(1);
  // remove additional character if it is a space
  if (text.charAt(0) === ' ') {
    text = text.substring(1);
  }

  // font size of rest
  ctx.font = `bold ${fontSize}px ${fontStyle}`;

  // cused for reseting font beginning after dropcap
  const spacer = fontSize*1.15;
  let spaceTally = 0;

  // words and vars
  const words = text.split(' ');
  let line = '';
  let testWidth = '';
  let repeater = true;
  let repeater2 = true;
  // add dropcap spacer
  x = x + dropcapWidth/1.25;

  // ctx.rect(x, y, maxWidth, 200);
  // ctx.stroke();

  // filter through all the words
  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      // set the dropcap, only once
      if (repeater === true) {
        ctx.font = `bold ${fontSize*3}px ${fontStyle}`;
        repeater = false;
        if (direction === 'left') {
          berryDrop(ctx, x-dropcapWidth*1.55, y-dropcapHeight/4, fontSize, dropcapWidth, fill, color, dropcap)
        } else {
          dropCapBuilder(ctx, dropcap, x - testWidth/2, y, dropcapHeight, dropcapWidth, fontSize*3);
        }
        x = x + dropcapWidth*.15;
        y = y + fontSize * .1;
      }
      // set the text
      ctx.font = `bold ${fontSize}px ${fontStyle}`;
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += spacer;
      spaceTally += spacer;
      // if the height of the lines is more than dropcap then reset starting point
      if (spaceTally > dropcapHeight * 1.65 && repeater2) {
        repeater2 = false;
        x = x - dropcapWidth * 1.8;
        maxWidth = maxWidth + dropcapWidth * 1.65
      }
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function wrapText(context, text, x, y, maxWidth, fontSize) {

  const words = text.split(' ');
  let line = '';

  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += fontSize*1.1;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

function wordSelector(R, wordArray) {
  return R.random_choice(wordArray);
}

// export function title(ctx, string, x, y, maxWidth, fontSize, align) {
//   ctx.shadowColor = 'transparent';
//   ctx.textAlign = align;
//   ctx.font = `bold ${fontSize*2.5}px serif`;
//   ctx.globalCompositeOperation = "source-over";
//   getTextHeight(ctx, string, x, y, maxWidth, fontSize, align);
// }