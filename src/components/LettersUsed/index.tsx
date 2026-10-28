import style from "./style.module.css";

import { Letter } from "../Letter";

export function LettersUsed() {
    return (
        <div className={style.lettersUsed}>
            <h5>Letras Usadas</h5>
        
        
        <div>
            <Letter value="A" size="small"/>
            <Letter value="B" size="small"/>
        </div>
        </div>
    )
}