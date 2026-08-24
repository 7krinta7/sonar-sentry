import Topbar from '../../components/Topbar/Topbar'
import PageHeader from '../../components/PageHeader/PageHeader'
import Stepper from '../../components/Stepper/Stepper'
import StatusMetrics from '../../components/StatusMetrics/StatusMetrics'
import UploadPanel from '../../components/UploadPanel/UploadPanel'
import MetadataPanel from '../../components/MetadataPanel/MetadataPanel'
import DetectionSettings from '../../components/DetectionSettings/DetectionSettings'
import PipelineProgress from '../../components/PipelineProgress/PipelineProgress'
import LaunchBar from '../../components/LaunchBar/LaunchBar'
import styles from './Launch.module.css'

const STATUS_ITEMS = [
  { label: 'Queued files', value: '1' },
  { label: 'Runs today', value: '7' },
  { label: 'Storage used', value: '312 MB' },
  { label: 'Pipeline status', value: 'Ready', ok: true },
]

const STEPS = ['Upload', 'Configure', 'Launch', 'Results']

export default function Launch() {
  return (
    <>
      <Topbar activePage="launch" />
      <PageHeader
        title="Start a new detection run"
        description="Drop a sonar file, configure the pipeline, and launch AI-powered anomaly detection."
      />
      <div className={styles.stepperRow}>
        <Stepper steps={STEPS} current={1} />
      </div>
      <StatusMetrics items={STATUS_ITEMS} />
      <main className={styles.workSurface}>
        <div className={styles.grid2}>
          <UploadPanel />
          <MetadataPanel />
        </div>
        <div className={styles.grid2}>
          <DetectionSettings />
          <PipelineProgress />
        </div>
        <LaunchBar />
      </main>
    </>
  )
}
