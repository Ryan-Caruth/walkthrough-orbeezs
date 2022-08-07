const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleNum =5000;
let particleArray = [];

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
    radius: 65,
}

canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 20;
        this.speedX = this.x;
        this.speedY = this.y;
        this.colour = generateParticles();
        this.density = (Math.random() * 60) + 20;
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < 66) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x != this.speedX) {
                let dx = this.x - this.speedX;
                this.x -= dx / 10;
            }
            if (this.y != this.speedY) {
                let dy = this.y - this.speedY;
                this.y -= dy / 10
            }
        }
    }
    draw() {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fill();
    }
}

function generateParticles() {
    let hexSet = '0123456789ABCDEF'
    let finalHexString = '#'
    for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)]
    }
    return finalHexString;
}

function handleParticles() {
    for (let i = 0; i < particleNum; i++) {
        particleArray.push(new Particle())
    }
}

function renderParticles() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 40, Math.PI * 2, false)
    ctx.fillStyle = 'red'
    ctx.fill()
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    renderParticles();
    requestAnimationFrame(animate)
}

animate();