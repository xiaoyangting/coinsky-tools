import React from 'react'
import Image from 'next/image'
import styles from  './Header.module.scss'
export default function Header() {
  return (
    <div className={styles.header}>
      <div className="header_content">
        <div className="header_left_logo">
          <Image src="/svg/logoName.svg" width={128} height={32} alt="CoinSky" />
        </div>
        <div className="header_right_download">
          <Image src="/svg/phone.svg" width={12} height={12} alt="CoinSkyApp" ></Image>
          <span>Download APP</span>
        </div>
      </div>
    </div>
  )
}
