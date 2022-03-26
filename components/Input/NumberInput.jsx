import React, { createRef, useEffect } from 'react'
import { currencyPrices } from '../../utils/number';

export default function NumberInput(props) {
  const inputRef = createRef()
  const { onChangeInput, currencytype } = props
  var iValue = currencytype.value
  let isComposition = false

  // 更改value 值
  const changeInputValue = (e) => {
    if (!isComposition) {
      let { value } = e.target
      var len = value.split(".").length - 1
      if (len > 1) {
        inputRef.current.value = iValue
        return
      } else if (value === '.' ) {
        value = '0.'
      }
      value = value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, '')
      iValue = value
      e.target.value = iValue
      iValue !== '' && onChangeInput({
        currencytype,
        value: iValue
      })
    }
  }
  // 初始化input的值
  const setInput = () => {
    inputRef.current.value = currencyPrices(iValue)
  }
  useEffect(() => {
    setInput()
  })
  // 判断是否输入法输入
  const handleComposition = (ev) => {
    console.log(ev.type)
    if (ev.type === 'compositionend') {
      isComposition = false
      let isChrome = window.navigator.userAgent.indexOf('Chrome') > -1
      if (!isComposition && isChrome) {
        changeInputValue(ev)
      }
    } else {
      isComposition = true
    }
  }

  return (
    <>
      <input
        className='ant-input'
        type='text'
        ref={ inputRef }
        onChange={changeInputValue}
        // onCompositionStart={handleComposition}
        // onCompositionEnd={handleComposition}
      ></input>
    </>
  )
}
