# Pegboard Drivein (PDi)
Dillan Simmons (DSIMS) | AB hopeful factory project.

## Using the project
**The project still includes test code to make viewing traits easier, much code would be removed in prod.**

1. Pull this repo down locally
2. Install dev dependencies to run locally `npm install` 
3. Run the project locally: `npm run start`
4. Visit [http://localhost:1234/](http://localhost:1234/) to view.
    - You can manually refresh or click anywhere on the page to refresh with a new random seed
    - You can toggle the traits window with the `c` button
    - You can toggle the background color with the `spacebar`

## Project overview

### Influence
PDi is influenced heavily by film narrative and the feeling of being in a movie theater (or drive in theater). Each piece includes generative prose and a visual to try to bring the viewer into the movie goer experience: The feeling when the lights go down and the introduction scene plays out. From action to horror to art-house the narratives and visuals are versitile and each influence each other. Random ideas that drove this:

- Generative poetry (Nick Montfort / Alison Knowles / etc.)
- Strange movie plots (Predator)
- Detective writing
- Letterpress offsets / Plotter layering
- Op art


### Artistic approach
The artistic approcah is based on a variable grid of pegs (the pegboard) and different colors / outputs / crop are generated on top of behind it. Coming from a relief / screen printing background layers and opacity are very important to the visuals of the piece. Though it is a 2d work, much of the layering gives depth to each work. 

#### Traits: 
Background is white, black, or dark grey
Grid size can vary in 9 different sizes
Color schemes generated are 3,5,9, and 10 palletes and each produces a unique combination. There are 28 unique color schemes. 
Outputs ( these are what effects happen to the pegboard)
  - weave: lines are woven between certain pegs
  - rings: rings are made around certain pegs
  - blocks: squares are placed over each peg 
  - puzzle: a random sized square / rectangle fills over all the pegs
  - burst: lines originating from the center connect to each peg
  - gas: a blur of variable size is added over each peg
  - multiply: the pegs are multiplied across the board
  - abacus: lines skewer the pegs vertically
Cropped ( are there areas where our output will not display)
    - none: no crop (default)
    - square: a tight crop is applied around the board (grid)
    - mundi: the output only happens in a circle in the middle of the board
    - swept: the output only happens in a quarter circle that covers half the board in a swoop
    - sando: the output happens in the top 1/3 and bottom 1/3 of the board, the middle is untouched
    - cross: the output happens in the four corners of the board, leaving an empty + in the middle
Behind: true or false. Do the outputs happen on top of or behind the pegs
Hyper: Any output on top lightens the peg underneath it

#### Prose:
The prose is very variable and dynamic but basically consists of 3 main prompts filled in with a combination of 2100-2200 unique words. Prose can sound absurdist (like many movies from the 80s) but should be structurally sound and make sense as a sentance. They are intentionally built to represent a movie plot or scene. 

> A noseless kill bot and a plump heroic dog pair, a maddening fight lies ahead of them.

I'd watch that.
