export default function getShowDom () {
  const showX = document.querySelector("#X")
  const showY = document.querySelector("#Y")
  const showZ = document.querySelector("#Z")
  const showXStep = document.querySelector("#xStepContent")
  const showYStep = document.querySelector("#yStepContent")
  const showRun = document.querySelector("#run")
  const showCold = document.querySelector("#cold")
  const showSpeed = document.querySelector("#speed")

  return {
    showX,
    showY,
    showZ,
    showXStep,
    showYStep,
    showRun,
    showCold,
    showSpeed
  }
}