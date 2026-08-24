import Topbar from '../../components/Topbar/Topbar'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PageHeader from '../../components/PageHeader/PageHeader'
import StatusMetrics from '../../components/StatusMetrics/StatusMetrics'
import DetectionSummary from '../../components/DetectionSummary/DetectionSummary'
import RiskBreakdown from '../../components/RiskBreakdown/RiskBreakdown'
import MetadataStrip from '../../components/MetadataStrip/MetadataStrip'
import DetectionList from '../../components/DetectionList/DetectionList'
import ActionBar from '../../components/ActionBar/ActionBar'
import styles from './DetectionResults.module.css'

const metrics = [
  { label: 'Run time', value: '3m 42s' },
  { label: 'Coverage area', value: '2.4 km²' },
  { label: 'Avg. confidence', value: '87%' },
  { label: 'Pipeline status', value: 'Complete', ok: true },
]

export default function DetectionResults() {
  return (
    <>
      <Topbar activePage="uploads" />
      <Breadcrumb filename="sonar_survey_014.tiff" />
      <PageHeader
        title="Detection results"
        description="Chennai coast · 12.9716, 80.2436 · 284 MB · uploaded 2h ago — AI pipeline complete."
      />
      <StatusMetrics items={metrics} />
      <main className={styles.workSurface}>
        <section className={styles.panel}>
          <DetectionSummary />
          <RiskBreakdown />
          <MetadataStrip />
        </section>
        <DetectionList />
        <ActionBar />
      </main>
    </>
  )
}
