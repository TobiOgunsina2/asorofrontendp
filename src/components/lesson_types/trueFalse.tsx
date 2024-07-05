// import React from 'react'

import { useContext, useEffect, useState } from "react"
import api from "../../context/api"
import MyContext from "../../context/Context"

const trueFalse = ({phrase}: {phrase: any}) => {
  const [questionAnswer, setQuestionAnswer] = useState('')
  let {setUserHasAnswered} = useContext(MyContext)
  const {answers, setAnswers} = useContext(MyContext)

  

  useEffect(()=>{
    if (!phrase.relatedPhrases[0]){
      setQuestionAnswer(phrase.phraseTranslation)
    }
    else{
      console.log(phrase.relatedPhrases)
      api
      .get(`/api/phrase/${phrase.relatedPhrases[0].id}/`)
      .then((res) => res.data)
      .then((data)=> {
          setQuestionAnswer(data[0].phraseTranslation)
        })
      .catch((err)=> console.log(err))
    }
    setUserHasAnswered({answered:false, answeredRight: null})
  }, [])
  
  const handleClick = (e: any) => {
    if ((phrase.phraseTranslation===questionAnswer).toString()===e.target.className) {
      setUserHasAnswered({answered:true, answeredRight: true})
      setAnswers({...answers, phrases: [...answers.phrases, phrase.id]})
      console.log(answers)
    }
    else{
      setUserHasAnswered({answered:true, answeredRight: false})
      setAnswers({...answers, phrases: [...answers.phrases, phrase.id]})
      // Add component back to stack for half points
    }
  }
  

  return (
    <div>
      <div className="question">Does <span className="inText">{phrase.text}</span> mean <span className="inText">{questionAnswer}</span></div>
      <button className="true" onClick={handleClick}>True</button>
      <button className="false" onClick={handleClick}>False</button>
    </div>
  )
}

export default trueFalse
