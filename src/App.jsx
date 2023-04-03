import { Cartao } from './components/Cartao'
import './global.css'
import styles from './App.module.css'

export function App() {

  return (
    <div className={styles.content}>
      <Cartao />
    </div>
  )
}

