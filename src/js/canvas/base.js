import { genData } from "../data/init.js"
import { runG00 } from "./run/runG00/runG00.js"
import { runG01 } from "./run/runG01/runG01.js"
import { runG02 } from "./run/runG02orG03/runG02.js"
import { runG03 } from "./run/runG02orG03/runG03.js"
import { runZ } from "./run/runZ/runZ.js"
import { createPromise, setDomZ, setRunAndCode, setSpeed, sleep } from "./shared.js"

let domObject = null

// 节流对象
let throttle = { flag: false }

function handleExecute () {
  // 当没有数据，说明还没有处理完或者没有选择文件，直接return
  if (!genData) {
    alert("请选择文件")
    return
  }
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
  ctx.translate(225, 225)
  ctx.scale(1, -1)
  // 设置线条样式
  ctx.strokeStyle = 'rgba(81, 160, 255,1)'
  ctx.lineWidth = 2
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  // 创建路径
  ctx.beginPath()
  ctx.moveTo(0, 0)

  genData.reduce((prev, cur, index, arr) => {
    if (cur.hasOwnProperty("M03")) {
      setRunAndCode(domObject, "开")
      setSpeed(domObject, "100")
    }
    if (cur.hasOwnProperty("M05")) {
      return prev.then(() => {
        setRunAndCode(domObject, "关")
        setSpeed(domObject, "关")
        throttle.flag = false
      })
    }
    // 第一行 G00 && G90
    if (cur.hasOwnProperty("G00") && cur.hasOwnProperty("G90")) {
      const curX = 0
      const curY = 0
      const endX = cur["X"]
      const endY = cur["Y"]
      const endZ = cur["Z"]
      setDomZ(domObject, endZ)
      return prev.then(() => {
        sleep()
        return createPromise(runG00, ctx, curX, curY, endX, endY, undefined, undefined, domObject)
      })
    }
    // runZ
    if (cur["Z"] !== arr[index - 1]["Z"]) {
      const curZ = arr[index - 1] ? arr[index - 1]["Z"] : 0
      const endZ = cur["Z"]
      return prev.then(() => {
        sleep()
        return createPromise(runZ, ctx, undefined, undefined, undefined, undefined, undefined, undefined, domObject, curZ, endZ)
      })
    }
    // 中间实现G00
    if (cur.hasOwnProperty("G00")) {
      const curX = arr[index - 1]["X"]
      const curY = arr[index - 1]["Y"]
      const endX = cur["X"]
      const endY = cur["Y"]
      return prev.then(() => {
        sleep()
        return createPromise(runG00, ctx, curX, curY, endX, endY, undefined, undefined, domObject)
      })
    }
    if (cur.hasOwnProperty("G01")) {
      // runG01
      let curX = arr[index - 1]["X"]
      let curY = arr[index - 1]["Y"]
      const endX = cur["X"]
      const endY = cur["Y"]
      return prev.then(() => {
        sleep()
        return createPromise(runG01, ctx, curX, curY, endX, endY, undefined, undefined, domObject)
      })
    } else if (cur.hasOwnProperty("G02")) {
      // runG02
      let curX = arr[index - 1]["X"]
      let curY = arr[index - 1]["Y"]
      const endX = cur["X"]
      const endY = cur["Y"]
      const I = cur.hasOwnProperty("I") ? cur["I"] : 0
      const J = cur.hasOwnProperty("J") ? cur["J"] : 0
      return prev.then(() => {
        sleep()
        return createPromise(runG02, ctx, curX, curY, endX, endY, I, J, domObject)
      })
    } else if (cur.hasOwnProperty("G03")) {
      // runG03
      let curX = arr[index - 1]["X"]
      let curY = arr[index - 1]["Y"]
      const endX = cur["X"]
      const endY = cur["Y"]
      const I = cur.hasOwnProperty("I") ? cur["I"] : 0
      const J = cur.hasOwnProperty("J") ? cur["J"] : 0
      return prev.then(() => {
        sleep()
        return createPromise(runG03, ctx, curX, curY, endX, endY, I, J, domObject)
      })
    }
  }, Promise.resolve())
}

function bindExecute (domObj) {
  const execute = document.querySelector("#executeButton")
  execute.addEventListener("click", handleExecute)
  domObject = domObj
}

export { bindExecute }