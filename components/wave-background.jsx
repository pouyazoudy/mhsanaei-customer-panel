import classes from "./wave-background.module.css";

export default function WaveBackground() {
  return (
    <>
      <section className={classes.waveBackground}>
        <div className={`${classes.wave} ${classes.wave1}`}></div>
        <div className={`${classes.wave} ${classes.wave2}`}></div>
        <div className={`${classes.wave} ${classes.wave3}`}></div>
        <div className={`${classes.wave} ${classes.wave4}`}></div>
      </section>
      <div
        className={`fixed bottom-0 left-0 h-[42vh] w-screen bg-[#222D42] z-[996]`}
      ></div>
    </>
  );
}
