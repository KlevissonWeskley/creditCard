import styles from './CardCvv.module.css'

export function CardCvv({ cvv, onClick}) {
    return (
        <div className={styles.creditCardCvv} onClick={onClick}>
            <div className={styles.lineBlack}>

            </div>

            <div className={styles.cvvLine}>
                <p className={styles.lineWhite}>{cvv ? cvv : '***'}</p>
                <p className={styles.cvv}>CVV</p>
            </div>

        </div>
    )
}