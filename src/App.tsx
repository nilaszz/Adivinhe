import styles from "./utils/app.module.css";

import { Header } from "./components/Header";

export default function App() {
  return (
    <>
      <div className={styles.container}>
        <main>
          <Header />
        </main>
      </div>
    </>
  );
}
