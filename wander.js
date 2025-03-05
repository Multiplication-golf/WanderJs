class wanderer {
  constructor(x, y, wanderRadius, baseX, baseY, speed, { bound = true, frameSpeed = 2 } = {}) {
    this.x = x;
    this.y = y;
    this.wanderRadius = wanderRadius;
    this.baseX = baseX;
    this.baseY = baseY;
    this.speed = speed;
    this.targetX = x+speed*8;
    this.targetY = y+speed*8;
    this.angle = 0.1;
    this.reachedTarget = false;
    this.bound = bound;
    this.frame = 0
    this.frameSpeed = frameSpeed
  }
  #newtarget() { 
    this.angle = this.#getRandomAngle();
    this.targetX = this.baseX;
    this.targetY = this.baseY;
    this.targetX += this.wanderRadius * Math.cos(this.angle);
    this.targetY += this.wanderRadius * Math.sin(this.angle);
  }
  #getRandomAngle() {
    let min = -Math.PI;
    let max = Math.PI;
    return Math.random() * (max - min + 1) + min;
  } 
  #move() {
    this.x -= this.speed * Math.cos(this.angle);
    this.y -= this.speed * Math.sin(this.angle);
  }
  #isAtTarget() {
    this.reachedTarget =
      Math.abs(this.x - this.targetX) < this.speed * 7 &&
      Math.abs(this.y - this.targetY) < this.speed * 7;
  }
  #reAling() {
    this.angle = Math.atan2(this.y - this.targetY ,this.x - this.targetX)
  }
  think() {
    this.#isAtTarget();
    if (!this.reachedTarget) {
      this.#move();
    } else {
      this.#newtarget();
    }
    this.frame += this.frameSpeed
    if (this.frame % 4) {
      this.#reAling();
    }
  }
  returnXY() {
    return { x: this.x, y: this.y };
  }
}

loop();
