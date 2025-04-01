import { gsap } from 'gsap';

const character = {
	element: document.querySelector('.character'),
	position: {
		x: 0,
		y: 0,
	},
	speed: 3,
	velocity: 0,
}

const animate = () => {
	character.position.x += character.speed * character.velocity * gsap.ticker.deltaRatio();
	character.element.style.left = `${character.position.x}px`;
}

gsap.ticker.add(animate);

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowRight') {
		character.velocity = 1;
	}
	if (event.key === 'ArrowLeft') {
		character.velocity = -1;
	}
});
document.addEventListener('keyup', (event) => {
	if (event.key === 'ArrowRight') {
		character.velocity = 0;
	}
	if (event.key === 'ArrowLeft') {
		character.velocity = 0;
	}
});
