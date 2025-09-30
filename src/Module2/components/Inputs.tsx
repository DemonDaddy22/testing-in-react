'use client';

import styles from '../styles/inputs.module.css';

const Inputs: React.FC = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Registration</h1>
      <div className={styles.group}>
        <label htmlFor='username' className={styles.label}>
          Username
        </label>
        <input type='text' id='username' value='John Doe' className={styles.input} onChange={() => {}} />
      </div>
      <div className={styles.group}>
        <label htmlFor='password' className={styles.label}>
          Password
        </label>
        <input type='password' id='password' value='password' className={styles.input} onChange={() => {}} />
      </div>
      <div className={styles.btnsGroup}>
        <button className={styles.button}>Register</button>
        <button className={styles.button} disabled>
          Login
        </button>
      </div>
    </section>
  );
};

export default Inputs;
