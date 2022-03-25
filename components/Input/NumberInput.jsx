import React, {useState} from 'react'
import { Input } from 'antd';

export default function NumberInput() {
  const [inputVal, setInputVal1] = useState('')
  const [isComposition, setIsComposition] = useState(false)

  // 更改value 值
  const changeInputValue = (e) => {
    if (!isComposition) {
      let { value } = e.target
      var len = value.split(".").length-1
      if (len > 1) {
        return
      } else if (value === '.') {
        value = '0.'
      }
      value = value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, '')
      if (value !== inputVal && value.indexOf()) {
        setInputVal1(value)
      }
    }
  }
  // 判断是否输入法输入
  const handleComposition = (ev) => {
    if (ev.type === 'compositionend') {
      setIsComposition(false)
      let isChrome = window.navigator.userAgent.indexOf('Chrome') > -1
      if (!isComposition && isChrome) {
        changeInputValue(ev)
      }
    } else {
      console.log(ev.type)
      setIsComposition(true)
    }
  }
   // 千分位转换
  const currencyPrices = (str) => {
    str = typeof str == 'number' ? String(str) : str
    str.length > 15 ? str.substr(0, 15) : str
    if (!str) return
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

  return (
    <>
      <Input
        type='text'
        onChange={changeInputValue}
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
        value={inputVal}
      ></Input>
    </>
  )
}
