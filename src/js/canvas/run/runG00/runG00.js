import { setTimeoutRequest, draw, setDom } from "../../shared.js"
function runG00 (ctx, curX, curY, endX, endY, domObj, resolve) {
  const xDir = "MAX"
  const yDir = "MAX"

  // 画 G00 的线
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  let rate = 0
  let flag = "X"

  if (endY - curY >= endX - curX) {
    const num = endY - curY
    rate = (endX - curX) / num
    flag = "X"
  } else {
    const num = endX - curX
    rate = (endY - curY) / num
    flag = "Y"
  }

  function step () {
    // 到达
    if (curX === endX && curY === endY) {
      domObj.showXStep.innerHTML = "stop"
      domObj.showYStep.innerHTML = "stop"
      resolve && resolve()
      ctx.beginPath()

      // 画 其它 线
      ctx.strokeStyle = 'rgba(81, 160, 255,1)'
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      return
    }

    if (flag === "X") {
      curX = curX + rate
      curY++
    } else {
      curY = curY + rate
      curX++
    }

    setDom(domObj, xDir, yDir, curX, curY)
    draw(ctx, curX, curY)

    // 调速
    setTimeoutRequest(step, 10)
  }
  window.requestAnimationFrame(step)
}

export { runG00 }
