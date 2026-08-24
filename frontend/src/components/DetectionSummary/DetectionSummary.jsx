import styles from './DetectionSummary.module.css'

const SONAR_IMAGE = 'https://rpreisbpsxrjwqsfeggf.supabase.co/storage/v1/object/public/direction-images/directions/f75591e8-cad0-4764-81c9-38279f1c4d10/2c959c2020eb.jpg'

export default function DetectionSummary() {
  return (
    <div className={styles.heroStatRow}>
      <div className={styles.heroStat}>
        <span className={styles.heroStat__label}>Total detections</span>
        <span className={`${styles.heroStat__value} tabular`}>12</span>
        <span className={styles.heroStat__qualifier}>
          3 high risk · <span className={styles.delta}>flagged for review</span>
        </span>
      </div>
      <div className={styles.previewWrap}>
        <img
          src={SONAR_IMAGE}
          alt="Side-scan sonar scan of sonar_survey_014.tiff, Chennai coast"
        />
        <span className={styles.previewOverlayTag}>Full scan</span>
      </div>
    </div>
  )
}
