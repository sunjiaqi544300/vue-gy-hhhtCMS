//***********************导出excel
// data 数据 / excelName 文件名 string  / topName 表头名称/键名
function exportData(data, topName, excelName) {
  require.ensure([], () => {
    const { export_json_to_excel } = require('@/vendor/Export2Excel')
    const tHeader = []
    for (var i = 0; i < topName.length; i++) {
      tHeader.push(topName[i].name)
    }
    const filterVal = []
    for (var i = 0; i < topName.length; i++) {
      filterVal.push(topName[i].key)
    }
    // console.log(tHeader)
    // console.log(filterVal)
    const list = data
    const dataAll = formatJson(filterVal, list)
    export_json_to_excel(tHeader, dataAll, excelName)
  })
}
function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
//************************
//************************echarts
export {
  exportData
}
