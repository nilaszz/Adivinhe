import styles from "./style.module.css";

type Props = {
    value?: string
    size?: "default" | "small"
    color?: "default" | "correct" | "wrong"
    reveal?: boolean
    animateEntry?: boolean
}


export function Letter({
    value = '',
    size = 'default',
    color = 'default',
    reveal = false,
    animateEntry = false,
}: Props) {
    const className = [
        styles.letter,
        size === 'small' ? styles.letterSmall : '',
        color === 'correct' ? styles.letterCorrect : '',
        color === 'wrong' ? styles.letterWrong : '',
        reveal ? styles.letterReveal : '',
        animateEntry ? styles.letterEnter : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            className={className}
            aria-label={reveal ? value : undefined}
        >
            {reveal ? (
                <>
                    <span className={styles.letterFront} aria-hidden="true" />
                    <span className={styles.letterBack} aria-hidden="true">{value}</span>
                </>
            ) : (
                <span>{value}</span>
            )}
        </div>
    );
}