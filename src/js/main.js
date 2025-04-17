import { gsap } from 'gsap';

const character = {
	element: document.querySelector('.character'),
	hitbox: document.querySelector('.character__hitbox'),
	position: {
		x: 0,
		y: 0,
	},
	speed: 5,
	velocity: {
		x: 0,
		y: 0,
	},
};

character.move = (velocity) => {
	character.velocity.x = velocity;
	if (velocity === 0) {
		character.element.dataset.state = 'idle';
	} else {
		character.element.dataset.state = 'running';

		if (velocity > 0) {
			character.element.dataset.dir = 'right';
		}
		if (velocity < 0) {
			character.element.dataset.dir = 'left';
		}
	}
};

const world = {
	limitLeft: 0,
	limitRight: window.innerWidth,
	gravity: 15,
	floor: document.querySelector('.floor').getBoundingClientRect().top,
};

const checkCollisions = () => {
	const hitboxRect = character.hitbox.getBoundingClientRect();

	if (character.position.x < world.limitLeft) {
		character.position.x = world.limitLeft;
		character.move(0);
	} else if (character.position.x + hitboxRect.width > world.limitRight) {
		character.position.x = world.limitRight - hitboxRect.width;
		character.move(0);
	}

	if (character.position.y + hitboxRect.height > world.floor) {
		character.position.y = world.floor - hitboxRect.height;
		character.velocity.y = 0;
	}
};

const animate = () => {
	character.position.x += character.speed * character.velocity.x * gsap.ticker.deltaRatio();
	character.position.y += (world.gravity + character.velocity.y) * gsap.ticker.deltaRatio();

	checkCollisions();

	character.element.style.left = `${character.position.x}px`;
	character.element.style.top = `${character.position.y}px`;
};

gsap.ticker.add(animate);

let isLeftKeyPressed = false;
let isRightKeyPressed = false;

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowRight') {
		if (isRightKeyPressed) return;
		isRightKeyPressed = true;
		character.move(1);
	}
	if (event.key === 'ArrowLeft') {
		if (isLeftKeyPressed) return;
		isLeftKeyPressed = true;
		character.move(-1);
	}
});
document.addEventListener('keyup', (event) => {
	if (event.key === 'ArrowRight') {
		isRightKeyPressed = false;
		if (character.velocity.x < 0) return;
		character.move(0);
	}
	if (event.key === 'ArrowLeft') {
		isLeftKeyPressed = false;
		if (character.velocity.x > 0) return;
		character.move(0);
	}
});
