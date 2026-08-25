import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topbar from '../../components/Topbar/Topbar'
import SettingsRail from '../../components/SettingsRail/SettingsRail'
import AccountPanel from '../../components/AccountPanel/AccountPanel'
import NotificationPanel from '../../components/NotificationPanel/NotificationPanel'
import ModelWeightsPanel from '../../components/ModelWeightsPanel/ModelWeightsPanel'
import DisplayPanel from '../../components/DisplayPanel/DisplayPanel'
import SettingsSaveBar from '../../components/SettingsSaveBar/SettingsSaveBar'
import styles from './Settings.module.css'

const RAIL_ITEMS = [
  { key: 'account', label: 'Account' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'model-weights', label: 'AI Model Weights' },
  { key: 'display', label: 'Map & Display' },
  { key: 'api-keys', label: 'API Keys' },
  { key: 'danger-zone', label: 'Danger Zone' },
]

export default function Settings() {
  const navigate = useNavigate()
  const [activeRail, setActiveRail] = useState('account')
  const [hasChanges, setHasChanges] = useState(false)

  function markChanged() {
    setHasChanges(true)
  }

  return (
    <div className={styles.settingsPage}>
      <Topbar activePage="settings" />

      <section className={styles.headerBand}>
        <div className={styles.backRow}>
          <button className={styles.btnBack} type="button" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <path d="m12 19l-7-7l7-7m7 7H5" />
            </svg>
            Back
          </button>
        </div>
        <h1>Settings</h1>
        <p>Manage your account, notification preferences, and the AI detection model configuration used across every scan.</p>
      </section>

      <div className={styles.settingsShell}>
        <SettingsRail
          items={RAIL_ITEMS}
          active={activeRail}
          onSelect={setActiveRail}
        />

        <div className={styles.contentCol}>
          <AccountPanel onChange={markChanged} />
          <NotificationPanel onChange={markChanged} />
          <ModelWeightsPanel onChange={markChanged} />
          <DisplayPanel onChange={markChanged} />
          <SettingsSaveBar
            hasChanges={hasChanges}
            onSave={() => setHasChanges(false)}
          />
        </div>
      </div>
    </div>
  )
}
