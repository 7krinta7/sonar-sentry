import styles from './MetadataPanel.module.css'

export default function MetadataPanel() {
  return (
    <section className={styles.panel}>
      <div className={styles.panelTitle}>Scan metadata</div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="lat">Latitude</label>
          <input type="text" id="lat" defaultValue="12.9716" className="tabular" />
        </div>
        <div className={styles.field}>
          <label htmlFor="lng">Longitude</label>
          <input type="text" id="lng" defaultValue="80.2436" className="tabular" />
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="sonar-type">Sonar type</label>
          <select id="sonar-type">
            <option>Side-Scan</option>
            <option>Multibeam</option>
            <option>Synthetic Aperture</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="resolution">Resolution</label>
          <select id="resolution">
            <option>0.1 m/px</option>
            <option defaultValue>0.5 m/px</option>
            <option>1 m/px</option>
          </select>
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="depth-min">Depth min (m)</label>
          <input type="text" id="depth-min" defaultValue="4" className="tabular" />
        </div>
        <div className={styles.field}>
          <label htmlFor="depth-max">Depth max (m)</label>
          <input type="text" id="depth-max" defaultValue="38" className="tabular" />
        </div>
      </div>
    </section>
  )
}
