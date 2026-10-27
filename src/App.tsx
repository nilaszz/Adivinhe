import styles from "./utils/app.module.css";

import { Tips } from "./components/Tips";
import { Letter } from "./components/Letter";
import { Header } from "./components/Header";


export default function App() {
  function handleRestartGame() {
    alert("Restart game");
  }


  return (
    <>
      <div className={styles.container}>
        <main>
          <Header current={5} max={10} onRestart={handleRestartGame} />

          <Tips tip="Uma das linguagens de programação dinâmica mais populares" />

          <div className={styles.word}>
          <Letter value= "R" />
          <Letter value= "E" />
          <Letter value= "A" />
          <Letter value= "C" />
          <Letter value= "T" /> 
          </div>
        </main>
      </div>
    </>
  );
}
