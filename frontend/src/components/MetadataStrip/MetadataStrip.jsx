import styles from './MetadataStrip.module.css'

const items = [
  { label: 'Sonar type', value: 'Side-Scan' },
  { label: 'Resolution', value: '0.5 m/px' },
  { label: 'Depth range', value: '4–38 m' },
  { label: 'Confidence threshold', value: '78%' },
]

export default function MetadataStrip() {
  return (
    <div className={styles.metaStrip}>
      {items.map((item) => (
        <div key={item.label} className={styles.metaCell}>
          <span className={styles.metaCell__label}>{item.label}</span>
          <span className={`${styles.metaCell__value} tabular`}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}
