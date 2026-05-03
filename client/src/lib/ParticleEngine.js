export default class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.animationFrame = null;
    this.isRunning = false;
    this.maxParticles = 120;
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  addParticle(x, y) {
    if (this.particles.length >= this.maxParticles) {
      this.particles.shift();
    }

    this.particles.push({
      x,
      y,
      size: 2 + Math.random() * 3,
      alpha: 1,
      driftX: (Math.random() - 0.5) * 0.7,
      driftY: (Math.random() - 0.5) * 0.7,
    });
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((p) => {
      p.alpha -= 0.02;
      p.x += p.driftX;
      p.y += p.driftY;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = "#b8a4ff";
      this.ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    this.ctx.globalAlpha = 1;
    this.particles = this.particles.filter((p) => p.alpha > 0);
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}
