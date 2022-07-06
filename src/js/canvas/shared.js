// 创建一个返回执行 G0n 的 promise
function createPromise (fn, ctx, curX, curY, endX, endY, I, J, domObj, curZ, endZ) {
  if (I !== undefined || J !== undefined) {
    return new Promise((resolve, reject) => {
      fn(ctx, curX, curY, endX, endY, I, J, domObj, resolve)
    })
  } else if (curZ !== undefined) {
    return new Promise((resolve, reject) => {
      fn(ctx, domObj, resolve, curZ, endZ)
    })
  } else {
    return new Promise((resolve, reject) => {
      fn(ctx, curX, curY, endX, endY, domObj, resolve)
    })
  }
}

// 画线
function draw (ctx, curX, curY) {
  // 画路径
  ctx.lineTo(curX, curY)
  // 描画路径
  ctx.stroke()
}

// 修改dom
function setDom (domObj, xDir, yDir, curX, curY) {
  domObj.showXStep.innerHTML = "" + xDir
  domObj.showYStep.innerHTML = "" + yDir
  domObj.showX.innerHTML = "X: " + curX / 10
  domObj.showY.innerHTML = "Y: " + curY / 10
}

function setDomZ (domObj, curZ) {
  domObj.showZ.innerHTML = "Z: " + curZ / 10
}

function setRunAndCode (domObj, str) {
  domObj.showRun.innerHTML = "主轴: " + str
  domObj.showCold.innerHTML = "冷却液: " + str
}

function setSpeed (domObj, str) {
  domObj.showSpeed.innerHTML = "进给速度: " + str
}

// 调速
function setTimeoutRequest (step, delay) {
  function requestTime () {
    window.requestAnimationFrame(step)
  }
  setTimeout(requestTime, delay)
}

// 计算圆心
function calculateCircleCenter (curX, curY, I = 0, J = 0) {
  const centerX = curX + I
  const centerY = curY + J
  return { centerX, centerY }
}

function sleep () {
  const time = Date.now()
  while ((time + 300) >= Date.now()) { console.log(1) }
}

export {
  createPromise,
  setTimeoutRequest,
  setDom,
  setDomZ,
  setRunAndCode,
  setSpeed,
  draw,
  calculateCircleCenter,
  sleep
}