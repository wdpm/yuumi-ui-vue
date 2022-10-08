import { VNode } from "vue"

export function updateTableCellSize(tableBody: any, tableHead: any, tableFoot?: any) {
  const bodyCols = tableBody.$el.querySelectorAll("colgroup col")
  const headCols = tableHead.$el.querySelectorAll("colgroup col")
  const footCols = tableFoot ? tableFoot.$el.querySelectorAll("colgroup col") : []

  const itemsWidth = []
  let itemTotalWidth = 0
  for (let i = 0; i < bodyCols.length; i++) {
    const itemWidth = bodyCols[i].offsetWidth
    itemsWidth.push(itemWidth)
    itemTotalWidth += itemWidth
  }

  itemsWidth.forEach((width, i) => {
    headCols[i].setAttribute("width", `${width / itemTotalWidth * 100}%`)
    if (footCols[i]) {
      footCols[i].setAttribute("width", `${width / itemTotalWidth * 100}%`)
    }
  })
}

export function updateTableWidth(tableBody: any, tableHead: any, tableFoot?: any, scrollbarWidth = 0) {
  tableHead.$el.querySelector("table").style.width = `${tableBody.$el.querySelector("table").clientWidth + scrollbarWidth }px`

  if (tableFoot) {
    tableFoot.$el.querySelector("table").style.width = `${tableBody.$el.querySelector("table").clientWidth + + scrollbarWidth}px`
  }
}

export function updateTableWrapperSize(tableWrapper: HTMLElement, tableBody: any, tableHead: any, tableFoot?: any) {
  const wrapperHeight = tableWrapper.clientHeight
  const tableHeadHeight = tableHead.$el.offsetHeight
  const tableFootHeight = tableFoot ? tableFoot.$el.offsetHeight : 0
  tableBody.$el.style.maxHeight = `${wrapperHeight - tableHeadHeight - tableFootHeight}px`
}