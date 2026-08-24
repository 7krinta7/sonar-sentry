import styles from './RiskBreakdown.module.css'

const segments = [
  { key: 'high', label: 'High', count: 3, pct: '25%' },
  { key: 'medium', label: 'Medium', count: 5, pct: '41.6%' },
  { key: 'low', label: 'Low', count: 4, pct: '33.3%' },
]

export default function RiskBreakdown() {
  return (
    <div className={styles.riskBarWrap}>
      <div className={styles.riskBarTop}>
        <span className={styles.riskBarTop__label}>Risk breakdown — 12 objects</span>
      </div>
      <div
        className={styles.riskBar}
        role="img"
        aria-label="Risk breakdown: 3 high, 5 medium, 4 low risk detections"
      >
        {segments.map((s) => (
          <div
            key={s.key}
            className={`${styles.riskSeg} ${
              s.key === 'high' ? styles.riskSegHigh :
              s.key === 'medium' ? styles.riskSegMedium :
              styles.riskSegLow
            }`}
            style={{ width: s.pct }}
          />
        ))}
      </div>
      <div className={styles.riskLegend}>
        {segments.map((s) => (
          <span key={s.key} className={styles.riskLegend__item}>
            <span className={`${styles.riskLegend__dot} ${
              s.key === 'high' ? styles.riskLegend__dotHigh :
              s.key === 'medium' ? styles.riskLegend__dotMedium :
              styles.riskLegend__dotLow
            }`} />
            {s.label} <span className={`${styles.riskLegend__val} tabular`}>{s.count}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
