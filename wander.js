export class wanderer {
  constructor (x,y,wanderRadius,baseX,baseY,speed) {
    this.x = x
    this.y = y
    this.wanderRadius = wanderRadius
    this.baseX = baseX
    this.baseY = baseY
    this.speed = speed
    this.targetX = x
    this.targetY = y
    this.angle = 0.1;
  }
  #newtarget() {
    this.angle = this.getRandomAngle();
    this.targetX = this.baseX
    this.targetY = this.baseY
    this.targetX += wanderRadius * Math.cos(this.angle)
    this.targetY += wanderRadius * Math.sin(this.angle)
  }
  #getRandomAngle() {
    let min = 0;
    let max = Math.pi;
    return (Math.random() * (max - min + 1) + min);
  }
}
