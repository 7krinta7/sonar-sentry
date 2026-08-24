import styles from './LaunchBar.module.css'

export default function LaunchBar() {
  return (
    <section className={styles.launchBar}>
      <div className={styles.info}>
        <strong>Ready to launch</strong>
      </div>
      <button className={styles.btnPrimary} type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
          <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
        </svg>
        Start AI Detection Pipeline
      </button>
    </section>
  )
}
