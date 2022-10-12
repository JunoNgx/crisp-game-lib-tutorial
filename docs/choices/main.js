title = "choices";

description = `
Picky picky
`;

characters = [
`
`
];

const G = {
	WIDTH : 150,
	HEIGHT : 100,

	DUST_SPEED : 0.1,
	DUST_ROTATION_SPD : 0.1,

}

options = {
	viewSize : {x:G.WIDTH, y:G.HEIGHT},
};

// DEFINITIONS
/**
 * @typedef {{
 * pos: Vector,
 * angle: number,
 * speed: number,
 * rotTime: number, 
 * rotTimeCountdown: number,
 * isRotatingLeft: boolean
 * }} Dust
 */

/**
 * @type { Dust [] }
 */
let dust;

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
			}
		});
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
}
