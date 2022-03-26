// 千分位转换
export const currencyPrices = (str) => {
  str = typeof str == 'number' ? String(str) : str
  str.length > 15 ? str.substr(0, 15) : str
  if (!str) return
  var strArr = str.split(",")
  str = strArr.join('')
  // 判断是否有小数掉
  if (str.indexOf('.') !== -1) {
    // 小数点出现的位置
    var strInterception = str.indexOf(".")
    // 截取小数点前部分数据
    var start = str.substr(0, strInterception)
    // 截取小数点后部分数据
    var end = str.substr(strInterception, str.length)
    return parseFloat(start).toLocaleString("en-US") + end
  } else {
    return parseFloat(str).toLocaleString("en-US")
  }
}
