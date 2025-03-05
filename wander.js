export class wanderer {
  constructor(
    x,
    y,
    wanderRadius,
    baseX,
    baseY,
    speed,
    wanderType = "straight",
    {
      bound = true,
      frameSpeed = 2,
      waitTime = { low: 0.1, high: 0.3 },
      reAlingcheckSpeed = 4,
      allowInner = true,
      minimumWanderDistance = 5, 
      arcSpeed=0.01
    } = {}
  ) {
    this.x = x;
    this.y = y;
    this.wanderRadius = wanderRadius;
    this.baseX = baseX;
    this.baseY = baseY;
    this.speed = speed;
    this.targetX = x + speed * 8;
    this.targetY = y + speed * 8;
    this.angle = 0.1;
    this.reachedTarget = false;
    this.bound = bound;
    this.frame = 0;
    this.frameSpeed = frameSpeed;
    this.waitTime = waitTime;
    this.lastTime = Date.now();
    this.locked = false;
    this.reAlingcheckSpeed = reAlingcheckSpeed;
    this.wanderType = wanderType;
    if (this.wanderType === "straight") {
      this.allowInner = allowInner;
      if (this.allowInner) {
        this.minimumWanderDistance = minimumWanderDistance;
      }
    } else if (this.wanderType === "arc") {
      this.allowInner = false;
      this.arcStartAngle = 0
      this.currentAngle = this.arcStartAngle;
      this.arcEndAngle = 1    
      this.arcSpeed = arcSpeed;
    } else {
      throw Error("wander type must be [arc] or [straight]")
    }
  }
  #newtarget() {
    this.locked = true;
    setTimeout(() => {
      this.angle = this.#getRandomAngle();
      this.targetX = this.baseX;
      this.targetY = this.baseY;
      if (!this.allowInner) {
        this.targetX += this.wanderRadius * Math.cos(this.angle);
        this.targetY += this.wanderRadius * Math.sin(this.angle);
      } else if (this.allowInner) {
        this.targetX +=
          this.#getRandom(this.minimumWanderDistance, this.wanderRadius) *
          Math.cos(this.angle);
        this.targetY +=
          this.#getRandom(this.minimumWanderDistance, this.wanderRadius) *
          Math.sin(this.angle);
      }
      if (this.wanderType === "arc") {
        this.arcEndAngle = this.angle;
      }
      this.locked = false;
    }, this.#getRandomTime());
  }
  #getRandomAngle() {
    let min = -Math.PI;
    let max = Math.PI;
    return Math.random() * (max - min + 1) + min;
  }
  #setArcStartAngle() {
    this.arcStartAngle = Math.atan2(this.baseY-this.y,this.baseX-this.x)
  }
  #getRandomTime() { 
    let min = this.waitTime.low;
    let max = this.waitTime.high;
    return (Math.random() * (max - min + 1) + min) * 1000;
  }
  #getRandom(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
  #moveAngle() {
    if (Math.abs(this.currentAngle - this.arcEndAngle) < this.arcSpeed *2) {
      this.#newtarget()
    } else if (this.currentAngle < this.arcEndAngle) {
      this.currentAngle += this.arcSpeed
    } else if (this.currentAngle > this.arcEndAngle) {
      this.currentAngle -= this.arcSpeed
    }
    console.log(this.currentAngle,this.arcEndAngle)
  }
  #move() {
    if (this.locked) return;
    if (this.wanderType === "straight") {
      this.x -= this.speed * Math.cos(this.angle);
      this.y -= this.speed * Math.sin(this.angle);
    } else if (this.wanderType === "arc") {
      this.x = this.baseX + this.wanderRadius * Math.cos(this.currentAngle);
      this.y = this.baseY + this.wanderRadius * Math.sin(this.currentAngle);
    }
  }
  #isAtTarget() {
    this.reachedTarget =
      Math.abs(this.x - this.targetX) < this.speed * 7 &&
      Math.abs(this.y - this.targetY) < this.speed * 7 &&
      !this.locked;
  }
  #reAling() {
    this.angle = Math.atan2(this.y - this.targetY, this.x - this.targetX);
  }
  think() {
    this.#isAtTarget();
    if (this.wanderType === "arc") {
      this.#moveAngle();
    }
    if (!this.reachedTarget) {
      this.#move();
    } else {
      this.#newtarget();
    }
    this.frame += this.frameSpeed;
    if (this.frame % this.reAlingcheckSpeed) {
      this.#reAling();
    }
  }
  returnXY() {
    return { x: this.x, y: this.y };
  }
}
