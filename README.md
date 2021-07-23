# Guide to getting start with CrispGameLib

[cgl-url]: https://github.com/abagames/crisp-game-lib
[aba-url]: https://github.com/abagames
[aba-asa]: http://www.asahi-net.or.jp/~cs8k-cyu/
[cgl-jun]: https://github.com/JunoNgx/crips-game-lib-collection
[crr]: https://junongx.github.io/crips-game-lib-collection/?chargerushre
[cro]: http://abagames.sakura.ne.jp/html5/cr/

Welcome to my tutorial for [CrispGameLib][cgl-url].

As someone who has absolutely been in love with the entirety of [ABAGames][aba-url]' (Kenta Cho) works, I eventually got around to use **CrispGameLib** in July 2021, and had probably one of my best developement experiences ever. It eventually struck me that despite the library's simplicity and low barrier of entry, its popularity has been low, and I and Kenta appeared to be the only creators who used this library.

Here's my attempt to change that. If you are into making videogames and looking for something interesting, I hope I have found you one right here.

# Table of content

* [About CrispGameLib](#about-crispgamelib)
* [The goal](#the-goal)
* [What you need](#what-you-need)
* [How to read this tutorial](#how-to-read-this-tutorial)
* [The tutorial](#the-tutorial)
	* [Step 00: Setting up](#step-00-setting-up)
		* [Getting the software](#getting-the-software)
		* [Getting the library](#getting-the-library)
		* [Setup the npm package](#setup-the-npm-package)
	* [Step 01: Basic drawing and update (stars)](#step-01-basic-drawing-and-update-stars)
	* [Step 02: Input and control (player)](#step-02-input-and-control-player)
	* [Step 03: Object control, creation, and removal (fBullets)](#step-03-object-control-creation-and-removal-fbullets)
	* [Step 04: Mechanic control (enemies)](#step-04-mechanic-control-enemies)
	* [Step 05: Collision detection and resolution](#step-05-collision-detection-and-resolution)
	* [Step 06: How audio works](#step-06-how-audio-works)
	* [Step 07: More complex movements (eBullets)](#step-07-more-complex-movements-ebullets)
* [Game distribution](#game-distribution)
* [Feedback and Critique](#feedback-and-critique)
* [Credits](#credits)


# About CrispGameLib

[CrispGameLib][cgl-url] is a Javascript game library geared towards making arcade-like mini games for web browsers. I believe it's fair to say that it's the spritual successor to [Mini Game Programming Library](https://github.com/abagames/mgl) and [MGL-coffee](https://github.com/abagames/mgl.coffee), both of which were made by Kenta Cho.

CrispGameLib priotizes simplicity and leanness of the game, taking care of many common elements, allowing the developer to focus on the creating gameplay, prototyping and getting the game to a playable state. Here are some notable facts:

* Games are playable only on web browsers, presented as [HTML5 canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas).
* The gameloop, collision detection, and high scores, are automatically handled the hood.
* All drawn sprites are limited to squared shapes of a preset of 16 colours.
* Custom sprites are limited to the size of 6x6, represented by characters defined in the array `characters []` (more on this later).
* Audio and music are procedurally generated and limited to a set of 8 sound effects (also, more on this later).
* Control is restricted to one pointer, controlled with mouse or single touch.

Needless to say, like most game engines and libraries out there, CrispGameLib is great for a particular kind of games, and not so great for others. If you are making a massive open world RPG with a lot of fine tuning and complex systems, this is not going to cut it. On the other hand, if you are prototyping an idea for smartphones you have in mind, or just looking for something you can spend on for less than an afternoon, here's a great choice of tool.

A game speaks a million words, so do check out [Kenta's works][aba-asa] and [mine][cgl-jun] for a good idea of what this library can do.

# The goal

This is a project driven tutorial. We are going to learn gamedev by making a very particular game: [Charge Rush RE][crr], which is my own remake of the mgl.coffee-powered [CHARGE RUSH][cro] by Kenta himself. This is a game I have massively enjoyed for many years over, which also has a great balance of simplicity, complexity, and depth, in from both gameplay and gamedev perspectives. These are great properties for a learning project. I will also make small deviations from my release to facilitate the tutorial.

At the end of the tutorial, besides having your own version of Charge Rush running and  working, hopefully you'll have a good idea of:
* The software architecture and thinking process to create a game with CrispGameLib.
* Using GameCrispLib features, including drawing, resolving collisions, using audio, and managing scores.
* How game data are structured, accessed, and iterated in container arrays, with or without using CrispGameLib built-in functions (`times()` and `remove()`).

Bonus things that would be extremely great if you could get an understanding of:
* How to distribute and deploy a CrispGameLib game on the web via GitHub Page.
* How CrispGameLib works under the hood and its quirks.
* How to optimize the collision detection processes.
* The software development practices I discuss and your own opinionated preferences.
* How to make your next game.
* How to use *JSDoc* to benefit a Javascript project.

# What you need

As much as I would like to make this tutorial as accessible as possible, covering `hello world` is unfortunately out of the scope of this tutorial. You don't need to be a Javascript expert, but it is necessary that you have **an understanding of basic programming** (especially including: the concept of variables, performing operations, conditions, loops, and functions). Basically, if you're relatively fluent in any programming language, you're good to go.

You'll also need a capable device that can operate the **NodeJS** ecosystem and **a web browser that runs HTML5** (probably good as long as it's not Internet Explorer). Technically, you can use any IDE or text editor, but I personally find **VSCode** so well-optimized to this that it's a no-brainer choice.

You also don't need any previous gamedev experience (this is a great choice for your first), though I will occasional make comparisons to other popular game engines to explain GameCrispLib's quirks.

**Git and version control** are not essential for you to benefit from this tutorial, but is highly recommended like any work involving software.

Finally, this tutorial was written on Windows, so don't freak out if things look a bit different on your Mac or Linux devices.

# How to read this tutorial

Just read it like you should read any tutorial: take it slow, make sure you get the part right, and try not to skip 😁.

In the folder `docs` of this repository, you'll find folders named `step_xx`, representing the incomplete versions of the game, corresponding to the steps of this tutorial. You can access them by visiting the corresponding URL from your web browser `http://localhost:4000/?step_xx` after running `light-server`. This might sound confusing now, but you'll get the idea after setting up at step 0. Use these as references for your progress in case you run into any problem.

Alternatively, you can also access these steps from the deployment of this repository (example TODO), which I will also put at the end of each step.

Additionally, you'll also run into certain notations where I explain certain aspects of making the game:
* **CrispGameLib quirk**: explanation of the inner workings of the library those are most likely unusual compared to other tools that you take note of.
* **Javascript feature**: self-explanatorily, this tutorial assumes that are you unfamiliar with Javascript and will briefly explain features or aspects of the language when it's due.
* **Under the hood**: this is where I will explain shorthand commands and how things inner work behind the scene to give you a bit more knowledge. Hopefully, things will look a bit less like magic to you.
* **Further reading**: self-explanatorily, there is only so much I can cover in one single tutorial and some matters are best researched in-depth.
* **Alternative implementation**: many problems or outcomes have no one single definite solution. Occasionally, I will provide an alternative implementation that has some sort of merits you can consider which would hopefully your understanding of the matter.
* **For your experimentation**: this is where I encourage you to mildly deviate from the model code and do something yourself. These are generally harmless or have very little effect on the game, but will reinforce your understanding of how the codebase works.
* **SWE practice**: while it might be strange to see the term software engineering slung around in beginner-level and simplicity-focused tutorial, but as a software developer myself, I advocate for readable and maintainable codebases. While this is somewhat contradictory to the nature and purpose of this library (games made quick and fast), I believe a healthy balance can be achieved.

Naturally, this tutorial is highly opinionated and based on my personal experiences and understanding. You are highly encouraged to develop your own preferences and stick to them. I also highly welcome feedback and critiques; feel free to contact me in anyway you can regarding those.

# The Tutorial

This is where the fun begins and things start happening on your computer 😈.

## Step 00: Setting up

### Step 001: Getting the software

Like any development work, before we even get to do anything at all on the game, some software installation and build environment setup is due. This is done only once on each device system that you work on. These are very ubiquitous software for development devices. Go to each URL, follow the installation prompting, and proceed with default settings should get it done.

* [Git](https://git-scm.com/downloads) (can be omitted, but I strongly recommend you not)
* [NodeJS](https://nodejs.org/en/download/)
* A terminal of your choice. I personally use [Hyper](https://hyper.is/#installation). You'll also need to enable `bash` [if you're on Windows](https://gist.github.com/coco-napky/404220405435b3d0373e37ec43e54a23).
* A text editor/IDE of your choice. This tutorial assumes you are using [VSCode](https://code.visualstudio.com/).

----
**Further reading**: At some point, you should also register a GitHub account if you have not had one and [setup an SSH authentication](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh), which will be a significant life improvement when you start pushing your code to remote repositories frequently.

----

### Step 002: Getting the library

Once done, get a distributable version of CrispGameLib, and the simplest way to do so is to clone this repository.

Navigate to the directory where you'd like to work on with the terminal (alternatively, use your operating system's file explorer and opens the terminal there) and enter:

```
	git clone git@github.com:JunoNgx/crips-game-lib-tutorial.git
	cd crips-game-lib-tutorial
```

The second command will navigate the terminal into the newly cloned repository folder.

----
**Alternatively**: You can just download this repository directly, unzip it, and work from there. Or you can even get it directly from the original repository, which you should do some cleanup in `docs` because of existing games. TODO

----

### Step 003: Setup the npm package

In case you're not aware, this is an npm package.

----
**Further reading**: [What is npm? A Node Package Manager Tutorial for Beginners](https://www.freecodecamp.org/news/what-is-npm-a-node-package-manager-tutorial-for-beginners/)

----

To get the package setup and working, run `npm install` from the terminal.

In ways you feel comfortable with, go to the folder `docs`, make a copy of `docs/_template` in the same place and rename it to `chargerush`.

Return to your terminal and enter `npm run watch_games`. You should now no longer be able to type into the console (hint: if you'd like to exit, press `CTRL + C`). Meanwhile, open your browser and access the URL `http://localhost:4000/?chargerush`.

----
**Under the hood**: if you look into `package.json`, you will notice that `npm run watch_games` is a shorthand for `"light-server -s docs -w \"docs/**/* # # reload\""`, which initialise `light-server`, which is an npm package that allows you to run a static http server with livereloading (which means every time you save, the server will restart and refresh, running your new code immediately. Pretty magic, huh?). You don't need to know everything about `light-server`, but it's useful to understand [what it is](https://www.npmjs.com/package/light-server).

----

If you see a square bright screen against a slightly darker background, with what appears to be score and high score on the top corners, then congratulations, you've done that right 🥂.

![Step 000 - Engine running](images/step_000.png)

In case you are not getting there yet:
* Check the terminal and make sure that `light-server` is running.
* Check `docs` folder and make sure that the copied template is correctly named.
* Check the browser and make sure that you are accessing the `localhost` URL (not `0.0.0.0`), pointing to the right name of the folder after the question mark.

Once you've got the game running, open VSCode in the root folder of the repository, and open the file `docs/chargerush/main.js`. It's up to your personal preference, but my favourite setup involves halving the screen into VSCode and the browser running the game.

![My setup](images/step_002.png)

If you ever pause this tutorial to return another time, **don't forget** to run the `light-server` again.

Things will get interesting from here.

----
**Hint**: VSCode also has a built-in terminal. You may either run the server or operate `git` commands from there, saving another terminal window.

----

Step 00 conclusion: [deployment]() / [code]() TODO

## Step 01: Basic drawing and update (stars)

### Step 011: Renaming title

The content of the template `main.js` is relatively lean. Comments have been added in for your information:

```javascript
// The title of the game to be displayed on the title screen
title  =  "";

// The description, which is also displayed on the title screen
description  =  `
`;

// The array of custom sprites
characters  = [];

// Game runtime options
// Refer to the official documentation for all available options
options  = {};

// The game loop function
function  update() {
	// The init function
	if (!ticks) {

	}
}
```
----
**SWE practice**: Do be very mindful of indentations. Incorrect indentations make the codes hard to read, on top of diff complications in version control. This template and tutorial are set to indentation of 4 whitespaces. **Further reading**: [Indentation Style](https://en.wikipedia.org/wiki/Indentation_style).

----

Let's do the minimally important thing: changing the game name. Edit the first line:

```javascript
title = "CHARGE RUSH";
```

![Changed name](images/step_011.png)

As soon as you save the file, the server should automatically reload and the browser should now shows the game with its title `CHARGE RUSH`. Feeling excited yet?

### Step 012: Create the tuning data container and change the size

Next, we will create a Javascript object which will hold a lot of the game's important data. Add this block just above the `options`.

```javascript
const G = {
	WIDTH: 100,
	HEIGHT: 150
};
```
----
**SWE practice**: this object is declared as a `const` (for constant), which means its value is read-only once the game is started. Constant values should be capitalised in `CAPITALISED_SNAKE_CASE`, as these are essential values we will refer to over and over again throughout the codebase (this is premature, but you will soon see this enough, and also in contrast to local temporary `const` variables which I will use later on). **Further reading**: [When to capitalize your JavaScript constants](https://www.freecodecamp.org/news/when-to-capitalize-your-javascript-constants-4fabc0a4a4c4/).

----

We now may use these values to change the size of the game:

```javascript
options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT}
};
```

![Changed size](images/step_012.png)

While it is possible to simply just declare this as `options = {viewSize: {x: 100, y: 150}};`, putting this behind one single constant variables will simplify the game tuning process significantly. If you change your mind and want the game to be square again, `G.HEIGHT` is the only one place to edit, instead of running after every single instances of the value `150`.

We will also explore other properties of `options` along the way. Don't be surprised if you occasionally see strange properties enabled in the step references.

### Step 013: Container variable and JSDoc

Next, we will make something simple, but satisfying and motivating: the stars. Add the following block below `options`:

```javascript
/**
* @typedef {{
* pos: Vector,
* speed: number
* }} Star
*/

/**
* @type  { Star [] }
*/
let stars;
```

If you think those blocks are weird, you are correct that they are not very common sights. Also, the following section is going to be slightly heavy.

You probably have heard of this very hot thing called **TypeScript** in web development. They fix a major problem in Javascript, which is in its name itself: **typing**. By pre-defining sets of object properties as types, it is much easier to debug and get a program to work as intended. We are definitely not writing TypeScript, but **JSDoc** provides us with a very similar advantage.

While the two blocks of comments above do absolutely nothing while the game is running, they help you in getting the game to run correctly. Here the type `Star` is defined as object with two property: `pos` of type `Vector` (which is defined by CrispGameLib) and `speed` of type `number`. Let's say for some reason, you make a mistake and assigned a `string` value to `star.speed` like `star1.speed = "tsk tsk"`, VSCode will highlight this mistake and yell at you, preventing you from running that mistake and wasting your time and effort on needless debugging.

Similarly, `stars` is declared as an array of objects of type `Star`.

You can even write this in a more verbose and descriptive manner if you choose to:

```javascript
/**
* @typedef { object } Star - A decorative floating object in the background
* @property { Vector } pos - The current position of the object
* @property { number } speed - The downwards floating speed of this object
*/
```
If these feel weird, simply think of them as **class declaration**, a very common concept in programming. You probably will find them a hassle at first, but as far as my experience go, this is probably the most life-changing and quality-of-life improving thing I have found while writing Javascript.

If you personally find them unnecessary, it is understandable and the opinion has merit in the context of these small games. Feel free to omit them from your codes and proceed, though I personally don't recommend it unless you know very well what you are doing.

**Further reading**: [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).

### Step 014: The initialising block

----
**Under the hood**: Like most game engines, CrispGameLib has an looping `update()`, running 60 times per second. The framerate is fixed and not changeable. This also mean that games made with CrispGameLib are entirely frame-rate dependent, omitting the need to handle `deltaTime` and instead, working with number of frames directly (if you have ever used Pico-8, you'd get the idea). You also get access to `ticks`, which provides you with the number of frames the game has passed.

----

In `update()`, you will see a block of `if (!ticks) {}` already written. In a nutshell, this is the equivalent to `init()`, the function that will run at the start of the game.

Here, we'd like to initialise the variable `stars` we declared:
```javascript
// The game loop function
function update() {
    // The init function running at startup
	if (!ticks) {
        // A CrispGameLib function
        // First argument (number): number of times to run the second argument
        // Second argument (function): a function that returns an object. This
        // object is then added to an array. This array will eventually be
        // returned as output of the times() function.
		stars = times(20, () => {
            // Random number generator function
            // rnd( min, max )
            const posX = rnd(0, G.WIDTH);
            const posY = rnd(0, G.HEIGHT);
            // An object of type Star with appropriate properties
            return {
	            // Creates a Vector
                pos: vec(posX, posY),
                // More RNG
                speed: rnd(0.5, 1.0)
            };
        });
	}
}
```

There is quite a lot to be unpacked here, so take it slow. There are four things to take note of:
* The function `vec(x, y)` to create a `Vector` object. This is defined by CrispGameLib.
* The random number generator `rnd (min, max)` (you should also be aware of its variant that returns a rounded integer `rndi (min, max)`). Here it is used to generate a random position within the screen.
* I declared the temporary variables `posX` and `posY` as `const`, but did not capitalise them, because they are [scoped local variables](https://www.w3schools.com/js/js_scope.asp), in constrast to the global constant variable `G`.
* The CrispGameLib built-in function `times( number, func())`. This might sound a bit confusing, but it is actually just a short hand for a `for loop`. **Alternatively**, the block can practically be re-written as:
```javascript
function update() {
    if (!ticks) {
        for (let i = 0; i < 20; i++) {
            stars.push({
                pos: vec(rnd(0, G.WIDTH), rnd(0, G.HEIGHT)),
                speed: rnd(0.5, 1.0)
            });
        }
    }
}
```

Also, this is also a chance for a refactor and add more game design variables to `G`. We'd be doing this a lot from now on, so keep track of your object `G`:
```javascript
const G = {
	STAR_SPEED_MIN: 0.5,
	STAR_SPEED_MAX: 1.0
}
```
```javascript
	return {
	    pos: vec(posX, posY),
	    speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
	};
```

However, this has no visible effect on the game yet.

### Step 015: The update loop

We'll now be drawing the stars on screen. Add this block inside the `update()` block, just below the `if (!ticks) {}`:

```javascript
    // Update for Star
    stars.forEach((s) => {
        // Move the star downwards
        s.pos.y += s.speed;
        // Bring the star back to top once it's past the bottom of the screen
        s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);

        // Choose a color to draw
        color("light_black");
        // Draw the star as a square of size 1
        box(s.pos, 1);
    });
```

This block should look a lot less foreign, if you have ever seen videogame codes:
* The method `Array.forEach()` iterates and execute on each element in the array. In this case, each `star` is updated 60 times a second. **Further reading**: [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).
* `s.pos.y += s.speed` adds the y coordinate of the star by `speed` (which we randomly generated when we created the stars), bringing the star perpetually downwards to the bottom of the screen (unlike high school math, the y-axis points downwards).
* `wrap(minX, maxX, minY, maxY)` is a method for `Vector`, which wrap the object back to the otherside, when the object is outside of the screen (which is specified by the screen coordinates as the four arguments). The handling of the x coordinate here is redundant as it never changes. **Alternatively,** this can be re-written more effectively as `if (s.pos.y > G.HEIGHT) s.pos.y = 0;`
* The color is set before the star is drawn with `color()` (`light_black` sounds a bit wacky, but it does make sense when you look at the list of colors). Here, the `box()` is chosen to represent the star, taking the star's coordinate as an argument. **Further reading**: [the drawing example in CrispGameLib](https://abagames.github.io/crisp-game-lib-games/?ref_drawing). Take note of the alternative use of `x` and `y` arguments as coordinates in opposed to a `Vector`.

![Moving stars](images/step_015.gif)

Pretty cool, yeah?

----
**For your experimentation**: Try changing:
* The value of `G.STAR_SPEED_MIN` and `G.STAR_SPEED_MAX` and see how things change. Feel free to stay on a different set of values.
* The color of the stars (the list of colors can again be found in the [documentation][cgl-url]).
* The size of the star as the second argument of `box()`.

----

Step 01 conclusion: [deployment]() / [code]() TODO

## Step 02: Input and control (player)

Here we will start handling the player entity.

### Step 021: Another type

First, let's get started with more type and variable declaring. This is not unlike what we did previously:
```javascript
/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;
```
Unlike `stars`, `player` is in singular form, holding a single object instance of type `Player`. If you are feeling confused, do check out step 013 again.

We can also initialise the `player` object in the initialisation block (this is right below `stars`):
```javascript
player = {
    pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5)
};
```
Do take note of the use of game size variables `G.WIDTH` and `G.HEIGHT`, divided by half, to access the mid-position of the screen. We can now also start drawing the player:

```javascript
    color("cyan");
    box(player.pos, 4);
```

![Basic player](images/step_021.gif)

### Step 022: Input handling

This is, however, still not interactive. We will start this by handling the `input`. By conventional standard, an entity's updates occur before drawing, so put this line before the drawing codes above.

```javascript
    player.pos = vec(input.pos.x, input.pos.y);
```

![Moving player](images/step_022.gif)

Nice. The player now follows your mouse pointer.

----
**Further reading**: [The input example from the documention](https://abagames.github.io/crisp-game-lib-games/?ref_input). Besides the coordinate of the pointer, you also get access to three booleans `isPressed`, `isJustPressed`, `isJustReleased`, representing the three states of the button. While these will not be used in this tutorial, they are important. You can also do interesting and complicated input techniques with this, such as double tap/click, long press, or swiping.

----

However, we have one problem: the player occasionally moves out of the game screen, which is not ideal. We need to keep the player strictly within the screen at all times:

```javascript
    player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
```

![Clamped player's position](images/step_022b.gif)

You will notice that `Vector.clamp(minX, maxX, minY, maxY)` is very similar to `wrap()`, it just has a slightly different outcome.

### Step 023: Custom sprite

## Step 03: Object control, creation, and removal (fBullets)


## Step 04: Mechanic control (enemies)


## Step 05: Collision detection and resolution


## Step 06: How audio works


## Step 07: More complex movements (eBullets)


# Game Distribution

# Feedback and Critique

# Credits