import { useState } from 'react'
import styles from './DetectionSettings.module.css'

const CLASSES = ['Debris', 'Shipwreck', 'Rocks', 'Other']

export default function DetectionSettings() {
  const [confidence, setConfidence] = useState(78)
  const [selected, setSelected] = useState(['Debris', 'Shipwreck'])
  const [minSize, setMinSize] = useState(40)

  function toggleClass(name) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  const pct = ((confidence - 50) / 45) * 100

  return (
    <section className={styles.panel}>
      <div className={styles.panelTitle}>Detection settings</div>

      <div className={styles.confViz}>
        <div className={styles.confTop}>
          <span className={styles.confLabel}>Confidence threshold</span>
          <span className={`${styles.confValue} tabular`}>{confidence}%</span>
        </div>
        <div className={styles.confTrackWrap}>
          <input
            type="range"
            min={50}
            max={95}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className={styles.slider}
            aria-label="Confidence threshold"
          />
          <div className={styles.trackBg}>
            <div className={styles.trackFill} style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className={styles.confRange}>
          <span>50%</span>
          <span>95%</span>
        </div>
      </div>

      <div className={styles.field}>
        <label>Detection classes</label>
        <div className={styles.checkrow}>
          {CLASSES.map((cls) => (
            <button
              key={cls}
              type="button"
              className={`${styles.checkChip} ${selected.includes(cls) ? styles.checkChipActive : ''}`}
              onClick={() => toggleClass(cls)}
              aria-selected={selected.includes(cls)}
            >
              {selected.includes(cls) && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
              {cls}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label>Minimum object size (px)</label>
        <div className={styles.minsizeRow}>
          <div className={styles.stepperCtl}>
            <button type="button" aria-label="Decrease" onClick={() => setMinSize((v) => Math.max(10, v - 5))}>−</button>
            <span className={`${styles.stepperValue} tabular`}>{minSize}</span>
            <button type="button" aria-label="Increase" onClick={() => setMinSize((v) => Math.min(200, v + 5))}>+</button>
          </div>
          <span className={styles.minsizeHint}>objects smaller than this are ignored</span>
        </div>
      </div>
    </section>
  )
}
