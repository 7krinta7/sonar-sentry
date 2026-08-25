import styles from './DisplayPanel.module.css'

export default function DisplayPanel({ onChange }) {
  return (
    <section className={styles.panel}>
      <div className={styles.cardHeader}>
        <div className={styles.panelTitle}>Map & display</div>
        <div className={styles.panelSub}>Defaults applied to the geospatial view and interface theme</div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="default-basemap">Default map layer</label>
          <select id="default-basemap" defaultValue="Nautical chart" onChange={onChange}>
            <option>Satellite</option>
            <option>Nautical chart</option>
            <option>OpenStreetMap</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="language">Language</label>
          <select id="language" defaultValue="English" onChange={onChange}>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>

      <div className={styles.toggleList}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <span className={styles.toggleTitle}>Dark mode</span>
            <span className={styles.toggleMeta}>Applies across dashboard and reports</span>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" onChange={onChange} />
            <span className={styles.switchTrack} />
          </label>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <span className={styles.toggleTitle}>High-contrast mode</span>
            <span className={styles.toggleMeta}>Increases text/border contrast for accessibility</span>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" onChange={onChange} />
            <span className={styles.switchTrack} />
          </label>
        </div>
      </div>
    </section>
  )
}
