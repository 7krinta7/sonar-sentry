import styles from './SettingsSaveBar.module.css'

export default function SettingsSaveBar({ hasChanges, onSave }) {
  return (
    <div className={styles.saveBar}>
      <div className={styles.saveBarInfo}>
        <strong>Unsaved changes</strong>
        <span>Save to apply account and model weight updates across the pipeline</span>
      </div>
      <button
        className={styles.btnPrimary}
        type="button"
        onClick={onSave}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Save changes
      </button>
    </div>
  )
}
