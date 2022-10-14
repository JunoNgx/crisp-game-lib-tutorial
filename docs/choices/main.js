title = "choices";

description = `picky picky
`;

characters = [
`
  l
  l
ll ll
  l
  l
`,

`
  lll
 l   l
 l   l
 l   l
  lll

`
];

const G = {
	WIDTH: 150,
	HEIGHT: 100,

	DUST_SPEED : 0.1,
	DUST_ROTATION_SPD: 0.1,

	CURSOR_RCYCLE_TICKS: 20,
	CURSOR_PLAYER_DISTANCE: 20,

	player: {
		SPEED: 1,
		FIRERATE: 6,
		KNOCKBACK: 4,
		// charge
		CHARGE_RATE: 1,
		CHARGE_MAX: 24,
		// dash
		DASH_LENGTH_MAX: 40,
		DASH_COOLDOWN: 3,
		DASH_LINETIME: 4,
		// blocking
		SHIELD_SIZE: 15,
		SHIELD_DECREASE: 0.05,
		SHIELD_INCREASE: 1,
	},

	ENEMY_SPEED: 0.2,
	ENEMY_BASEHEALTH: 1,

	WAVE_RESPAWN_RATE: 240,

	colors: {
		green: {
			SPEED: 3,
			FIRERATE: 6,
			PARTICLE_RATE: 12,
			color: "green",
		},
		red: {
			SPEED: 100,
			FIRERATE: 24,
			PARTICLE_RATE: 6,
			color: "red",
		},
		yellow: {
			SPEED: 1,
			FIRERATE: 12,
			PARTICLE_RATE: 2,
			color: "yellow",
		},
	},
}

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	seed: 4,
	isPlayingBgm: true,
	isReplayEnabled: true,
	theme: "simple",
};

// DEFINITIONS
/**
 * @typedef {{
 * pos: Vector,
 * angle: number,
 * speed: number,
 * rotTime: number,
 * rotTimeCountdown: number,
 * isRotatingLeft: boolean,
 * }} Dust
 */

/**
 * @type { Dust [] }
 */
let dust;

/**
 * @typedef {{
 * pos: Vector
 * target: Enemy,
 * isTargeting: boolean,
 * }} Cursor
 */

/**
 * @type { Cursor }
 */
let cursor;

/**
 * @typedef {{
 * pos: Vector,
 * firingCooldown: number,
 * isFiring: boolean,
 * charge: number,
 * dashCooldown: number,
 * drawLineTime: number,
 * lineAngle: number,
 * blocking: boolean,
 * blockingSetUp: boolean,
 * shieldSize: number,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector,
 * }} UIReticle
 */

/**
 * @type { UIReticle }
 */
let uiReticle;

/**
 * @typedef
 */

/**
 * @typedef {{
 * pos: Vector,
 * size: number,
 * color: Color
 * }} Enemy
 */
/**
 * @type { Enemy [] }
 */
let enemies;

/**
 * @typedef {{
 * pos: Vector,
 * angle: number,
 * spurtCooldown: number,
 * }} GBullet
 */
/**
 * @type { GBullet [] }
 */
let gBullets;

let wave_respawn_time = G.WAVE_RESPAWN_RATE;

let cursorTime = 0;

