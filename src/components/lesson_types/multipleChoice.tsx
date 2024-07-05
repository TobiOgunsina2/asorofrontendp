// import React from 'react'

import { useContext } from "react"
import MyContext from "../../context/Context"

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
      <h1>Choose the right answer</h1>
      <h3>What is {phrase.phraseTranslation} in yoruba</h3>
      {choices.slice(0, 4).map((choice:any)=>{
        return <button key={choice.id} value={choice.text} onClick={handleChoice} className={`multi-choice ${choice.id}`}>
          {choice.text}
        </button>
      })}
    </div>
  )
}

export default multipleChoice
