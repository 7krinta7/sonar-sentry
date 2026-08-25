import styles from './NotificationPanel.module.css'

const NOTIFICATIONS = [
  {
    title: 'Detection run complete',
    meta: 'Email + in-app · sent when pipeline finishes',
    defaultOn: true,
  },
  {
    title: 'Critical risk anomaly found',
    meta: 'SMS + email · shipwreck or high-risk debris only',
    defaultOn: true,
  },
  {
    title: 'Report ready for download',
    meta: 'In-app only',
    defaultOn: true,
  },
  {
    title: 'Weekly usage summary',
    meta: 'Email · every Monday 08:00 IST',
    defaultOn: false,
  },
  {
    title: 'Storage nearing limit',
    meta: 'Email · triggers above 80% of 5GB quota',
    defaultOn: true,
  },
]

export default function NotificationPanel({ onChange }) {
  return (
    <section className={styles.panel}>
      <div className={styles.cardHeader}>
        <div className={styles.panelTitle}>Notification preferences</div>
        <div className={styles.panelSub}>Choose what triggers an alert</div>
      </div>
      <div className={styles.toggleList}>
        {NOTIFICATIONS.map((item) => (
          <ToggleRow
            key={item.title}
            title={item.title}
            meta={item.meta}
            defaultChecked={item.defaultOn}
            onChange={onChange}
          />
        ))}
      </div>
    </section>
  )
}

function ToggleRow({ title, meta, defaultChecked, onChange }) {
  return (
    <div className={styles.toggleRow}>
      <div className={styles.toggleText}>
        <span className={styles.toggleTitle}>{title}</span>
        <span className={styles.toggleMeta}>{meta}</span>
      </div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        <span className={styles.switchTrack} />
      </label>
    </div>
  )
}
