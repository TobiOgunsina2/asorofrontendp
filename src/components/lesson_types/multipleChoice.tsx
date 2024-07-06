// import React from 'react'

import { useContext } from "react"
import MyContext from "../../context/Context"
import './multipleChoice.css'

const multipleChoice = ({phrase}: {phrase: any}) => {
  let choices: any = [...phrase.relatedPhrases, phrase]
  const {answers, setAnswers} = useContext(MyContext)
  let {setUserHasAnswered} = useContext(MyContext)
  

  const handleChoice = (e:any) => {
    if (e.target.value == phrase.text){
      setUserHasAnswered({answered:true, answeredRight: true})
      setAnswers({...answers, phrases: [...answers.phrases, phrase.id]})
    }
    else{
      setUserHasAnswered({answered:true, answeredRight: false})
      setAnswers({...answers, phrases: [...answers.phrases, phrase.id]})
    }
  }

  return (
    <div>
      <p className="mcq-prompt">Choose the right answer</p>
      <h1 className="mcq-question">What is {phrase.phraseTranslation} in yoruba</h1>
      <section className="multi-choice-container">
        {choices.slice(0, 4).map((choice:any)=>{
          return <button key={choice.id} value={choice.text} onClick={handleChoice} className={`multi-choice ${choice.id}`}>
            {choice.text}
          </button>
        })}
      </section>
    </div>
  )
}

export default multipleChoice
