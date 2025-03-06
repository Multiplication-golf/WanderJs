// over 40% faster do to slow property calls
// works just like the old one on the surface level
function newtarget(instancevars) {
  instancevars.locked = true;
  if (!instancevars.crissCross) {
    getTarget(instancevars)
  }
  console.log(instancevars.randomCrossInterval())
  if (instancevars.crissCross) {
    if (instancevars.randomCrossInterval()) {
      instancevars.locked = true
      instancevars.targetX = instancevars.baseX;
      instancevars.targetY = instancevars.baseY;
      instancevars.targetX +=
        instancevars.wanderRadius * Math.cos(instancevars.angle);
      instancevars.targetY +=
        instancevars.wanderRadius * Math.sin(instancevars.angle);
      while (!instancevars.reachedTarget) {
        if (instancevars.reachedTarget) {
          instancevars.locked = false;
        }
        isAtTarget(instancevars);
        movestraight(instancevars)
      }
    } else {
      getTarget(instancevars)
    }
  }
}
function getTarget(instancevars) {
  setTimeout(() => {
    instancevars.angle = getRandomAngle(instancevars);
    instancevars.targetX = instancevars.baseX;
    instancevars.targetY = instancevars.baseY;
    if (!instancevars.allowInner) {
      instancevars.targetX +=
        instancevars.wanderRadius * Math.cos(instancevars.angle);
      instancevars.targetY +=
        instancevars.wanderRadius * Math.sin(instancevars.angle);
    } else if (instancevars.allowInner) {
      instancevars.targetX +=
        getRandom(
          instancevars.minimumWanderDistance,
          instancevars.wanderRadius
        ) * Math.cos(instancevars.angle);
      instancevars.targetY +=
        getRandom(
          instancevars.minimumWanderDistance,
          instancevars.wanderRadius
        ) * Math.sin(instancevars.angle);
    }
    if (instancevars.wanderType === "arc") {
      instancevars.arcEndAngle = instancevars.angle;
    }
    instancevars.locked = false;
  }, getRandomTime(instancevars));
}
function getRandomAngle(instancevars) {
  if (instancevars.wanderType === "straight") {
    let min = -Math.PI;
    let max = Math.PI;
    return Math.random() * (max - min + 1) + min;
  } else if (instancevars.wanderType === "arc") {
    var plusminusangle = getRandom(
      instancevars.AngleDiffrence,
      Math.PI - (Math.PI % instancevars.angle),
      instancevars
    );
    if (instancevars.Direction === "positive") {
      plusminusangle = Math.abs(plusminusangle);
      instancevars.arcEndAngle = instancevars.angle + plusminusangle;
      return instancevars.angle + plusminusangle;
    }
    if (instancevars.Direction === "negative") {
      plusminusangle = Math.abs(plusminusangle);
      instancevars.arcEndAngle = instancevars.angle + plusminusangle;
      return instancevars.angle + plusminusangle;
    }
    if (instancevars.Direction === "neutral") {
      return instancevars.angle + plusminusangle;
    }
  }
}
function setArcStartAngle(instancevars) {
  instancevars.arcStartAngle = Math.atan2(
    instancevars.baseY - y,
    instancevars.baseX - x
  );
}
function getRandomTime(instancevars) {
  let min = instancevars.waitTime.low;
  let max = instancevars.waitTime.high;
  return (Math.random() * (max - min + 1) + min) * 1000;
}
function getRandom(min, max, instancevars) {
  return Math.random() * (max - min + 1) + min;
}
function moveAngle(instancevars) {
  if (instancevars.locked) return;
  if (
    Math.abs(instancevars.currentAngle - instancevars.arcEndAngle) <
    instancevars.arcSpeed * 1.01
  ) {
    newtarget(instancevars);
  } else if (instancevars.currentAngle < instancevars.arcEndAngle) {
    instancevars.currentAngle += instancevars.arcSpeed;
  } else if (instancevars.currentAngle > instancevars.arcEndAngle) {
    instancevars.currentAngle -= instancevars.arcSpeed;
  }
}
function move(instancevars) {
  if (instancevars.locked) return;
  if (instancevars.wanderType === "straight") {
    instancevars.x -= instancevars.speed * Math.cos(instancevars.angle);
    instancevars.y -= instancevars.speed * Math.sin(instancevars.angle);
  } else if (instancevars.wanderType === "arc") {
    instancevars.x =
      instancevars.baseX +
      instancevars.wanderRadius * Math.cos(instancevars.currentAngle);
    instancevars.y =
      instancevars.baseY +
      instancevars.wanderRadius * Math.sin(instancevars.currentAngle);
  }
}
function movestraight(instancevars) {
  if (!instancevars.locked) return;
  instancevars.x -= instancevars.speed * Math.cos(instancevars.angle);
  instancevars.y -= instancevars.speed * Math.sin(instancevars.angle);
}
function isAtTarget(instancevars) {
  instancevars.reachedTarget =
    Math.abs(instancevars.x - instancevars.targetX) < instancevars.speed * 7 &&
    Math.abs(instancevars.y - instancevars.targetY) < instancevars.speed * 7 &&
    !instancevars.locked;
}
function reAling(instancevars) {
  instancevars.angle = Math.atan2(
    instancevars.y - instancevars.targetY,
    instancevars.x - instancevars.targetX
  );
}
function getRandomRole(end,start) {
  console.log(Math.floor(getRandom(end,start)))
  return (Math.floor(getRandom(end,start)) === 1)
}

