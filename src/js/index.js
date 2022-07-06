import { initData } from "./data/init.js"
import { bindExecute } from "./canvas/base.js"
import getShowDom from "./dom/getDom.js"

const domObj = getShowDom()
initData()
bindExecute(domObj)
