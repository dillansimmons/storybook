# Pegboard Drivein (PbDi)
Dillan Simmons (DSIMS) | AB hopeful factory project.

## Using the project
**The project still includes test code to make viewing traits easier, much code would be removed in prod.**

1. Pull this repo down locally
2. Install dev dependencies to run locally `npm install` 
3. Run the project locally: `npm run start`
4. Visit [http://localhost:1234/](http://localhost:1234/) to view.
    - You can manually refresh or click anywhere on the page to refresh with a new random seed
    - You can toggle the background color with the <kbd>spacebar</kbd> or <kbd>Shift</kbd> + <kbd>spacebar</kbd>. 
    - You can turn off the prose and only view the visual by pressing <kbd>p</kbd>. This is not the reccomended way of viewing the art but to each their own. Come as you are.
    
    **Test controls - wont be in the final piece**

    - You can toggle a side window showing trait details by pressing <kbd>c</kbd>
    - You can turn off the animations by pressing the <kbd>n</kbd> key, nice for quickly viewing outputs. Some big peg animations can take 20s
    - You can press <kbd>s</kbd> to view the seed

## Project overview

### Influence
PbDi is influenced heavily by film narrative and the feeling of being in a movie theater (or drive in theater). Each piece includes generative prose and a screen like visual in an attempt to recreate the movie going experience, the feeling when the lights go down and a key scene plays out.

Ideas that drove this:
- Generative poetry (Especially slotted works, ie Alison Knowles / etc.)
- Strange movie plots (Predator, Big Lebowski, Turner and Hooch)
- Retro video game text dialog
- Detective writing
- Grids, microchips, and pegboards
- Letterpress offsets / Plotter layering


### Artistic approach
The artistic approcah is based on a variable grid of pegs (the pegboard) and different colors / outputs / crop are generated on top of behind it. Coming from a relief / screen printing background layers and opacity are very important to the visuals of the piece. Though it is a 2d work, much of the layering and opacity gives depth. 

#### Traits: 
Background is white, black, or dark grey

Grid size can vary in 10 different sizes. A single peg grid is an outlier at 1/1000.

Color schemes generated are 3,5,9, and 10 palletes. Each produces a unique combination. 

There are 30 unique color schemes. Colors were inspired by a number of sources and very curated. Picked off of from things like an old t-shirt print, a sundown, a dixie cup, art, etc...

Outputs ( these are what effects happen to the pegboard )
  - weave: lines are woven between certain pegs
  - rings: rings are made around certain pegs
  - blocks: squares are placed over each peg giving a block (LEGO) effect
  - puzzle: a random sized square / rectangle fills over all the pegs
  - burst: lines originating from the center connect to each peg
  - gas: a blur of variable size is added over each peg
  - multiply: the pegs are multiplied across the board
  - abacus: lines skewer the pegs vertically
  - lines: lines go horizontally across the pegs
  - bubble: bubbles form over the pegs

Cropped ( controls if there are areas where our output will not display )
  - none: no crop (default)
  - square: a tight crop is applied around the board (grid)
  - mundi: the output only happens in a circle in the middle of the board
  - swept: the output only happens in a quarter circle that covers half the board in a swoop
  - sando: the output happens in the top 1/3 and bottom 1/3 of the board, the middle is untouched
  - cross: the output happens in the four corners of the board, leaving an empty + in the middle

Behind: true or false. Do the outputs happen on top of or behind the pegs

Hyper: Any output on top lightens the peg underneath it

SquarePeg: true or false. Is the peg round or square

#### Prose:
The prose is very variable and dynamic but basically consists of 3 main prompts filled in with a combination of 2100-2200 unique words. Prose can sound absurdist (like many movies from the 80s) but should be structurally sound and make sense as a sentance. They are intentionally built to represent a movie plot or scene and allude to a larger story.

> A noseless kill bot and a plump heroic dog pair, a maddening fight lies ahead of them.

I'd watch that.
