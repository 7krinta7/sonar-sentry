import styles from './ActionBar.module.css'

export default function ActionBar() {
  return (
    <section className={styles.actionsRow}>
      <div className={styles.actionsRow__info}>
        <strong>Run complete — sonar_survey_014.tiff</strong>
        <span>Processed 2h ago · 12 detections logged</span>
      </div>
      <div className={styles.actionsRow__btns}>
        <button className={styles.btnGhost} type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19l-7-7l7-7m7 7H5" />
          </svg>
          Back to uploads
        </button>
        <button className={styles.btnPrimary} type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
            <path d="M14 2v5a1 1 0 0 0 1 1h5m-8 10v-6m-3 3l3 3l3-3" />
          </svg>
          Generate report
        </button>
      </div>
    </section>
  )
}
