import { setDom, draw, setTimeoutRequest } from "../../shared.js"

function calculateCircleCenter (curX, curY, I = 0, J = 0) {
  const centerX = curX + I
  const centerY = curY + J
  return { centerX, centerY }
}

// 顺圆插补
function runG02 (ctx, curX, curY, endX, endY, I, J, domObj, resolve) {

  const { centerX, centerY } = calculateCircleCenter(curX, curY, I, J)

  let currentX = curX - centerX
  let currentY = curY - centerY
  let Fm = 0

  function step () {
    // 即X Y 步数都为0
    if (Math.abs(endX - curX) <= 0.1 && Math.abs(endY - curY) <= 0.1) {
      domObj.showXStep.innerHTML = "stop"
      domObj.showYStep.innerHTML = "stop"
      resolve && resolve()
      return
    }

    let xDir = "0"
    let yDir = "0"

    if (Fm >= 0) {
      if (currentX >= 0) {
        if (currentY >= 0) {
          // 第一象限
          curY--
          Fm += (-2) * Math.abs(currentY) + 1
          currentY--
          yDir = "-1"
        } else {
          // 第四象限
          curX--
          Fm += (-2) * Math.abs(currentX) + 1
          currentX--
          xDir = "-1"
        }
      } else {
        if (currentY >= 0) {
          // 第二象限
          curX++
          Fm += (-2) * Math.abs(currentX) + 1
          currentX++
          xDir = "+1"
        } else {
          // 第三象限
          curY++
          Fm += (-2) * Math.abs(currentY) + 1
          currentY++
          yDir = "+1"
        }
      }
    } else {
      if (currentX >= 0) {
        if (currentY >= 0) {
          // 第一象限
          curX++
          Fm += (2) * Math.abs(currentX) + 1
          currentX++
          xDir = "+1"
        } else {
          // 第四象限
          curY--
          Fm += (2) * Math.abs(currentY) + 1
          currentY--
          yDir = "-1"
        }
      } else {
        if (currentY >= 0) {
          // 第二象限
          curY++
          Fm += (2) * Math.abs(currentY) + 1
          currentY++
          yDir = "+1"
        } else {
          // 第三象限
          curX--
          Fm += (2) * Math.abs(currentX) + 1
          currentX--
          xDir = "-1"
        }
      }
    }
    console.log(curX, curY)
    setDom(domObj, xDir, yDir, curX, curY)
    draw(ctx, curX, curY)
    // 调速
    setTimeoutRequest(step, 15)
  }
  window.requestAnimationFrame(step)
}

export { runG02 }