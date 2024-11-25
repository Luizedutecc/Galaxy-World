const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let score = 0;
let gameOver = false;

const spaceship = {
    x: 100,
    y: canvas.height / 2,
    width: 40,
    height: 40,
    speed: 5,
    dx: 0,
    dy: 0
};

const meteors = [];
const stars = [];

document.addEventListener('keydown', moveSpaceship);
document.addEventListener('keyup', stopSpaceship);

function moveSpaceship(e) {
    if (e.key === 'ArrowUp') spaceship.dy = -spaceship.speed;
    if (e.key === 'ArrowDown') spaceship.dy = spaceship.speed;
    if (e.key === 'ArrowLeft') spaceship.dx = -spaceship.speed;
    if (e.key === 'ArrowRight') spaceship.dx = spaceship.speed;
}

function stopSpaceship(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') spaceship.dy = 0;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') spaceship.dx = 0;
}

function drawSpaceship() {
    ctx.fillStyle = 'white';
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function createMeteor() {
    const meteor = {
        x: canvas.width,
        y: Math.random() * canvas.height,
        width: 40 + Math.random() * 30,
        height: 40 + Math.random() * 30,
        speed: 3 + Math.random() * 2
    };
    meteors.push(meteor);
}

function createStar() {
    const star = {
        x: canvas.width,
        y: Math.random() * canvas.height,
        radius: 3 + Math.random() * 3,
        speed: 2 + Math.random() * 2
    };
    stars.push(star);
}

function drawMeteors() {
    ctx.fillStyle = 'gray';
    meteors.forEach((meteor, index) => {
        meteor.x -= meteor.speed;
        ctx.fillRect(meteor.x, meteor.y, meteor.width, meteor.height);

        if (meteor.x + meteor.width < 0) {
            meteors.splice(index, 1);
        }

        // Colisão com a nave
        if (spaceship.x < meteor.x + meteor.width &&
            spaceship.x + spaceship.width > meteor.x &&
            spaceship.y < meteor.y + meteor.height &&
            spaceship.y + spaceship.height > meteor.y) {
            gameOver = true;
        }
    });
}

function drawStars() {
    ctx.fillStyle = 'yellow';
    stars.forEach((star, index) => {
        star.x -= star.speed;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        if (star.x + star.radius < 0) {
            stars.splice(index, 1);
        }

        // Coletando estrela
        if (spaceship.x < star.x + star.radius &&
            spaceship.x + spaceship.width > star.x &&
            spaceship.y < star.y + star.radius &&
            spaceship.y + spaceship.height > star.y) {
            score += 10;
            scoreElement.textContent = score;
            stars.splice(index, 1);
        }
    });
}

function moveSpaceshipPosition() {
    spaceship.x += spaceship.dx;
    spaceship.y += spaceship.dy;

    // Impedir que a nave saia da tela
    if (spaceship.y < 0) spaceship.y = 0;
    if (spaceship.y + spaceship.height > canvas.height) spaceship.y = canvas.height - spaceship.height;
    if (spaceship.x < 0) spaceship.x = 0;
    if (spaceship.x + spaceship.width > canvas.width) spaceship.x = canvas.width - spaceship.width;
}

function update() {
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSpaceshipPosition();
    drawSpaceship();
    drawMeteors();
    drawStars();

    if (Math.random() < 0.02) createMeteor();
    if (Math.random() < 0.03) createStar();

    requestAnimationFrame(update);
}

update();