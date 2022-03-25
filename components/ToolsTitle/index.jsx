import React from 'react'
import styles from "./toolsTitle.module.scss";

export default function ToolsTitle({ title }) {
  
  return (
    <div className={styles.tools_title}>
      <h2>{ title }</h2>
    </div>
  )
}

export function SmallToolsTitle({ title }) {
  
  return (
    <div className={styles.SmallToolsTitle}>
      <h5>{ title }</h5>
    </div>
  )
}
