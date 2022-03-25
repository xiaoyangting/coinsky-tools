import React, { createRef, useEffect, useState } from 'react'

export default function NumberInput(props) {
  const inputRef = createRef()
  const { value, onChangeInput, currencytype} = props
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
        value: parseInt(iValue)
      })
    }
  }
  // 初始化input的值
  const setInput = () => {
    inputRef.current.value = iValue
  }
  useEffect(() => {
    console.log('更新')
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
   // 千分位转换
  // const currencyPrices = (str) => {
  //   str = typeof str == 'number' ? String(str) : str
  //   str.length > 15 ? str.substr(0, 15) : str
  //   if (!str) return
  //   // 判断是否有小数掉
  //   if (str.indexOf('.') !== -1) {
  //     // 小数点出现的位置
  //     var strInterception = str.indexOf(".")
  //     // 截取小数点前部分数据
  //     var start = str.substr(0, strInterception)
  //     // 截取小数点后部分数据
  //     var end = str.substr(strInterception, str.length)
  //     return parseFloat(start).toLocaleString("en-US") + end
  //   } else {
  //     return parseFloat(str).toLocaleString("en-US")
  //   }
  // }

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


// class NumberInput extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       value1: ''
//     }
//     this.handleChange1 = this.handleChange1.bind(this)
//     this.handleChange2 = this.handleChange2.bind(this)
//     this.handleComposition = this.handleComposition.bind(this)
//   }
//   static isComposition = false

//   handleChange1 = ev => {
//     this.setState({
//       value1: ev.target.value,
//     })
//   }

//   handleChange2 = ev => {
//     // 未使用输入法或使用输入法完毕才能触发
//     console.log(this.isComposition)
//     if (!this.isComposition) {
//       this.setState({
//         value2: ev.target.value,
//       })
//     }
//   }

//   handleComposition(ev) {
//     if (ev.type === 'compositionend') {
//       const isChrome = navigator.userAgent.indexOf('Chrome') > -1
//       this.setState({
//         isComposition: false
//       })
//       isComposition= false
//       if (!isComposition && isChrome) {
//         this.handleChange2(ev)
//       }
//     } else {
//       isComposition = true
//     }
//   }

//   render() {
//     return (
//       <div>
//         <Input
//           type='text'
//           onChange={this.handleChange2}
//           onCompositionStart={this.handleComposition}
//           onCompositionEnd={this.handleComposition}
//           placeholder='使用了composition的input框'
//         />
//       </div>
//     )
//   }
// }

// export default NumberInput