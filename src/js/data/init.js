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

let data = null
let genData = null
function parseData (rawData) {
  // 去掉 %O 开头的程序名
  if (rawData.startsWith("%O")) {
    const Nindex = rawData.indexOf("N")
    rawData = rawData.slice(Nindex)
  }
  // 去掉 % 的结尾字符
  if (rawData.endsWith("%")) {
    const Nindex = rawData.indexOf("%")
    rawData = rawData.slice(0, Nindex)
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

  for (let i = 0; i < data.length; i++) {
    data[i] = data[i].split(" ")
  }

  genData = new Array(data.length).fill().map(() => new Object())

  function detailFirstLine (i, j) {
    const str = data[i][j]
    const G00Index = str.indexOf("G00")
    const G90Index = str.indexOf("G90")
    const M03Index = str.indexOf("M03")
    const M08Index = str.indexOf("M08")
    const XIndex = str.indexOf("X")
    const YIndex = str.indexOf("Y")
    const ZIndex = str.indexOf("Z")
    if (G00Index !== -1) {
      genData[0]["G00"] = true
    }

    if (G90Index !== -1) {
      genData[0]["G90"] = true
    }

    if (M03Index !== -1) {
      genData[0]["M03"] = true
    }

    if (M08Index !== -1) {
      genData[0]["M08"] = true
    }

    if (XIndex !== -1) {
      genData[0]["X"] = parseInt(str.slice(XIndex + 1)) * 10
    } else {
      genData[i]["X"] = typeof genData[i]["X"] === "number" ? genData[i]["X"] : 0
    }

    if (YIndex !== -1) {
      genData[0]["Y"] = parseInt(str.slice(YIndex + 1)) * 10
    } else {
      genData[i]["Y"] = typeof genData[i]["Y"] === "number" ? genData[i]["Y"] : 0
    }

    if (ZIndex !== -1) {
      genData[0]["Z"] = parseInt(str.slice(ZIndex + 1)) * 10
    } else {
      genData[i]["Z"] = typeof genData[i]["Z"] === "number" ? genData[i]["Z"] : 0
    }
  }

  function detailNormalLine (i, j) {
    const str = data[i][j]
    // 快速定位
    const G00Index = str.indexOf("G00")
    // 直线
    const G01Index = str.indexOf("G01")
    // 顺圆
    const G02Index = str.indexOf("G02")
    // 逆圆
    const G03Index = str.indexOf("G03")
    const IIndex = str.indexOf("I")
    const JIndex = str.indexOf("J")
    // 终点XYZ
    const XIndex = str.indexOf("X")
    const YIndex = str.indexOf("Y")
    const ZIndex = str.indexOf("Z")
    // 主轴停止
    const M05Index = str.indexOf("M05")
    // 冷却液关
    const M09Index = str.indexOf("M09")
    // 程序结束
    const M30Index = str.indexOf("M30")


    if (G00Index !== -1) {
      genData[i]["G00"] = true
    }

    if (G01Index !== -1) {
      genData[i]["G01"] = true
    }

    if (G02Index !== -1) {
      genData[i]["G02"] = true
    }

    if (G03Index !== -1) {
      genData[i]["G03"] = true
    }

    if (G00Index == -1 && G01Index === -1 && G02Index === -1 && G03Index === -1) {
      if (!genData[i].hasOwnProperty("G00") && !genData[i].hasOwnProperty("G01") && !genData[i].hasOwnProperty("G02") && !genData[i].hasOwnProperty("G03")) {
        genData[i - 1].hasOwnProperty("G00") ? genData[i]["G00"] = genData[i - 1]["G00"] : ""
        genData[i - 1].hasOwnProperty("G01") ? genData[i]["G01"] = genData[i - 1]["G01"] : ""
        genData[i - 1].hasOwnProperty("G02") ? genData[i]["G02"] = genData[i - 1]["G02"] : ""
        genData[i - 1].hasOwnProperty("G03") ? genData[i]["G03"] = genData[i - 1]["G03"] : ""
      }
    }

    if (IIndex !== -1) {
      genData[i]["I"] = parseInt(str.slice(IIndex + 1)) * 10
    }
    if (JIndex !== -1) {
      genData[i]["J"] = parseInt(str.slice(JIndex + 1)) * 10
    }

    if (XIndex !== -1) {
      genData[i]["X"] = parseInt(str.slice(XIndex + 1)) * 10
    } else {
      genData[i]["X"] = typeof genData[i]["X"] === "number" ? genData[i]["X"] : genData[i - 1]["X"]
    }

    if (YIndex !== -1) {
      genData[i]["Y"] = parseInt(str.slice(YIndex + 1)) * 10
    } else {
      genData[i]["Y"] = typeof genData[i]["Y"] === "number" ? genData[i]["Y"] : genData[i - 1]["Y"]
    }

    if (ZIndex !== -1) {
      genData[i]["Z"] = parseInt(str.slice(ZIndex + 1)) * 10
    } else {
      genData[i]["Z"] = typeof genData[i]["Z"] === "number" ? genData[i]["Z"] : genData[i - 1]["Z"]
    }

    if (M05Index !== -1) {
      genData[i]["M05"] = true
    }

    if (M09Index !== -1) {
      genData[i]["M09"] = true
    }

    if (M30Index !== -1) {
      genData[i]["M30"] = true
    }
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (i === 0) {
        detailFirstLine(i, j)
        continue
      }
      detailNormalLine(i, j)
    }
  }
}

export { initData, genData }