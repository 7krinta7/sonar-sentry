import styles from './UploadPanel.module.css'

export default function UploadPanel() {
  return (
    <section className={styles.panel}>
      <div>
        <div className={styles.panelTitle}>SONAR IMAGE UPLOAD SECTION</div>
        <div className={styles.panelSub}>.tiff · .geotiff · .png · .jpg — up to 500MB</div>
      </div>
      <label className={styles.dropzone} tabIndex={0}>
        <div className={styles.thumbWrap}>
          <img
            src="https://rpreisbpsxrjwqsfeggf.supabase.co/storage/v1/object/public/direction-images/directions/f75591e8-cad0-4764-81c9-38279f1c4d10/2c959c2020eb.jpg"
            alt="Uploaded side-scan sonar image preview"
          />
        </div>
        <div className={styles.icon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
            <path d="M12 13v8m-8-6.101A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="m8 17l4-4l4 4" />
          </svg>
        </div>
        <h2 className={styles.headline}>Drop sonar file here</h2>
        <span className={styles.meta}>Upload the sonar images in respected formats · upto 60 MB</span>
        <div className={styles.formats}>
          <span className={styles.chip}>TIFF</span>
          <span className={styles.chip}>GEOTIFF</span>
          <span className={styles.chip}>PNG</span>
          <span className={styles.chip}>JPG</span>
        </div>
        <button className={styles.btnBrowse} type="button">Browse files</button>
      </label>
    </section>
  )
}
