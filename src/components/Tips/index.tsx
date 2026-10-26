import styles from "./style.module.css";
import tipIcon from "../../assets/tip.svg";



type Props = {
    tip: string;
}


export function Tips({ tip }: Props) {
    return <div className={styles.tip}>
         <img src={tipIcon} />


        <div>
            <h3>dica</h3>
            <p>{tip}</p>
        </div>

    </div>
}