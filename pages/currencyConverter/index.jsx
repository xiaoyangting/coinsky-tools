import Head from 'next/head'
import { createRef, useEffect, useState } from 'react';
import { Select } from 'antd';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PageTitle, { SmallToolsTitle } from '../../components/ToolsTitle'
import NumberInput from '../../components/Input/NumberInput'
import Image from '../../components/Image'

import styles from "./currencyConverter.module.scss";
import Request from '../../utils/fetch';

const { Option } = Select;

export default function CurrencyConverter({ currencyConvertList }) {
  const [currencyData, setCurrencyData] = useState(currencyConvertList.items)
  const [presentCurrency, setPresentCurrency] = useState({
    type: 0,
    value: 0,
    ...currencyData[1]
  })
  const [targetCurrency, setTargetCurrency] = useState({
    type: 1,
    value: 0,
    ...currencyData[0]
  })

  // Calculation of transformation
  const onChangeInput = (inputObj, selectObj) => { // Determine whether the event is coming from the input field or from the Select field  
    const { value, type } = inputObj
    if (type) { // Is 1 to calculate the current currency
      setTargetCurrency({...targetCurrency, ...selectObj, value})
      setPresentCurrency((presentCurrency) => {
        var strArr = value.split(",")
        var newValue = strArr.join('')
        var price = selectObj?.price ? selectObj.price : targetCurrency.price
        return {
          ...presentCurrency,
          // value: (parseFloat(newValue) * targetCurrency.price) / presentCurrency.price
          value: (parseFloat(newValue) * price) / presentCurrency.price
        }
      })
    } else { // 0 calculates the target currency
      setPresentCurrency({ ...presentCurrency, ...selectObj, value })
      setTargetCurrency((targetCurrency) => {
        var strArr = value.split(",")
        var newValue = strArr.join('')
        var price = selectObj?.price ? selectObj.price : presentCurrency.price
        return {
          ...targetCurrency,
          // value: (parseFloat(newValue) * presentCurrency.price) / targetCurrency.price
          value: (parseFloat(newValue) * price) / targetCurrency.price
        }
      })
    }
  }
  // Change the selected currency
  const onChangeSelect = (SelectObj) => {
    let inputObj = {
      type: SelectObj.type,
      value: SelectObj.type ? targetCurrency.value : presentCurrency.value
    }
    inputObj.value = inputObj.value + ''
    onChangeInput(inputObj, SelectObj)
  }

  // Reset input
  const reset = () => {
    setPresentCurrency({...presentCurrency, value: 0})
    setTargetCurrency({...targetCurrency, value: 0})
  }
  return (
    <>
      
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={`${styles.currency_converter_page} page_tools_bj`} >
        
        <Header />
        {/* 页面内容 */}
        <div className="currency_converter_content">
          <PageTitle title="Wallet Authorisation Search" />

          <div className="currency_converter_box">
            {/* 小标题 与 重置按钮 */}
            <div className="currency_converter_box_title_reset_btn">
              <SmallToolsTitle title="Data provided by coinsky，2022/02/25 Update" />
              <div className="reset_btn" onClick={ reset }>
                <Image src="/svg/reset.svg" width={12} height={12} alt="CoinSky"></Image>
                <span>Refresh</span>
              </div>
            </div>
            {/* 货币计算结果 */}
            <div className="currency_text">
              <span className='currency_num' style={{ marginLeft: '0' }}>{ presentCurrency.value }</span>
              <span className='currency_type'>{ presentCurrency.fullname } ({ presentCurrency.name })</span>
              <span>=</span>
              <span className='currency_num'>{ targetCurrency.value }</span>
              <span className='currency_type'>{ targetCurrency.fullname } ({ targetCurrency.name })</span>
            </div>
            {/* 货币选择器 */}
            <div className="converter_box">
              <ConverterRow
                currencyData={currencyData}
                currencytype={presentCurrency}
                onChangeInput={onChangeInput}
                onChangeSelect={onChangeSelect}
              >
                <NumberInput onChangeInput={onChangeInput} currencytype={presentCurrency} />
              </ConverterRow>
              <ConverterRow
                currencyData={currencyData}
                currencytype={targetCurrency}
                onChangeInput={onChangeInput}
                onChangeSelect={onChangeSelect}
                style={{ marginTop: '2.75rem' }}
              >
                  <NumberInput onChangeInput={onChangeInput} currencytype={targetCurrency} />
              </ConverterRow>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

var timer = null
// Currency selector and input box module
function ConverterRow(props) {
  const { children, style, currencyData, onChangeSelect, currencytype } = props
  const selectRef = createRef()
  const [currencyListDat, setCurrencyListDat] = useState([...currencyData])
  const OptionStyle = {
    height: '46px',
    // backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center'
  }
  // 选中事件
  const onChange = (value, {item}) => {
    selectRef.current.blur()
    onChangeSelect({
      type: currencytype.type,
      ...item
    })
    setTimeout(() => {
      setCurrencyListDat([...currencyData])
    }, 0);
    // console.log(`selected ${value}`);
  }

  const [search, setSearch] = useState('')
    // 请求货币列表参数
  const [page_size, setPage_size] = useState(20)
  const [page_no, setPage_no] = useState(1)
  const [total, setTotal] = useState(0)
  const [isSearchLoader, setIsSearchLoader] = useState(false)
  const onSearch = (val) => {
    clearTimeout(timer);
    setSearch(val)
    setIsSearchLoader(false)
    timer = setTimeout(() => {
      var params = {
        name: val
      }
      setIsSearchLoader(true)
      setPage_no(0)
      getCurrencyConvertList(params)
    }, 1300)
  }
  
  const getCurrencyConvertList = async (params, isPush) => {
    if (page_no * page_size >= total && total != 0) return
    const res = await Request('/currencyList.json', {
      body: {
        page_no: page_no,
        page_size,
        ...params
      }
    })
    // 计算法币 美元兑换率
    var currencyList = res.items.map((item) => {
      if (parseInt(item.is_currency) === 1) {
        item.price = 1 / item.price
      }
      return item
    })

    // 判断是否加载多
    if (!isPush) { // 不是 则覆盖
      setCurrencyListDat(currencyList)
    } else {
      // 是 则合并
      setCurrencyListDat([...currencyListDat, ...currencyList])
    }
    setPage_no((page_no) => ++page_no)
    setTotal(res.paging.total)
    setIsSearchLoader(false)
    setScrollBottomValve(false)
  }


  const [scrollBottomValve, setScrollBottomValve] = useState(false)
  // 滚动监听
  const scrollChange = (e) => {
    console.log('滚动', search);
    const { target } = e;
    if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 100) {
      var params = {
      }
      if (search) {
        params.name = search
      } else {
        // page_no = 0
        // setPage_size(0)
        return
      }
      if (!scrollBottomValve) {
        console.log('请求');
        console.log('请求前', page_no);
        console.log('请求前', currencyListDat)
        // scrollBottomValve = true
        setScrollBottomValve(true)
        getCurrencyConvertList(params, true)
      }
    }
  }

  return (
    <>
      <div className="converter_row" style={style}>
        <Select
          ref={selectRef}
          value={currencytype.coin_id}
          className='converter_Select'
          showSearch
          // defaultOpen
          loading={isSearchLoader}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange} // 选中监听
          onSearch={onSearch} // 输入监听
          onPopupScroll={scrollChange} // 滚动监听
          filterOption={false}
        >
          {
            currencyListDat.map((item, index) => {
              return (
                <Option
                  style={OptionStyle}
                  value={item.coin_id}
                  key={`${item.currency_code}${index}`}
                  item={item}
                >
                  <div className={styles.converter_Select_Option}>
                    <Image src={item.icon} width={16} height={16} alt="" />

                    <div className="converter_row_left_text">
                      <span className='currency_name'>{item.fullname}</span>
                      <span>({item.name})</span>
                    </div>
                  </div>
                </Option>
              )
            })
          }
        </Select>
        <div className="converter_input">
          {children}
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps(context) {
  const currencyConvertList = await Request('/currencyList.json', {
    body: {
      page_no: 1,
      page_size: 20
    }
  })
  currencyConvertList.items[0].coin_id = currencyConvertList.items[0].currency_code
  // currencyConvertList.items[0].price = 1

  return {
    props: {
      currencyConvertList
    }
  }
}