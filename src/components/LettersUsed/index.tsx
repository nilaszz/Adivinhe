import style from "./style.module.css";

import { Letter } from "../Letter";

export type LettersUsedProps = {
    value: string
    correct: boolean
}

type Props = {
    data: LettersUsedProps[]
}


export function LettersUsed({ data }: Props) {
    return (
        <div className={style.lettersUsed}>
            <h5>Letras Usadas</h5>
        
        
        <div>
          {data.map(({value, correct}) => (
            <Letter 
            value={value} 
            size="small" 
            color={correct ? "correct" : "wrong"} 
            />
          ))}
            
        </div>
        </div>
    )
}