import React from 'react'
import Image from "next/image";
import styles from './Footer.module.scss'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className={styles.footer}>
      <div className="footer_content">

        <div className="footer_icon_box">
          <div className="telegram">
            <Image  src="/svg/telegram.svg" width={34} height={34}  alt="CoinSky" />
          </div>
          <div className="twitter">
            <Image className='' src="/svg/twitter.svg" width={34} height={34} alt="CoinSky" />
          </div>
        </div>

        <div className="footer_text">
          <span>©{ year } CoinSky.All Rights Reserved</span>
        </div>

      </div>
    </div>
  )
}
