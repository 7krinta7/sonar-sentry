import styles from './DetectionList.module.css'

const detections = [
  {
    id: 0,
    title: 'Shipwreck',
    idCode: 'anomaly_001',
    meta: 'Depth 25.3 m · 5.2 m² · 12:800.2K → 800.5K',
    risk: 'critical',
    confidence: '88%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v4m-1.637-9.409L2.257 17.125a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0M12 16h.01" />
      </svg>
    ),
  },
  {
    id: 1,
    title: 'Plastic debris',
    idCode: 'deb_001',
    meta: 'Depth 12.5 m · 0.8 m² · 120.5K → 300.6K',
    risk: 'high',
    confidence: '92%',
    icon: null,
  },
  {
    id: 2,
    title: 'Fishing net tangle',
    idCode: 'deb_002',
    meta: 'Depth 18.1 m · 2.1 m² · 640.1K → 780.3K',
    risk: 'high',
    confidence: '90%',
    icon: null,
  },
  {
    id: 3,
    title: 'Metal drum cluster',
    idCode: 'anomaly_002',
    meta: 'Depth 21.7 m · 1.4 m² · 340.5K → 410.6K',
    risk: 'medium',
    confidence: '84%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Rock formation',
    idCode: 'anomaly_003',
    meta: 'Depth 9.4 m · 3.6 m² · 60.3K → 220.4K',
    risk: 'medium',
    confidence: '81%',
    icon: null,
  },
  {
    id: 5,
    title: 'Container fragment',
    idCode: 'deb_003',
    meta: 'Depth 15.2 m · 1.9 m² · 910.1K → 1020,240',
    risk: 'low',
    confidence: '76%',
    icon: null,
  },
  {
    id: 6,
    title: 'Sediment ripple anomaly',
    idCode: 'anomaly_004',
    meta: 'Depth 6.8 m · 4.4 m² · 150.7K → 380.8K',
    risk: 'low',
    confidence: '73%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" />
      </svg>
    ),
  },
]

const riskStyles = {
  critical: styles.riskPillCritical,
  high: styles.riskPillHigh,
  medium: styles.riskPillMedium,
  low: styles.riskPillLow,
}

export default function DetectionList() {
  return (
    <section className={styles.panel}>
      <div className={styles.listHeader}>
        <span className={styles.listHeader__label}>Detected objects</span>
        <span className={`${styles.listHeader__count} tabular`}>12 total</span>
      </div>
      <div className={styles.detectList}>
        {detections.map((d) => (
          <div key={d.id} className={styles.detectRow}>
            <div className={styles.detectRow__left}>
              <span className={styles.detectRow__icon}>
                {d.icon || (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                  </svg>
                )}
              </span>
              <div className={styles.detectRow__text}>
                <span className={styles.detectRow__title}>{d.title} — {d.idCode}</span>
                <span className={styles.detectRow__meta}>{d.meta}</span>
              </div>
            </div>
            <div className={styles.detectRow__right}>
              <span className={`${styles.riskPill} ${riskStyles[d.risk]}`}>
                {d.risk.charAt(0).toUpperCase() + d.risk.slice(1)}
              </span>
              <span className={`${styles.detectRow__conf} tabular`}>{d.confidence}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
