import styles from "./Londing.module.scss";

export default function Londing() {
  return (
    <div className={styles.loading_page}>
      <div className={styles.mask}></div>
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}