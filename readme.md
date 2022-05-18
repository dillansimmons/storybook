# Storyboard
Dillan Simmons (DSIMS) | AB hopeful factory project.

## Notes

### Things that suck / need completed
- Need to set colors to mood better
- Needs more abstraction, the really poor ones are
    - battleship 
    - library
    - river
- there are many that have no defining value
- needs to be more definition when null is value
- dropcaps feel clunky
- chonk dropcap is especially sloppy
- noise needs to be more carefully applied
- novel + destroy look great
- variable type (height / width)
- hatch / texture type
- less shapes without explicit randomness


## Using the project
**The project still includes test code to make viewing traits easier, much code would be removed in prod.**

1. Pull this repo down locally
2. Install dev dependencies to run locally `npm install` 
3. Run the project locally: `npm run start`
4. Visit [http://localhost:1234/](http://localhost:1234/) to view.
    - You can manually refresh or click anywhere on the page to refresh with a new random seed
    - You can toggle the background color with the <kbd>spacebar</kbd> or <kbd>Shift</kbd> + <kbd>spacebar</kbd>. 
    
    **Test controls - wont be in the final piece**

    - You can toggle a side window showing trait details by pressing <kbd>c</kbd>
    - You can turn off the animations by pressing the <kbd>n</kbd> key, nice for quickly viewing outputs. Some big peg animations can take 20s
    - You can press <kbd>s</kbd> to view the seed

## Project overview

### Influence
Storyboard is influenced heavily by film and book narrative and the feeling of starting or ending a story. Each piece includes generative prose and visuals in an attempt to recreate the inital grip of a story.

Ideas that drove this:
- Generative poetry (Especially slotted works, ie Alison Knowles / etc.)
- Strange movie plots (Predator, Big Lebowski, Turner and Hooch)
- Retro video game text dialog
- Detective writing
- Letterpress offsets / Plotter layering
- Hatching, grit, texture.
- Novel chapter opening art.


### Artistic approach
The artistic approcah uses layering of images and effects qued off of the algorythms understanding of the mood of the prose.

#### Traits: 
Background is white, tan, dark grey or black.

TBD:
Color schemes generated are 3,5,9, and 10 palletes. Each produces a unique combination. 

There are 30 unique color schemes. Colors were inspired by a number of sources and very curated. Picked off of from things like an old t-shirt print, a sundown, a dixie cup, art, etc...

#### Prose:
The prose is very variable and dynamic but basically consists of 3 main prompts filled in with a combination of around 2100 unique words. Prose can sound absurdist (like many movies from the 80s) but should be structurally sound and make sense as a sentance. They are intentionally built to represent a movie plot or scene and allude to a larger story.

> A noseless kill bot and a plump heroic dog pair, a maddening fight lies ahead of them.

I'd watch that.

## Notes 
- Bone looks good with serif

## TODO
- over abundance of battle (circle breaking)
- dropcap should clip

### Bugs
- Line wraping breaks at certain sizes, especially sidebar (22, 25px font size)
- O for bone is broken
- T (lined with 5 is too much)
