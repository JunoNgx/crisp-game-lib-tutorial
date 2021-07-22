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

This is a project driven tutorial. We are going to learn gamedev by making a very particular game: [Charge Rush RE][crr], which is my own remake of the mgl.coffee-powered [CHARGE RUSH][cro] by Kenta himself. This is a game I have massively enjoyed for many years over, which also has a great balance of simplicity, complexity, and depth, in from both gameplay and gamedev perspectives.

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
* **Further reading**: self-explanatorily, there is only so much I can cover in one single tutorial and some matters are best researched in-depth.
* **Alternative implementation**: many problems or outcomes have no one single definite solution. Occasionally, I will provide an alternative implementation that has some sort of merits you can consider which would hopefully your understanding of the matter.
* **SWE practice**: while it might be strange to see the term software engineering slung around in beginner-level and simplicity-focused tutorial, but as a software developer myself, I advocate for readable and maintainable codebases. While this is somewhat contradictory to the nature and purpose of this library (games made quick and fast), I believe a healthy balance can be achieved.

Naturally, this tutorial is highly opinionated and based on my personal experiences and understanding. You are highly encouraged to develop your own preferences and stick to them. I also highly welcome feedback and critiques; feel free to contact me in anyway you can regarding those.

# The Tutorial

This is where the fun begins and things start happening on your computer 😈.

## Step 00: Setting up


## Step 01: Basic drawing and update (stars)


## Step 02: Input and control (player)


## Step 03: Object control, creation, and removal (fBullets)


## Step 04: Mechanic control (enemies)


## Step 05: Collision detection and resolution


## Step 06: How audio works


## Step 07: More complex movements (eBullets)


# Game Distribution

# Feedback and Critique

# Credits