function wanderer(
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
    arcSpeed = 0.01,
    AngleDiffrence = 50,
    Direction = "positive",
    crissCross=false,
    randomCrossInterval=getRandomRole(0,3)
  } = {}
) {
  var instancevars = {randomCrossInterval:() => {return getRandomRole(0,3)}};
  instancevars.x = x;
  instancevars.y = y;
  instancevars.wanderRadius = wanderRadius;
  instancevars.baseX = baseX;
  instancevars.baseY = baseY;
  instancevars.speed = speed;
  instancevars.targetX = x + speed * 8;
  instancevars.targetY = y + speed * 8;
  instancevars.angle = 0.1;
  instancevars.reachedTarget = false;
  instancevars.bound = bound;
  instancevars.frame = 0;
  instancevars.frameSpeed = frameSpeed;
  instancevars.waitTime = waitTime;
  instancevars.lastTime = Date.now();
  instancevars.locked = false;
  instancevars.reAlingcheckSpeed = reAlingcheckSpeed;
  instancevars.wanderType = wanderType;
  instancevars.crissCross = crissCross;
  if (instancevars.wanderType === "straight") {
    instancevars.allowInner = allowInner;
    if (instancevars.allowInner) {
      instancevars.minimumWanderDistance = minimumWanderDistance;
    }
  } else if (instancevars.wanderType === "arc") {
    instancevars.allowInner = false;
    instancevars.arcStartAngle = 0;
    instancevars.currentAngle = instancevars.arcStartAngle;
    instancevars.arcEndAngle = 1;
    instancevars.arcSpeed = arcSpeed;
    instancevars.AngleDiffrence = AngleDiffrence * (Math.PI / 180);
    instancevars.Direction = Direction;
  } else {
    throw Error("wander type must be [arc] or [straight]");
  }
  console.log(instancevars)
  this.think = function () {
    isAtTarget(instancevars);
    if (instancevars.wanderType === "arc") {
      moveAngle(instancevars);
    }
    move(instancevars);
    if (instancevars.reachedTarget) {
      newtarget(instancevars);
    }
    instancevars.frame += instancevars.frameSpeed;
    if (
      instancevars.frame % instancevars.reAlingcheckSpeed &&
      instancevars.wanderType !== "arc"
    ) {
      reAling(instancevars);
    }
  };
  this.returnXY = function () {
    return { x: instancevars.x, y: instancevars.y };
  };
}
