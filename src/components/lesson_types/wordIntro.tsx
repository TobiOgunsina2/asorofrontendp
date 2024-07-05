// import React from 'react'

import { useContext, useEffect } from "react"
import MyContext from "../../context/Context"

const wordIntro = ({phrase}:{phrase: any}) => {
  const {setUserHasAnswered} = useContext(MyContext)
  const {answers, setAnswers} = useContext(MyContext)


  useEffect(()=>{
    setUserHasAnswered({answered:true, answeredRight: null})
    setAnswers({...answers, phrases: [...answers.phrases, phrase.id]})
    console.log(answers)
  }, [])


  return (
    <div>
      <h1>Look, something new!</h1>
      <div className="video-component">
        <video src=""></video>
        <h2>{phrase.text}</h2>
        <h4>{phrase.phraseTranslation}</h4>
      </div>
    </div>
  )
}

export default wordIntro
