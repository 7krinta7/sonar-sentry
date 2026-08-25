import { useState } from 'react'
import styles from './ModelWeightsPanel.module.css'

const MODELS = [
  { key: 'v3.2', label: 'SonarNet v3.2' },
  { key: 'v3.1', label: 'SonarNet v3.1' },
  { key: 'v2.8', label: 'SonarNet v2.8 (legacy)' },
]

export default function ModelWeightsPanel({ onChange }) {
  const [debris, setDebris] = useState(82)
  const [shipwreck, setShipwreck] = useState(65)
  const [noise, setNoise] = useState(54)
  const [model, setModel] = useState('v3.2')

  function handleDebris(e) {
    setDebris(Number(e.target.value))
    onChange?.()
  }
  function handleShipwreck(e) {
    setShipwreck(Number(e.target.value))
    onChange?.()
  }
  function handleNoise(e) {
    setNoise(Number(e.target.value))
    onChange?.()
  }

  return (
    <section className={styles.panel}>
      <div className={styles.cardHeader}>
        <div className={styles.panelTitle}>AI model weights</div>
        <div className={styles.panelSub}>Tune how the detection pipeline scores and classifies anomalies</div>
      </div>

      <ModelWeightSlider
        label="Debris detection sensitivity"
        sub="Higher values catch smaller/faint debris signatures"
        value={debris}
        onChange={handleDebris}
      />
      <ModelWeightSlider
        label="Shipwreck classification weight"
        sub="Balances shipwreck recall against false positives"
        value={shipwreck}
        onChange={handleShipwreck}
      />
      <ModelWeightSlider
        label="Seabed noise suppression"
        sub="Filters natural rock/sediment texture from anomaly scoring"
        value={noise}
        onChange={handleNoise}
      />

      <div className={styles.modelVersionField}>
        <label className={styles.modelVersionLabel}>Active model version</label>
        <div className={styles.checkrow}>
          {MODELS.map((m) => (
            <button
              key={m.key}
              type="button"
              className={`${styles.checkChip} ${model === m.key ? styles.checkChipActive : ''}`}
              aria-selected={model === m.key}
              onClick={() => { setModel(m.key); onChange?.() }}
            >
              {model === m.key && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ModelWeightSlider({ label, sub, value, onChange }) {
  return (
    <div className={styles.modelWeight}>
      <div className={styles.confViz}>
        <div className={styles.confTop}>
          <span className={styles.confLabel}>
            {label}
            <span className={styles.confLabelSub}>{sub}</span>
          </span>
          <span className={`${styles.confValue} tabular`}>{value}%</span>
        </div>
        <div className={styles.confTrackWrap}>
          <div className={styles.trackContainer}>
            <div className={styles.trackBg} />
            <div className={styles.trackFill} style={{ width: `${value}%` }} />
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={onChange}
              className={styles.slider}
              aria-label={label}
            />
          </div>
        </div>
        <div className={styles.confRange}>
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  )
}
