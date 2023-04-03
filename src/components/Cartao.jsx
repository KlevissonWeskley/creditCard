import { useState, useEffect } from 'react'
import { Button } from './Button'

import styles from './Cartao.module.css'
import { Question } from 'phosphor-react'

import visa from '../assets/visa.svg'
import contact from '../assets/contact.svg'
import shieldCheck from '../assets/shieldCheck.svg'
import erro from '../assets/erro.svg'
import { CardCvv } from './CardCvv'

export function Cartao() {
    const [inputValue, setInputValue] = useState('')
    const [isInputValid, setIsInputValid] = useState(false)
    const [validity, setValidity] = useState('')
    const [cvv, setCvv] = useState('')
    const [isCvvValid, setIsCvvValid] = useState('')
    const [number, setNumber] = useState()
    const [isNumberValid, setIsNumberValid] = useState(false)
    const [isValidityValid, setIsValidityValid] = useState(false)
    const [formData, setFormData] = useState({})
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [showCard, setShowCard] = useState(true)
    const [showCvv, setShowCvv] = useState(false)

    useEffect(() => {
        setIsButtonDisabled(!isInputValid || !isNumberValid || !validity || !isCvvValid);
    }, [isInputValid, isNumberValid, validity, isCvvValid]);
    

    function handleInputValue(event) {
        const inputValue = event.target.value.replace(/[^a-zA-Z\s-]/g, '');
        setInputValue(inputValue);
        setIsInputValid(inputValue.length === 14)
        setFormData({...formData, name: inputValue})
    }

    function handleValidityValue(event) {
        const validityValue = event.target.value
        setValidity(validityValue)
        setFormData({...formData, validity: event.target.value}) 
        setIsValidityValid(validityValue.length === 5)
    }

    function handleCvvValue(event) {
        const value = event.target.value.replace(/[^\d\s-]/g, '')
        setCvv(event.target.value)
        setIsCvvValid(value.length === 3)
        setFormData({...formData, cvv: value})
    }

    function handleNumberValue(event) {
        const value = event.target.value.replace(/[^\d\s-]/g, '')
        setNumber(value)
        setIsNumberValid(value.length === 19)
        setFormData({...formData, number: value}) 
    }
    
    function handleButtonClick() {
        setInputValue('');
        setIsInputValid(false);
        setValidity('');
        setCvv('')
        setNumber('');
        setIsNumberValid(false);
        setFormData({})
        setIsCvvValid(false)
        setIsValidityValid(false)

        alert('Cartão adicionado!')
    }

    const handleCardClick = () => {
        setShowCard(false);
        setShowCvv(true);
      }
    
    const handleCvvClick = () => {
        setShowCvv(false);
        setShowCard(true);
    }
    
    return (
        <div className={styles.content}>
            <div className={styles.cardContent}>
                <div className={styles.formulario}>
                    <form>
                        <div className={styles.personalInformation}>
                            <label htmlFor='number'>Número do cartão</label>
                            <input type='text' 
                                placeholder='Número como está no cartão'
                                id='number'
                                name='number'
                                onChange={handleNumberValue}
                                value={number}
                                maxLength={19}
                            />
                            {!isNumberValid && (
                                <p className={styles.warning}>
                                   <img src={erro} /> Campo obrigatório
                                </p>
                            )} 

                            <label htmlFor='name'>Nome do titular</label>
                            <input type='text' 
                                placeholder='Nome como está no cartão'
                                id='name'
                                name='name'
                                onChange={handleInputValue}
                                value={inputValue}
                                maxLength={14}
                            />
                            {!isInputValid && (
                                <p className={styles.warning}>
                                   <img src={erro} /> Campo obrigatório
                                </p>
                            )} 
                        </div>

                        <div className={styles.informationCard}>
                            <div className={styles.validity}>
                                <label htmlFor='validity'>Validade</label>
                                <input type='text' 
                                    placeholder='mm/aa' 
                                    name='validity' 
                                    id='validity' 
                                    onChange={handleValidityValue}
                                    value={validity}
                                    maxLength={5}
                                />
                                {!isValidityValid && (
                                    <p className={styles.warning}>
                                    <img src={erro} /> Campo obrigatório
                                    </p>
                                )} 
                            </div>

                            <div className={styles.cvv}>
                                <label htmlFor='ccv'>CVV <Question size={16} className={styles.question}/></label>
                                <input type='text'
                                       placeholder='***' 
                                       name='cvv' 
                                       id='cvv' 
                                       value={cvv}
                                       onChange={handleCvvValue}
                                       maxLength={3}
                                />
                                {!isCvvValid && (
                                    <p className={styles.warning}>
                                    <img src={erro} /> Campo obrigatório
                                    </p>
                                )} 
                            </div>

                        </div>
                    </form>
                </div>

                        <div className={styles.card} >
                            {showCard && (
                                <div className={styles.creditCard} onClick={handleCardClick}>
                                    <div className={styles.topInfo}>
                                        <img src={visa} className={styles.visa} />
                                        <img src={contact} />
                                    </div>

                                    <div className={styles.numberCard}>
                                        <h1>{
                                            number ? number : '**** **** **** ****'
                                            }
                                        </h1>
                                    </div>

                                    <div className={styles.bottomInfo}> 
                                        <p>{
                                            inputValue ? inputValue : 'Seu nome aqui'
                                            }
                                        </p>
                                        <p>{
                                            validity ? validity : '* * / * *' 
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}

                            {showCvv && <CardCvv cvv={cvv} onClick={handleCvvClick}/>}

                                <div className={styles.secureData}>
                                    <img src={shieldCheck} />
                                    <p>Seus dados estão seguros</p>
                                </div>
                        </div>

            </div>

            <div>
                <Button onClick={handleButtonClick} disabled={isButtonDisabled}/>
            </div>                       

        </div>
    )
}