function update() {
	if (!ticks) {
		// create dust motes
		dust = times(20, () => {
			const posX = rnd(0, G.WIDTH);
			const posY = rnd(0, G.HEIGHT);
			// frames until dust swtiches rotation direction
			const rotTimeBase = rnd(65, 185);

			return {
				// define pos, angle, etc
				pos: vec(posX, posY), // base dust position
				angle: rnd(0, PI*2), // angle dust is moving towards
				speed: rnd(G.DUST_SPEED, G.DUST_SPEED * 3), // speed
				rotTime: rotTimeBase, // referal time to rotate
				rotTimeCountdown: rotTimeBase, // countdown time
				isRotatingLeft: true, // rotation direction
			};
		});

		// create player
		player = {
			pos: vec(G.WIDTH / 2, G.HEIGHT / 2),
			firingCooldown: G.player.FIRERATE,
			isFiring: true,
			charge: 0,
			dashCooldown: 0,
			drawLineTime: 0,
			lineAngle: 0,
			blocking: false,
			blockingSetUp: false,
			shieldSize: G.player.SHIELD_SIZE,
		};
		// create cursor
		cursor = {
			pos: vec(G.WIDTH / 2, G.HEIGHT / 2),
			target: null,
			isTargeting: true,
		};
		// create UI reticle
		uiReticle = {
			pos: vec(G.WIDTH / 2, G.HEIGHT / 2 + 5),
		};
		enemies = [];
		gBullets = [];

		wave_respawn_time = 0;
	}
	wave_respawn_time--;
	if (wave_respawn_time <= 0) {
		if (enemies.length === 0) {
			enemies = times(6, () => {
				const posX = rnd(0, G.WIDTH);
				const posY = rnd(0, G.HEIGHT);
				return {
					pos: vec(posX, posY),
					size: rnd(0.5, 2),
					color: "red",
				}
			});
			wave_respawn_time = G.WAVE_RESPAWN_RATE;
		}
		else if (enemies.length < 6) {
			for (let i = 0; i < 3; i++) {
				const posX = rnd(0, G.WIDTH);
				const posY = rnd(0, G.HEIGHT);
				enemies.push({
					pos: vec(posX, posY),
					size: rnd(0.5, 2),
					color: "red",
				});
			}
			wave_respawn_time = G.WAVE_RESPAWN_RATE;
		}
	
	}

	// create dust
	dust.forEach((d) => {
		// move dust according to trig values
		d.pos.x += d.speed * Math.cos(d.angle);
		d.pos.y += d.speed * Math.sin(d.angle);
		// countdown to switch rotation direction
		d.rotTimeCountdown--;
		// keep dust within bounds
		d.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
		if (d.rotTimeCountdown <= 0) {
			// switch rotation direction
			d.isRotatingLeft = !d.isRotatingLeft;
			// reset time
			d.rotTimeCountdown = d.rotTime;
		}
		// move dust in different ways depending on direction
		d.isRotatingLeft 
		? d.angle -= G.DUST_ROTATION_SPD 
		: d.angle += G.DUST_ROTATION_SPD;
		color("black");
		box(d.pos, 1);
	});

	if (cursor.target == null && !cursor.isTargeting) {
		enemies.length == 0
		? cursor.target = null
		: cursor.target = enemies[Math.floor(Math.random()*enemies.length)];	
	}

	if (cursor.isTargeting) {
		// move cursor to circle rotation and draw
		cursorTime = ticks / G.CURSOR_RCYCLE_TICKS;
		// text(cursorTime.toString(), 3, 9);
		let xpos = G.CURSOR_PLAYER_DISTANCE * cos(cursorTime) + player.pos.x;
		let ypos = G.CURSOR_PLAYER_DISTANCE * sin(cursorTime) + player.pos.y;
		cursor.pos = vec(xpos, ypos);
	}
	else {
		cursor.pos = cursor.target.pos;
	}
	cursor.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
	color("black");
	// char("b", cursor.pos);
	arc(cursor.pos, 4, 1);

	// fire gun when holding down for enough time
	player.dashCooldown--;
	if (input.isPressed) {
		if (player.charge > G.player.CHARGE_MAX) {
			cursor.isTargeting = true;
			player.blocking = true;
			console.log(player.blocking);
		}
		else {
			player.charge++;
			player.blockingSetUp = false;
		}
	}
	// dash when releasing
	else if (input.isJustReleased) {
		if (player.charge <= G.player.CHARGE_MAX && player.dashCooldown <= 0) {
			// player_launch(player.pos.angleTo(cursor.pos));
			player.lineAngle = player.pos.angleTo(cursor.pos);
			play("jump");
			addScore(1, player.pos);
			// set draw time to not 0:
			player.drawLineTime = G.player.DASH_LINETIME;
			// particles!
			color("green");
			particle (
				player.pos.x,
				player.pos.y,
				rnd(15, 21),
				rnd(2.5, 3.5),
				player.lineAngle,
				PI/6,
			);
			// give player a new target
			// cursor.target = null;
			// move player to dash location
			player.pos.x += G.player.DASH_LENGTH_MAX * Math.cos(player.lineAngle);
			player.pos.y += G.player.DASH_LENGTH_MAX * Math.sin(player.lineAngle);
		
			player.dashCooldown = G.player.DASH_COOLDOWN;
		}
		player.isFiring = false;
		player.charge = 0;
		player.blocking = false;
		cursor.isTargeting = false;
		player.shieldSize = 0;
	}
	if (player.blocking) {		
		if (!player.blockingSetUp) {
			console.log("oooooooo");
			player.shieldSize >= G.player.SHIELD_SIZE
			? player.blockingSetUp = true
			: player.shieldSize += G.player.SHIELD_INCREASE;
		}
		else {
			console.log("AAAAAAAA");
			player.shieldSize <= 0
			? player.blocking = false
			: player.shieldSize -= G.player.SHIELD_DECREASE;
		}
		color("red");
		let radius = player.shieldSize / G.player.SHIELD_SIZE * 2.5;
		arc(player.pos, player.shieldSize, radius);
		cursor.target = null;
	}
	
	// player.firingCooldown--;
	// if (player.firingCooldown <= 0 && player.isFiring) {
	// 	// determine bullet angle
	// 	let fireAngle = player.pos.angleTo(cursor.pos);
	// 	// create green bullet
	// 	gBullets.push({
	// 		// properties
	// 		pos: vec(player.pos.x, player.pos.y),
	// 		angle: fireAngle,
	// 		spurtCooldown: G.colors.green.PARTICLE_RATE,
	// 	});
	// 	// knock back player
	// 	let knockbackDir = vec(
	// 		G.player.KNOCKBACK * Math.cos(fireAngle),
	// 		G.player.KNOCKBACK * Math.sin(fireAngle)
	// 	);
	// 	// nevermind do it again
	// 	player.pos.x -= knockbackDir.x;
	// 	player.pos.y -= knockbackDir.y;
	// 	// play fire sound effect
	// 	play("hit");
	// 	// reset firing cooldw=own
	// 	player.firingCooldown = G.player.FIRERATE;
	// }
	// make sure player raps 
	player.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
	// drawing
	color("yellow");
	box(player.pos, 4);
	// little box aimy reticle thing (next to player, not cursor)
	uiReticle.pos.x = player.pos.x + Math.cos(player.pos.angleTo(cursor.pos)) * 5;
	uiReticle.pos.y = player.pos.y + Math.sin(player.pos.angleTo(cursor.pos)) * 5;

	color("black");
	box(uiReticle.pos, 2);
	if (player.drawLineTime > 0) {
		// summon a quick line from player to dash location
		color("green");
		line(player.pos.x, player.pos.y, 
			player.pos.x - G.player.DASH_LENGTH_MAX*Math.cos(player.lineAngle), 
			player.pos.y - G.player.DASH_LENGTH_MAX*Math.sin(player.lineAngle),
			2);
		player.drawLineTime--;
	}

	// define enemies
	gBullets.forEach((gb) => {
		// move bullets on trajectory
		gb.pos.x += G.colors.green.SPEED * Math.cos(gb.angle);
		gb.pos.y += G.colors.green.SPEED * Math.sin(gb.angle);

		color("green");
		// add some particles every once in a while to spice things up
		gb.spurtCooldown--;
		if (gb.spurtCooldown <= 0) {
			particle (
				gb.pos.x,
				gb.pos.y,
				rnd(3, 5),
				rnd(0.5, 1.5),
				gb.angle,
				PI/6
			)
			gb.spurtCooldown = G.colors.green.PARTICLE_RATE;
		}
		// draw
		box(gb.pos, 2);

	});

	remove(enemies, (e) => {
		// move enemies toward player
		e.pos.x += (G.ENEMY_SPEED) * Math.cos(e.pos.angleTo(player.pos)) * difficulty;
		e.pos.y += (G.ENEMY_SPEED) * Math.sin(e.pos.angleTo(player.pos)) * difficulty;
		// keep them in screen
		e.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
		// draw
		color(e.color);
		// box(e.pos, e.size + 2);
		// check if colliding with green bullets
		const isCollidingWithGreen = 
		(char("b", e.pos, {scale: {x : (e.size), 
			y : (e.size)}})).isColliding.rect.green;
		// check if colliding with player
		const isCollidingWithPlayer =
		(char("b", e.pos, {scale: {x : (e.size), 
			y : (e.size)}})).isColliding.rect.yellow;
		// check if colliding with shield
		const isCollidingWithShield = 
		(char("b", e.pos, {scale: {x : (e.size), 
			y : (e.size)}})).isColliding.rect.red;

		// take damage from green bullets
		if (isCollidingWithGreen) {
			// decrease size / health
			e.size -= 2;
			// determine distance to player
			let d = Math.round(Math.sqrt(
				(player.pos.x - e.pos.x)**2 
				+ (player.pos.y - e.pos.y)**2));
			let modifieD = Math.round((1/d) * 50); 
			// add score if hit / destroyed

			if (e.size <= 0) {
				addScore((10 * modifieD) * difficulty, e.pos);
				cursor.target = null;
			}
			else {
				addScore(1 * modifieD, e.pos);
			}
			play("explosion");
		}
		// end game if collide with player
		if (isCollidingWithPlayer) {
			end(); // end game
			play("lucky"); // play sound effect
		}

		if (isCollidingWithShield) {
			e.pos.x -= (G.ENEMY_SPEED * 3) * Math.cos(e.pos.angleTo(player.pos)) * difficulty;
			e.pos.y -= (G.ENEMY_SPEED * 3) * Math.sin(e.pos.angleTo(player.pos)) * difficulty;	
		}

		return (e.size <= 0);
	})

	remove(gBullets, (gb) => {
		color("green");
		// check for collision with enemies
		const isCollidingWithEnemies =
		box(gb.pos, 2).isColliding.char.b;

		// destroy if colliding with enemies or outside bounds
		return (!gb.pos.isInRect(0, 0, G.WIDTH, G.HEIGHT));
	})



}
// func to make player dash
function player_launch(angle) {
	play("jump");
	addScore(1, player.pos);
	color("green");
	// summon a quick line from player to dash location
	line(player.pos.x, player.pos.y, 
		player.pos.x + player.charge*Math.cos(angle), 
		player.pos.y + player.charge*Math.sin(angle),
		2);
	// particles!
	particle (
		player.pos.x,
		player.pos.y,
		rnd(15, 21),
		rnd(2.5, 3.5),
		angle,
		PI/6,
	)
	// move player to dash location
	player.pos.x += G.player.DASH_LENGTH_MAX * Math.cos(angle);
	player.pos.y += G.player.DASH_LENGTH_MAX * Math.sin(angle);
}