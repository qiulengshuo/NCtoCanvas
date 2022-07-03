function createPromise (fn, ctx, curX, curY, endX, endY, throttle) {
  return new Promise((resolve, reject) => {
    fn(ctx, curX, curY, endX, endY, throttle, resolve)
  })
}

// 调速
function setTimeoutRequest (step, delay) {
  function requestTime () {
    window.requestAnimationFrame(step)
  }
  setTimeout(requestTime, delay)
}

export { createPromise, setTimeoutRequest }