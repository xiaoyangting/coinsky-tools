import { Table, Tabs } from 'antd'
import { useState } from 'react'
import Image from '../../components/Image'
import Londing from '../../components/Londing'
import Head from 'next/head'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ToolsTitle from '../../components/ToolsTitle'

import style from './index.module.scss'
import Request from '../../utils/fetch'

export default function StableFinancial({ stableFinancialSetting, stableFinancialList }) {

  const { TabPane } = Tabs;
  const [tabs] = useState([...stableFinancialSetting])
  const columns = [
    {
      width: '210px',
      title: 'Popular Coins',
      dataIndex: 'symbol',
      className: 'popular_coins',
      render: (symbol, item) => (
        <>
          <Image src={item.icon} width={20} height={20} alt="" />
          <a>{symbol}</a>
        </>
      )
    },
    {
      width: '240px',
      title: 'New Platform',
      dataIndex: 'exchange',
    },
    {
      width: '240px',
      title: 'Annual yield',
      dataIndex: 'annual_rate',
      sorter: {
        compare: (a, b) => a.annual_rate - b.annual_rate,
      },
      render: annual_rate => (
        <span className={annual_rate > 0 ? 'rise' : 'fall'}>
          {annual_rate ? `${annual_rate}%` : '-'}
        </span>
      )
    },
    {
      width: '220px',
      title: 'Deadline',
      dataIndex: 'number_day',
      sorter: {
        compare: (a, b) => a.number_day - b.number_day,
      },
      render: number_day => (
        <span>{ number_day } days</span>
      )
    },
    // {
    //   title: '',
    //   width: '190px',
    //   dataIndex: 'eamings',
    //   className: 'eamings'
    // },
  ];
  const [data, setData] = useState([...stableFinancialList])

  const [isLonding, setIsLonding] = useState(false)
  const callback = async (key) => {
    setIsLonding(true)
    var dataList = await Request('/stableFinancialList.json', {
      body: { exchange: key }
    })
    dataList = dataList.map(item => {
      item.key = item._id
      return item
    })
    setData(dataList)
    setIsLonding(false)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className='page_tools_bj'>
        
        <Header></Header>

        {/* ?????????????????? */}
        <div className="container">
          <div className={style.stableFinancial}>
            <ToolsTitle title="Financial stability" />

            <div className="financial">
              <div className="title">Give a lazy way to manage your cryptocurrency money.</div>

              <Tabs defaultActiveKey="0" onChange={callback}>

                {tabs.map((item, index) => (
                  <TabPane tab={item.title} key={item.exchange}>

                    <Table
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                      showSorterTooltip={false}
                    />

                  </TabPane>
                ))}

              </Tabs>

            </div>
          </div>
        </div>
        {isLonding && <Londing />}
      </main>

      
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export async function getServerSideProps(context) { 
  const stableFinancialSetting = await Request('/stableFinancialSetting.json')
  var stableFinancialList = await Request('/stableFinancialList.json', {
    body: { exchange: stableFinancialSetting[0].exchange }
  })
  stableFinancialList = stableFinancialList.map(item => {
    item.key = item._id
    return item
  })
  return {
    props: {
      stableFinancialSetting,
      stableFinancialList
    }
  }
}
