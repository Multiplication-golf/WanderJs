export class wanderer {
  constructor (x,y,wanderRadius,baseX,baseY,speed, {bound = true} = {}) {
    this.x = x
    this.y = y
    this.wanderRadius = wanderRadius
    this.baseX = baseX
    this.baseY = baseY
    this.speed = speed
    this.targetX = x
    this.targetY = y
    this.angle = 0.1;
    this.reachedTarget = false;
    this.bound = bound
  }
  #newtarget() {
    this.angle = this.getRandomAngle();
    this.targetX = this.baseX
    this.targetY = this.baseY
    this.targetX += wanderRadius * Math.cos(this.angle)
    this.targetY += wanderRadius * Math.sin(this.angle)
  }
  #getRandomAngle() {
    let min = -Math.pi;
    let max = Math.pi;
    return (Math.random() * (max - min + 1) + min);
  }
  #move() {
    this.x += speed * Math.cos(this.angle)
    this.y += speed * Math.sin(this.angle)
  }
  #isAtTarget() {
    this.reachedTarget = (Math.abs(this.x-this.targetX) < this.speed*2 && Math.abs(this.y-this.targetY) < this.speed*2)
  }
  think() {
    this.isAtTarget();
    if (!this.reachedTarget) {
      this.move();
    } else {
      this.newtarget()
    }
  }
}
