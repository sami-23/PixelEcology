document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('ecosystemCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize canvas when window size changes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const numCreatures = 500;
    const creatures = [];

    class Creature {
        constructor(x, y, dx, dy, color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.color = color;
        }

        move() {
            this.x += this.dx;
            this.y += this.dy;

            // Clamp position and reflect direction to prevent tunneling
            if (this.x < 0) {
                this.x = 0;
                this.dx = Math.abs(this.dx);
            } else if (this.x > canvas.width - 5) {
                this.x = canvas.width - 5;
                this.dx = -Math.abs(this.dx);
            }

            if (this.y < 0) {
                this.y = 0;
                this.dy = Math.abs(this.dy);
            } else if (this.y > canvas.height - 5) {
                this.y = canvas.height - 5;
                this.dy = -Math.abs(this.dy);
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, 5, 5);
        }
    }

    function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    function initializeCreatures() {
        for (let i = 0; i < numCreatures; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const dx = (Math.random() - 0.5) * 2;
            const dy = (Math.random() - 0.5) * 2;
            const color = randomColor();
            creatures.push(new Creature(x, y, dx, dy, color));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        creatures.forEach(creature => {
            creature.move();
            creature.draw();
        });
        requestAnimationFrame(animate);
    }

    initializeCreatures();
    animate();
});