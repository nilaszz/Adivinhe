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

type GameDialog =
  | { type: "notice"; title: string; message: string; action?: "new-game" }
  | { type: "confirm-restart"; title: string; message: string }


export default function App() {
  const [score, setScore] = useState(0)
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([])
  const [letter, setLetter] = useState("")
  const [challenge, setChallenge ] = useState<Challenge | null>(null)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [dialog, setDialog] = useState<GameDialog | null>(null)

  function handleRestartGame() {
    setDialog({
      type: "confirm-restart",
      title: "Reiniciar partida?",
      message: "Seu progresso atual será perdido. Deseja começar uma nova partida?",
    })
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
      return setDialog({
        type: "notice",
        title: "Digite uma letra",
        message: "Escolha uma letra antes de confirmar seu palpite.",
      })
    }

    const value = letter.toUpperCase()
    const exists = lettersUsed.find((used) => used.value.toUpperCase() === value)

    if (exists) {
      return setDialog({
        type: "notice",
        title: "Letra já utilizada",
        message: `Você já tentou a letra ${value}. Escolha outra.`,
      })
    }

    const hits = challenge.word.toUpperCase().split("").filter((charm) => charm === value).length

    const correct = hits > 0
    const currentScore = score + hits

    setLettersUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)

    setLetter("")
  }

  function endGame(message: string) {
    setDialog({
      type: "notice",
      title: message.startsWith("🎉") ? "Você acertou!" : "Fim de jogo",
      message,
      action: "new-game",
    })
  }

  useEffect(() => {
    startGame()
  },[])

  useEffect(() => {
    if (!challenge || dialog) {
      return
    }

    const attemptLimit = challenge.word.length + ATTEMPTS_MARGIN

    const hasWon = score === challenge.word.length

    const timeout = setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame(
          `🎉 Parabéns! Você descobriu “${challenge.word}”. Que tal jogar mais uma?`,
        )
      }

      if (lettersUsed.length >= attemptLimit) {
        return endGame(
          `😅 Suas tentativas acabaram. A palavra era “${challenge.word}”. Tente novamente!`,
        )
      }
    }, hasWon ? 1300 : 200)

    return () => clearTimeout(timeout)
  }, [challenge, score, lettersUsed.length, dialog])

  if(!challenge){
    return
  }



  return (
    <>
      <div className={styles.container} data-theme={theme}>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
          aria-pressed={theme === "dark"}
        >
          Ativar modo {theme === "light" ? "escuro" : "claro"}
        </button>

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
            <Letter
              key={index}
              value={letterUsed?.value}
              color={letterUsed?.correct ? "correct" : "default"}
            />
          )})}
          
          </div>

          <h4>Palpite</h4>

          <form
            className={styles.guess}
            onSubmit={(event) => {
              event.preventDefault()
              handleConfirm()
            }}
          >
            <Input
              autoFocus
              maxLength={1}
              placeholder=""
              value={letter}
              onChange={(event) => setLetter(event.target.value)}
            />

            <Button title="Confirmar" type="submit" />
          </form>

          <LettersUsed data={lettersUsed}/>
        </main>

        <footer className={styles.footer}>
          © made by nilasz
        </footer>

        {dialog && (
          <div className={styles.dialogOverlay}>
            <section
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="game-dialog-title"
              aria-describedby="game-dialog-message"
            >
              <h2 id="game-dialog-title">{dialog.title}</h2>
              <p id="game-dialog-message">{dialog.message}</p>

              <div className={styles.dialogActions}>
                {dialog.type === "confirm-restart" && (
                  <button
                    type="button"
                    className={styles.secondaryDialogButton}
                    onClick={() => setDialog(null)}
                  >
                    Continuar jogando
                  </button>
                )}
                <button
                  type="button"
                  className={styles.primaryDialogButton}
                  onClick={() => {
                    if (dialog.type === "confirm-restart" || dialog.action === "new-game") {
                      startGame()
                    }
                    setDialog(null)
                  }}
                  autoFocus
                >
                  {dialog.type === "confirm-restart"
                    ? "Reiniciar"
                    : dialog.action === "new-game"
                      ? "Nova partida"
                      : "Entendi"}
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
