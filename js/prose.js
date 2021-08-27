// Builds our generative prose
export function proseBuilder(R) {
    const word0 = ['the', 'our', 'your'] //'their'
    const word1 = ['disguised', 'solemn', 'lonely', 'rage filled', 'tall', 'tiny', 'hungry', 'beefy', 'rum soaked', 'grizzled', 'plump', 'jolly', 'scruffy', 'unkept', 'injured', 'handsome', 'fancy', 'hard-boiled', 'noseless', 'ditzy', 'cool', 'religious', 'one-armed', 'tight-lipped', 'braniac' ]
    const word2 = ['hero', 'warrior', 'muscle-man', 'commander', 'samarai', 'cosmonaut', 'soldier', 'wizard', 'academic', 'scholor', 'vixen', 'android', 'kiddo', 'detective', 'heroic dog', 'doctor', 'widow', 'pilot', 'diplomat', 'president', 'cowpoke', 'archaeologist', 'art dealer']
    const word2Alt = ['villian', 'scoundral', 'criminal', 'ring leader', 'kill bot', 'brute', 'assasin', 'alien', 'serpant', 'demon', 'giant spider', 'wolfman', 'zombie', 'thug', 'prankster', 'jailbird', 'mad-scientist', 'bounty hunter', 'dictator', 'railroad tycoon', 'grave robber']
    const word3 = ['dresses', 'undresses', 'eats their sushi', 'stands', 'crouches', 'hovers', 'stews', 'shrieks', 'contomplates', 'dreams', 'hallucinates', 'dozes off', 'brawls', 'awakes', 'limps', 'stretches', 'stumbles', 'grimaces', 'smiles', 'loads the revolver', 'scribbles a note']
    const word4 = ['across from', 'under', 'above', 'approaching', 'remembering', 'amongst', 'slinking towards', 'falling into', 'on the way to', 'journeying towards', 'walking from', 'peering at', 'searching', 'astonished by', 'frightened of' ]
    const word5 = ['decrepit', 'enormous', 'blood-soaked', 'twinkling', 'sunken', 'carcass of the', 'glimering', 'grimy', 'bug infested', 'overgrown', 'corroded', 'ancient', 'battered', 'charming', 'shadow of the', 'cluttered', 'creepy']
    const word6 = ['castle', 'fortress', 'dungeon', 'river', 'ocean', 'battleship', 'labratory', 'power-plant', 'hideout', 'memory', 'dreamscape', 'city', 'hanger', 'manhole opening', 'acid vat', 'pagoda', 'fruit cellar', 'spacecraft', 'landing-pad', 'water tower', 'patchwork farm', 'library', 'portal' ]
    const word7 = ['great', 'dangerous', 'frightful', 'meaningful', 'tense', 'long', 'harrowing', 'mysterious', 'maddening', 'gut wrenching', 'grave', 'solemn', 'confounding', 'cryptic', 'otherworldly', 'mystical', 'baffling', 'paradoxical']
    const word8 = ['challenge', 'fight', 'battle', 'puzzle', 'labrynth', 'trial', 'dogfight', 'deathmatch', 'chessgame', 'monster', 'sadness', 'struggle', 'test', 'heartbreak', 'contest', 'skirmish', 'conspiracy', 'chase', 'head-to-head', 'caper' ]
    const word9 = ['awaits', 'approaches', 'ensnares', 'constricts', 'swallows', 'lies ahead of', 'meets', 'will shake', 'will damage', 'will devour', 'has weakened', 'will enlighten', 'has wounded', 'will cripple', 'haunts', 'enrages', 'hypnotizes' ]
    const word10 = ['him', 'her', 'them'];
    const word11 = ['say', 'scream', 'whisper'];

    const phrases = [
      'Ain\'t it big enough for us both in this town?',
      'God it is strange to see you again.',
      'Hold on, cause this ones a doozie.',
      'I used to be hip.',
      'I\'ve captured all the wild places.',
      'Once the relic unlocks, everything will be one.',
      'Our relationship is too valuable.',
      'Ten seconds \'til the volcano erupts.',
      'This was avoidable if you\'d returned my postcard.',
      'We\'re all gonna make it.',
      'We\'re not gonna make it.',
      'You\'re not gonna make it.'
    ]

    const randomizer = R.random_between(0,1);
    const capitalize = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
    // `[Our] [solemn] [hero] [stands] [across from] the [decrepit] [castle], a [great] [challenge] [awaits] [him].`
    // `The [castle] is [great] and [decrepit]. The [villian] [awaits] [our] [solemn] [hero].`
    // `A [solemn] [villan] and a [lonely] [hero] pair, the final [puzzle] [awaits] them.`
    // `[Our] [solemn] [hero] [ensnares] [your] [villian] deep in the [castle] the [challenge] ends.
    return randomizer > 0.8
      ? `${capitalize(wordSelector(R,word0))} ${wordSelector(R,word1)} ${wordSelector(R,randomizer > 0.1 ? word2 : word2Alt)} ${wordSelector(R,word3)} ${wordSelector(R,word4)} the ${wordSelector(R,word5)} ${wordSelector(R,word6)}, a ${wordSelector(R,word7)} ${wordSelector(R,word8)} ${wordSelector(R,word9)} ${wordSelector(R,word10)}.`
      : randomizer > 0.6 ? `The ${wordSelector(R,word6)} is ${wordSelector(R,word7)} and ${wordSelector(R,word5.filter(e => e !== 'carcass of the' && e !== 'shadow of the'))}. The ${wordSelector(R,word2Alt)} ${wordSelector(R,word9)} ${wordSelector(R,word0)} ${wordSelector(R,word1)} ${wordSelector(R,word2)}.`
      : randomizer > 0.4 ? `A ${wordSelector(R,word1)} ${wordSelector(R,word2Alt)} and a ${wordSelector(R,word1)} ${wordSelector(R,word2)} pair, a ${wordSelector(R,word7)} ${wordSelector(R,word8)} ${wordSelector(R,word9)} them.`
      : randomizer > 0.2 ? `${capitalize(wordSelector(R,word0))} ${wordSelector(R,word1)} ${wordSelector(R,word2)} ${wordSelector(R,word9)} the ${wordSelector(R,word2Alt)}, ${wordSelector(R,word4)} the ${wordSelector(R,word6)} the ${wordSelector(R,word8.filter(word => word !== 'monster'))} appears to end.`
        : `${capitalize(wordSelector(R,word0))} ${wordSelector(R,word1)} ${wordSelector(R,word2Alt)} turns to the ${wordSelector(R,word2)} ${wordSelector(R,word4)} the ${wordSelector(R,word5)} ${wordSelector(R,word6)}. "${wordSelector(R,phrases)}" they ${wordSelector(R,word11)}.`
}

export function prose(ctx, string, x, y, maxWidth, fontSize, fill) {
    ctx.shadowColor = 'transparent';
    ctx.textAlign = 'center';
    ctx.font = `bold ${fontSize}px serif`;
    ctx.globalCompositeOperation = "source-over";
    wrapText(ctx, string, x, y, maxWidth, fontSize, fill);
}

// Prose Utilities
function wrapText(context, text, x, y, maxWidth, fontSize, fill) {
  // let count = 0;
  // let chars;
  // function draw() {
  //     count ++;
  //     // Grab all the characters up to count
  //     chars = text.substr(0, count);
  //     // context.strokeRect(x, y, maxWidth, fontSize*4);
  //     context.clearRect(0, y-fontSize, window.innerWidth, fontSize*4);
  //     // Draw the characters to the canvas
  //     context.fillStyle = fill;
  //     context.shadowColor = 'transparent';
  //     context.globalAlpha = 1;
  //     context.textAlign = 'center';
  //     context.font = `bold ${fontSize}px serif`;
  //     context.globalCompositeOperation = "source-over";
  //     context.fillText(chars, x, y);
  //     if (count < text.length){
  //       requestAnimationFrame(draw)
  //     }
  // }
  // draw();

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