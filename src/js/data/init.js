function initData () {
  const textarea = document.querySelector("#txt")
  const input = document.querySelector("#input")
  input.addEventListener("change", function (e) {
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsText(file, 'utf-8')
    fileReader.onload = function () {
      textarea.value = fileReader.result
      const rawData = fileReader.result
      parseData(rawData)
    }
  })
}
// %O289
// N01 G00 G90 X10 Y20 M03 M08
// N02 Z50
// N03 Z10
// N04 G01 Z-1
// N05 Y15
// N06 G02 X15 Y10 R5
// N07 X20 Y15 R5
// N08 G01 Y20
// N09 X10
// N10 G00 Z50
// N11 M05 M09
// N12 M30
// %
let data = null
function parseData (rawData) {
  // 去掉 %O 开头的程序名
  if (rawData.startsWith("%O")) {
    const Nindex = rawData.indexOf("N")
    rawData = rawData.slice(Nindex)
    console.log(rawData)
  }
  // 去掉 % 的结尾字符
  if (rawData.endsWith("%")) {
    const Nindex = rawData.indexOf("%")
    rawData = rawData.slice(0, Nindex)
    console.log(rawData)
  }
  // 去掉两端空格
  rawData = rawData.trim()
  // 用 回车 + 换行 来分割每一行代码
  data = rawData.split("\r\n")
  // 去掉每行的 N 开头字段
  for (let i = 0; i < data.length; i++) {
    const spaceIndex = data[i].indexOf(" ")
    data[i] = data[i].slice(spaceIndex + 1)
  }
  console.log(data)
}

export { initData, data }