import { data } from "../data/init.js"
import { runG01 } from "./run/runG01/runG01.js"
import { createPromise } from "./shared.js"

// 节流对象
let throttle = { flag: false }

function handleExecute () {
  // 当没有数据，说明还没有处理完或者没有选择文件，直接return
  // if (data.length === 0) return

  if (throttle.flag) return
  throttle.flag = true

  const canvas = document.querySelector('#drawing')
  // 每次点击，先移除当前画布内容
  const w = canvas.width
  const h = canvas.height
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')


  // 原点设置在中心，y轴正方向向上
  ctx.translate(250, 250)
  ctx.scale(1, -1)

  // 设置线条样式
  ctx.strokeStyle = 'rgba(81, 160, 255,1)'
  ctx.lineWidth = 2
  ctx.lineCap = "round"
  ctx.lineJoin = "round"


  // 创建路径
  ctx.beginPath()
  ctx.moveTo(0, 0)

  let curX = 0
  let curY = 0
  const endX = 50
  const endY = 0
  createPromise(runG01, ctx, curX, curY, endX, endY, throttle)
  .then(() => {
    let curX1 = 50
    let curY1 = 0
    const endX1 = 50
    const endY1 = 50
    return createPromise(runG01, ctx, curX1, curY1, endX1, endY1, throttle)
  })
  .then(() => {
    let curX1 = 50
    let curY1 = 50
    const endX1 = 0
    const endY1 = 0
    return createPromise(runG01, ctx, curX1, curY1, endX1, endY1, throttle)
  })
  .then(() => {
    let curX1 = 0
    let curY1 = 0
    const endX1 = -50
    const endY1 = 50
    return createPromise(runG01, ctx, curX1, curY1, endX1, endY1, throttle)
  })
  .then(() => {
    let curX1 = -50
    let curY1 = 50
    const endX1 = 0
    const endY1 = 100
    return createPromise(runG01, ctx, curX1, curY1, endX1, endY1, throttle)
  })
  .then(() => {
    let curX1 = 0
    let curY1 = 100
    const endX1 = 50
    const endY1 = 50
    return createPromise(runG01, ctx, curX1, curY1, endX1, endY1, throttle)
  })
  .then(() => {
    let curX1 = 50
    let curY1 = 50
    const endX1 = 0
    const endY1 = 50
    return createPromise(runG01, ctx, curX1, curY1, endX1, endY1, throttle)
  })
  .then(() => {
    let curX1 = 0
    let curY1 = 50
    const endX1 = 0
    const endY1 = 0
    return createPromise(runG01, ctx, curX1, curY1, endX1, endY1, throttle)
  })
}

function bindExecute () {
  const execute = document.querySelector("#executeButton")
  execute.addEventListener("click", handleExecute)
}

export { bindExecute }