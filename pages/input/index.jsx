import React, { Component } from 'react'

let isComposition = false

class TestComposition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value1: '',
      value2: '',
    }
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleComposition = this.handleComposition.bind(this)
  }

  handleChange1 = ev => {
    this.setState({
      value1: ev.target.value,
    })
  }

  handleChange2 = ev => {
    // 未使用输入法或使用输入法完毕才能触发
    console.log(isComposition)
    if (!isComposition) {
      this.setState({
        value2: ev.target.value,
      })
    }
  }

  handleComposition(ev) {
    if (ev.type === 'compositionend') {
      const isChrome = navigator.userAgent.indexOf('Chrome') > -1
      isComposition = false
      if (!isComposition && isChrome) {
        this.handleChange2(ev)
      }
    } else {
      isComposition = true
    }
  }

  render() {
    return (
      <div>
        <input type='text' onChange={this.handleChange1} />
        <span>{this.state.value1}</span>
        <input
          type='text'
          onChange={this.handleChange2}
          onCompositionStart={this.handleComposition}
          onCompositionEnd={this.handleComposition}
          placeholder='使用了composition的input框'
        />
        <span>{this.state.value2}</span>
      </div>
    )
  }
}

export default TestComposition
