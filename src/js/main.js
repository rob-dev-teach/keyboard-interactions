import { gsap } from 'gsap';

const character = {
	element: document.querySelector('.character'),
	hitbox: document.querySelector('.character__hitbox'),
	position: {
		x: 0,
		y: 0,
	},
	speed: 5,
	velocity: 0,
};

const world = {
	limitLeft: 0,
	limitRight: window.innerWidth,
}

const checkCollisions = () => {
	const hitboxRect = character.hitbox.getBoundingClientRect();

	if (hitboxRect.left < world.limitLeft) {
		character.position.x = world.limitLeft;
	} else if (hitboxRect.right > world.limitRight) {
		character.position.x = world.limitRight - hitboxRect.width;
	}
};

const animate = () => {
	character.position.x += character.speed * character.velocity * gsap.ticker.deltaRatio();

	checkCollisions();

	character.element.style.left = `${character.position.x}px`;
};

gsap.ticker.add(animate);

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowRight') {
		character.velocity = 1;
		character.element.dataset.dir = 'right';
		character.element.dataset.state = 'running';
	}
	if (event.key === 'ArrowLeft') {
		character.velocity = -1;
		character.element.dataset.dir = 'left';
		character.element.dataset.state = 'running';
	}
});
document.addEventListener('keyup', (event) => {
	if (event.key === 'ArrowRight') {
		if (character.velocity === -1) return;
		character.velocity = 0;
		character.element.dataset.state = 'idle';
	}
	if (event.key === 'ArrowLeft') {
		if (character.velocity === 1) return;
		character.velocity = 0;
		character.element.dataset.state = 'idle';
	}
});
