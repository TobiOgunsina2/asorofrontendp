// import React from 'react'

import { useContext, useEffect, useRef } from "react"
import MyContext from "../../context/Context"
import './multipleChoice.css'

const multipleChoice = ({phrase}: {phrase: any}) => {
  let choices: any = [...phrase.relatedPhrases, phrase]
  const {answers, setAnswers} = useContext(MyContext)
  let {userHasAnswered, setUserHasAnswered} = useContext(MyContext)
  
  useEffect(()=>{
    setUserHasAnswered(false)
  }, [])

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
      <h1 className="mcq-question">What is <span className="inText english">{phrase.phraseTranslation}</span> in Yoruba</h1>
      <section className={`multi-choice-container ${userHasAnswered.answered ? 'question-answered': ''}`}>

        {choices.slice(0, 4).map((choice:any)=>{
          return <button key={choice.id} value={choice.text} onClick={handleChoice} className={`multi-choice ${choice.text==phrase.text && userHasAnswered.answeredRight ? 'correct-mcq' : ''} ${choice.id}`}>
            {choice.text}
          </button>
        })}
      </section>
    </div>
  )
}

export default multipleChoice
