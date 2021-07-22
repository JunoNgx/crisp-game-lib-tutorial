# Guide to getting start with CrispGameLib

[cgl-url]: https://github.com/abagames/crisp-game-lib

[aba-url]: https://github.com/abagames

Welcome to my tutorial for [CrispGameLib][cgl-url].

As someone who has absolutely been in love with the entirety of [ABAGames][aba-url]' (Kenta Cho) works, I eventually got around to use **CrispGameLib** in July 2021, and had probably one of my best developement experiences ever. It eventually struck me that despite library's simplicity and low barrier of entry, its popularity has been low, and I and Kenta appeared to be the only creators who used this library.

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

# About CrispGameLib

[CrispGameLib][cgl-url] is a Javascript game library geared towards making arcade-like mini games for web browsers. I believe it's fair to say that it's the spritual successor to [Mini Game Programming Library](https://github.com/abagames/mgl) and [MGL-coffee](https://github.com/abagames/mgl.coffee), both of which were made by Kenta Cho.

CrispGameLib priotizes simplicity and leanness of the game, taking care of many common elements, allowing the developer to focus on the creating gameplay, prototyping and getting the game to a playable state. Here are some notable facts:

* Games are playable only on web browsers, presented as [HTML5 canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas).
* The gameloop, collision detection, and high scores, are automatically handled the hood.
* All drawn sprites are limited to squared shapes of a preset of 16 colours.
* Custom sprites are limited to the size of 6x6, represented by characters defined in the array `characters []` (more on this later).
* Audio and music are procedurally generated and limited to a set of 8 sound effects (also, more on this later).
* Control is restricted to one pointer, controlled with mouse or single touch.

Needless to say, like most game engines and libraries out there, CrispGameLib is great for a particular kind of games, and not so great for others. If you are making a massive open world RPG with a lot of fine tuning and complex systems, this is not going to cut it. On the other hand, if you are prototyping an idea for smartphones you have in mind, or just looking for something you can spend on for less than an afternoon, here's the place.

# The goal


# What you need


# How to read this tutorial


# The Tutorial


## Step 00: Setting up


## Step 01: Basic drawing and update (stars)


## Step 02: Input and control (player)


## Step 03: Object control, creation, and removal (fBullets)


## Step 04: Mechanic control (enemies)


## Step 05: Collision detection and resolution


## Step 06: How audio works


## Step 07: More complex movements (eBullets)


# Game Distribution