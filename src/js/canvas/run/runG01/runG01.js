import { setTimeoutRequest, draw, setDom } from "../../shared.js"

// 直线插补
function runG01 (ctx, curX, curY, endX, endY, domObj, resolve) {
  const targetX = endX - curX
  const targetY = endY - curY
  const endXAbs = Math.abs(targetX)
  const endYAbs = Math.abs(targetY)
  let Fm = 0
  function step () {
    // 即X Y 步数都为0
    if (((endX - curX) === 0) && ((endY - curY) === 0)) {
      domObj.showXStep.innerHTML = "stop"
      domObj.showYStep.innerHTML = "stop"
      resolve && resolve()
      return
    }
    let xDir = "0"
    let yDir = "0"
    // 竖线 往上往下
    if (targetX === 0 && targetY !== 0) {
      if (targetY > 0) {
        curY++
        yDir = "+1"
      } else {
        curY--
        yDir = "-1"
      }
    }
    // 横线 往左往右
    if (targetX !== 0 && targetY === 0) {
      if (targetX > 0) {
        curX++
        xDir = "+1"
      } else {
        curX--
        xDir = "-1"
      }
    }
    // 斜线 Fm >= 0 | Fm < 0
    if (targetX !== 0 && targetY !== 0) {
      if (Fm >= 0) {
        // 看X
        if (targetX > 0) {
          curX++
          xDir = "+1"
        } else {
          curX--
          xDir = "-1"
        }
        Fm -= endYAbs
      } else {
        // 看Y
        if (targetY > 0) {
          curY++
          yDir = "+1"
        } else {
          curY--
          yDir = "-1"
        }
        Fm += endXAbs
      }
    }

    setDom(domObj, xDir, yDir, curX, curY)
    draw(ctx, curX, curY)

    // 调速
    setTimeoutRequest(step, 10)
  }
  window.requestAnimationFrame(step)
}

export { runG01 }
