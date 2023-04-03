import styles from './Button.module.css'

export function Button(props) {

    return (
        <div className={styles.button}> 
            <button onClick={props.onClick} disabled={props.disabled}>Adicionar cartão</button>
        </div>
    )
}