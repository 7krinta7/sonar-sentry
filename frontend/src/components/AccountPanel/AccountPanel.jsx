import styles from './AccountPanel.module.css'

export default function AccountPanel({ onChange }) {
  return (
    <section className={styles.panel}>
      <div className={styles.cardHeader}>
        <div className={styles.panelTitle}>Account details</div>
        <div className={styles.panelSub}>Your identity across Sonar Sentry and MoES/NIOT reports</div>
      </div>

      <div className={styles.avatarRow}>
        <div className={styles.avatarLg}>RS</div>
        <button className={styles.btnBrowse} type="button">Change photo</button>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="full-name">Full name</label>
          <input type="text" id="full-name" defaultValue="Ritika Sharma" onChange={onChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="role">Role</label>
          <select id="role" defaultValue="Oceanographer" onChange={onChange}>
            <option>Researcher</option>
            <option>Oceanographer</option>
            <option>Government Official</option>
            <option>Administrator</option>
          </select>
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" defaultValue="ritika.sharma@niot.res.in" onChange={onChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="phone">Contact number</label>
          <input type="text" id="phone" defaultValue="+91 44 6678 2000" className="tabular" onChange={onChange} />
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="org">Department</label>
          <input type="text" id="org" defaultValue="National Institute of Ocean Technology" onChange={onChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" defaultValue="••••••••••••" onChange={onChange} />
        </div>
      </div>
    </section>
  )
}
