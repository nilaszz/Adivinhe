import styles from "./style.module.css";

type Props = {
    value?: string
    size?: "default" | "small"
    color?: "default" | "correct" | "wrong"
}


export function Letter({ value = '', size = 'default', color = 'default' }: Props) {
    const className = [
        styles.letter,
        size === 'small' ? styles.letterSmall : '',
        color === 'correct' ? styles.letterCorrect : '',
        color === 'wrong' ? styles.letterWrong : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={className}>
            <span>{value}</span>
        </div>
    );
}