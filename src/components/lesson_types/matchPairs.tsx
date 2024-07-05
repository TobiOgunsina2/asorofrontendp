// import React from 'react'

import { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../../context/Context";
import './matchPair.css'  

const shuffleArray = (matchingData: any) => {
  return matchingData.slice().sort(() => Math.random() - 0.5);
};

  
function matchPairs(props: any) {
  const {phrase, otherPhrases} = props

  const {answers, setAnswers} = useContext(MyContext)

  const [matches, setMatches] = useState([...[...otherPhrases[0],{id: phrase.id,text: phrase.text, phraseTranslation: phrase.phraseTranslation}].map((choice: any, index: number)=>{
    return {phrase:choice.text, answer:choice.phraseTranslation, index: index}})
  ])
  const [phrases, setPhrases] = useState(shuffleArray([...matches]))
  const [answerChoices, setAnswerChoices] = useState(shuffleArray([...matches]))


  const {setUserHasAnswered} = useContext(MyContext)
  const [currentNode, setCurrentNode] = useState({phrase: '', answer: ''})
  
  console.log(matches)

  const [correctAnswers, setCorrectAnswers] = useState<any>([])
  const [selectedA, setSelectedA] = useState<number>()
  const [selectedP, setSelectedP] = useState<number>()

  const ref1: any= useRef({})
  const ref2: any= useRef({})


  useEffect(()=>{
    if (currentNode.answer && currentNode.phrase){
      if (currentNode.answer == currentNode.phrase){
        setCorrectAnswers([...correctAnswers, 1])
        
        ref1.current[currentNode.phrase].style.pointerEvents = 'none'
        ref2.current[currentNode.answer].style.pointerEvents = 'none'
        ref1.current[currentNode.phrase].style.cursor = 'not-allowed'
        ref2.current[currentNode.answer].style.cursor = 'not-allowed'
        ref1.current[currentNode.phrase].style.borderColor = 'green'
        ref2.current[currentNode.answer].style.borderColor = 'green'
        ref1.current[currentNode.phrase].style.opacity = 0.65
        ref2.current[currentNode.answer].style.opacity = 0.65
        

        console.log(ref1.current[currentNode.answer].style, ref2.current[currentNode.answer].style)
      }
      else{
        
      }
      //Do animation to show right answer instead of timeout
      setTimeout(()=>{
        setSelectedA(undefined)
        setSelectedP(undefined)
      }, 300)
      
      setCurrentNode({phrase: '', answer: ''})
    }
    if(correctAnswers.length==matches.length){
      setUserHasAnswered({answered:true, answeredRight: null})
      setAnswers({...answers, phrases: [...answers.phrases, phrase.id]})
    }
  }, [currentNode])

  
  return (
    <div className="pairContainer">

    
      <div className="phrase">
        {phrases.map((match: any)=> {
          return <button key={match.index} 
          className={selectedP == match.index ? "cssSelectedp" : "cssNotSelectedp"} 
          id={`${match.index}`} 
          onClick={(e)=>{
            setCurrentNode({...currentNode, phrase:e.currentTarget.id}); 
            setSelectedP(Number(e.currentTarget.id));
          }}
          ref={element => {
            if(element) {
              ref1.current[match.index] = element
            } else {
              delete ref1.current[match.index]
            }
          }}>{match.phrase}</button>
        })}
      </div>

      <div className="answers">
        {answerChoices.map((match: any)=> {
          return <button key={match.index} 
          className={selectedA == match.index ? "cssSelecteda" : "cssNotSelecteda"} 
          id={`${match.index}`}
          ref={element => {
            if(element) {
              ref2.current[match.index] = element
            } else {
              delete ref2.current[match.index]
            }}}
          onClick={(e)=>{setCurrentNode({...currentNode, answer:e.currentTarget.id}); 
          setSelectedA(Number(e.currentTarget.id))}}>
          {match.answer}</button>})
          }
      </div>

    </div>
  )
}

export default matchPairs