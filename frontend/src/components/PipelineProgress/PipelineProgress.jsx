import styles from './PipelineProgress.module.css'

const stages = [
  { label: 'Preprocessing', meta: '12s', status: 'done' },
  { label: 'Feature extraction', meta: '2,418 px scanned', status: 'active' },
  { label: 'Classification', meta: 'pending', status: 'pending' },
  { label: 'Report assembly', meta: 'pending', status: 'pending' },
]

export default function PipelineProgress() {
  return (
    <section className={styles.panel}>
      <div className={styles.panelTitle}>Pipeline progress</div>

      <div className={styles.progressRow}>
        <span className={styles.stageLabel}>Stage 2 of 4 — Feature extraction</span>
        <span className={`${styles.pct} tabular`}>46%</span>
      </div>

      <div className={styles.track}>
        <div className={styles.fill} style={{ width: '46%' }} />
      </div>

      <div className={styles.stageList}>
        {stages.map((s) => (
          <div key={s.label} className={`${styles.stageRow} ${s.status === 'done' ? styles.stageRowDone : ''} ${s.status === 'active' ? styles.stageRowActive : ''}`}>
            <span className={`${styles.dot} ${s.status === 'active' ? styles.dotActive : ''} ${s.status === 'done' ? styles.dotDone : ''}`} />
            <span className={styles.stageName}>{s.label}</span>
            <span className={`${styles.stageMeta} tabular`}>{s.meta}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
