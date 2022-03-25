import { Card } from 'antd'
import Head from 'next/head'
import Image from 'next/image'

import Header from '../../components/Header'
import Title from '../../components/PageTitle'
import Footer from '../../components/Footer'

import style from './index.module.scss'

export default function NewCurriculum() {
  return (
    <>
      {/* 对于html 头部 */}
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 内容 */}
      <main className='page_tools_bj'>
        {/* 页面头部内容 */}
        <Header></Header>

        {/* 页面内容 */}
        <div className="container">

          <div className={style.class}>
            <Title title="Beginner’s Guide" />

            <div className="class_list">
              {/* <h4 className="title">Beginner’s Guide</h4> */}

              <div className="class_item">
                <div className="class_name">Blockchain White Book</div>
                <Image src="/svg/right_pages.svg" width={8} height={14} alt="" />
              </div>

              <div className="class_item">
                <div className="class_name">Blockchain White Book</div>
                <Image src="/svg/right_pages.svg" width={8} height={14} alt="" />
              </div>

              <div className="class_item">
                <div className="class_name">Blockchain White Book</div>
                <Image src="/svg/right_pages.svg" width={8} height={14} alt="" />
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* 底部 */}
      <footer>
        <Footer/>
      </footer>
    </>
  )
}