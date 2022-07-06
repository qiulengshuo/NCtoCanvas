import { setTimeoutRequest, setDomZ } from "../../shared.js"

// Z 的变换
function runZ (ctx, domObj, resolve, curZ, endZ) {
  const dir = endZ - curZ >= 0 ? "+" : "-"
  function step () {
    // 到达
    if (curZ === endZ) {
      resolve && resolve()
      return
    }
    if (dir === "+") {
      curZ++
    } else {
      curZ--
    }
    setDomZ(domObj, curZ)
    // 调速
    // setTimeoutRequest(step, 10)
    window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}

export { runZ }
