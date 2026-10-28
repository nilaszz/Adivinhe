import styles from "./utils/app.module.css";

import { useEffect, useState  } from "react"
import { WORDS, type Challenge } from "./utils/words";

import { Input } from "./components/input";
import { Button } from "./components/Button";
import { Tips } from "./components/Tips";
import { Letter } from "./components/Letter";
import { Header } from "./components/Header";
import { LettersUsed } from "./components/LettersUsed";


export default function App() {
  const [attempts, setAttempts] = useState(0)
  const [letter, setLetter] = useState("")
  const [challenge, setChallenge ] = useState<Challenge | null>(null)

  function handleRestartGame() {
    alert("Restart game");
  }

  function startGame() {
   const index = Math.floor(Math.random() * WORDS.length)
   const randomWord = WORDS[index]

   setChallenge(randomWord)

   setAttempts(0)
   setLetter("")
  }

  useEffect(() => {
    startGame()
  },[])

  return (
    <>
      <div className={styles.container}>
        <main>
          <Header current={attempts} max={10} onRestart={handleRestartGame} />

          <Tips tip="Uma das linguagens de programação dinâmica mais populares" />

          <div className={styles.word}>
          <Letter value= "R" />
          <Letter value= "E" />
          <Letter value= "A" />
          <Letter value= "C" />
          <Letter value= "T" /> 
          </div>

          <h4>Palpite</h4>

          <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder="?" />
          <Button title="Confirmar" />

          </div>

          <LettersUsed />
        </main>
      </div>
    </>
  );
}
