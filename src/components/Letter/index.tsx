import styles from "./style.module.css";

type Props = {
    value?: string
    size?: "default" | "small"
}


export function Letter({ value = '', size = 'default' }: Props) {
    return (
        <div
            className={`
            ${styles.letter} 
            ${size === 'small' ? styles.letterSmall : ''}`}
        >
            <span>{value}</span>
        </div>
    )
}