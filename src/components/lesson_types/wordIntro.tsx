// import React from 'react'

import { useContext, useEffect } from "react"
import MyContext from "../../context/Context"
import './wordIntro.css'

const wordIntro = ({phrase}:{phrase: any}) => {
  const {setUserHasAnswered} = useContext(MyContext)
  const {answers, setAnswers} = useContext(MyContext)

  let splitPhrase = phrase.brokenDownPhrase.split('1').map((word: string, index: number)=>{
    return {word: word, wordExplanation: phrase.containedWords[index]}
  })
  console.log(splitPhrase)

  useEffect(()=>{
    setUserHasAnswered({answered:true, answeredRight: null})
    setAnswers({...answers, phrases: [...answers.phrases, phrase.id]})
  }, [])

  // https://codepen.io/worksbyvan/pen/mqZENj?editors=0110

  return (
    <div className="word-intro">
      <h1 className="intro-instruction">Look, something new!</h1>
      <div className="video-component">
        <video className="word-video" src=""></video>
        <h2>{splitPhrase.map((word: any)=>{
          if (word.wordExplanation){

          
          return (<span className="annotation">
            <span className="annotation-text">
            {word.wordExplanation.text} - <span className="word-meaning">{word.wordExplanation.wordTranslation} </span>
            </span>
            <span className="annotation-symbol">
              {word.word}&nbsp;
            </span>
            </span>)
        }})}</h2>
        <h4>{phrase.phraseTranslation}</h4>
      </div>
    </div>
  )
}

export default wordIntro
