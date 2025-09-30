import Inputs from '@/Module2/components/Inputs';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Inputs />
      </main>
    </div>
  );
}
