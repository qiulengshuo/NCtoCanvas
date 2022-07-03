import { setTimeoutRequest } from "../../shared.js"

function draw (ctx, curX, curY) {
  // 画路径
  ctx.lineTo(curX, curY)
  // 描画路径
  ctx.stroke()
}

// 直线插补
function runG01 (ctx, curX, curY, endX, endY, throttle, resolve) {
  const targetX = endX - curX
  const targetY = endY - curY
  const endXAbs = Math.abs(targetX)
  const endYAbs = Math.abs(targetY)
  let Fm = 0
  function step () {
    if (curX === endX && curY === endY) {
      throttle.flag = false
      resolve && resolve()
      return
    }
    // 竖线 往上往下
    if (targetX === 0 && targetY !== 0) {
      if (targetY > 0) {
        curY++
      } else {
        curY--
      }
    }
    // 横线 往左往右
    if (targetX !== 0 && targetY === 0) {
      if (targetX > 0) {
        curX++
      } else {
        curX--
      }
    }
    // 斜线 Fm >= 0 | Fm < 0
    if (targetX !== 0 && targetY !== 0) {
      if (Fm >= 0) {
        // 看X
        if (targetX > 0) {
          curX++
        } else {
          curX--
        }
        Fm -= endYAbs
      } else {
        // 看Y
        if (targetY > 0) {
          curY++
        } else {
          curY--
        }
        Fm += endXAbs
      }
    }
    draw(ctx, curX, curY)
    // 调速
    // setTimeoutRequest(step, 2000)
    window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}

export { runG01 }
