import styles from "./utils/app.module.css";

import { useEffect, useState  } from "react"
import { WORDS, type Challenge } from "./utils/words";

import { Input } from "./components/input";
import { Button } from "./components/Button";
import { Tips } from "./components/Tips";
import { Letter } from "./components/Letter";
import { Header } from "./components/Header";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";


const ATTEMPTS_MARGIN = 5


export default function App() {
  const [score, setScore] = useState(0)
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([])
  const [letter, setLetter] = useState("")
  const [challenge, setChallenge ] = useState<Challenge | null>(null)

  function handleRestartGame() {
    const isConfirmed = window.confirm("você tem certeza que desejar reiniciar?")

    if (isConfirmed) {
      startGame()
    }
  }

  function startGame() {
   const index = Math.floor(Math.random() * WORDS.length)
   const randomWord = WORDS[index]

   setChallenge(randomWord)

   setScore(0)
   setLetter("")
   setLettersUsed([])
  }

  function handleConfirm(){
    if(!challenge) {
      return
    }

    if(!letter.trim()){
      return alert("Digite uma letra!")
    }

    const value = letter.toUpperCase()
    const exists = lettersUsed.find((used) => used.value.toUpperCase() === value)

    if (exists) {
      return alert("você já utilizou a letra " + value)
    }

    const hits = challenge.word.toUpperCase().split("").filter((charm) => charm === value).length

    const correct = hits > 0
    const currentScore = score + hits

    setLettersUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)

    setLetter("")
  }

  function endGame (message: string){
    alert(message)
    startGame(

    )}

  useEffect(() => {
    startGame()
  },[])

  useEffect(() => {
    if (!challenge) {
      return
    }

    const attemptLimit = challenge.word.length + ATTEMPTS_MARGIN

    const timeout = setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Parabéns, você descobriu a palavra!")
      }

      if (lettersUsed.length >= attemptLimit) {
        return endGame(`Você perdeu! A palavra era ${challenge.word}.`)
      }
    }, 200)

    return () => clearTimeout(timeout)
  }, [challenge, score, lettersUsed.length])

  if(!challenge){
    return
  }



  return (
    <>
      <div className={styles.container}>
        <main>
          <Header 
          current={lettersUsed.length} 
          max={challenge.word.length + ATTEMPTS_MARGIN} 
          onRestart={handleRestartGame} 
          
          />


          <Tips tip={challenge.tip} />


        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase())

           
          
            return(
            <Letter key={index} value= {letterUsed?.value} color={letterUsed?.correct ? "correct" : "default"} />
          )})}
          
          </div>

          <h4>Palpite</h4>

          <div className={styles.guess}>
          <Input autoFocus
          maxLength={1}
          placeholder="?"
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          />

          <Button title="Confirmar" onClick={handleConfirm} />

          </div>

          <LettersUsed data={lettersUsed}/>
        </main>
      </div>
    </>
  );
}
