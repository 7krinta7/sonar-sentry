import styles from './SettingsRail.module.css'

export default function SettingsRail({ items, active, onSelect }) {
  return (
    <nav className={styles.rail} aria-label="Settings sections">
      {items.map((item) => (
        <button
          key={item.key}
          className={styles.railItem}
          type="button"
          aria-current={active === item.key ? 'true' : undefined}
          onClick={() => onSelect(item.key)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
