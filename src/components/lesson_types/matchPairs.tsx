// import React from 'react'

import { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../../context/Context";
import './matchPair.css'  

const shuffleArray = (matchingData: any) => {
  return matchingData.slice().sort(() => Math.random() - 0.5);
};

interface propType {
  answer: string,
  audio: string,
  dialogue:string,
  id:1,
  image: string,
  lesson:1,
  note:string,
  options:string,
  phrase: any,
  prompt: string,
  sentence: {containedPhrases: any[],containedWords: any[],order: string},
  slideType: string,
  video:""
}

  
function matchPairs(props: propType) {
  let {id,answer,audio,image,lesson,phrase,prompt, options, sentence,video} = props
  let otherPhrases = ['', '']
  const {answers, setAnswers} = useContext(MyContext)
  console.log(options)

  const [matches, setMatches] = useState(phrase && !options ?[...phrase].map((choice: any, index: number)=>{
    return {phrase:choice.text, answer:choice.translation, index: index}})
  : options.split('#').filter(value=>value!='').map(
    (option, index)=>
      {return {phrase:option, answer: audio? audio.split(',')[index]: answer? answer.split('#').filter(value=>value!='')[index] : '', index: index}
  }))

  const [phrases, setPhrases] = useState(shuffleArray([...matches]))
  const [answerChoices, setAnswerChoices] = useState(shuffleArray([...matches]))


  const {setUserHasAnswered} = useContext(MyContext)
  const [currentNode, setCurrentNode] = useState({phrase: '', answer: ''})
  
  const [correctAnswers, setCorrectAnswers] = useState<any>([])
  const [selectedA, setSelectedA] = useState<number>()
  const [selectedP, setSelectedP] = useState<number>()

  const ref1: any= useRef({})
  const ref2: any= useRef({})

  useEffect(()=>{
    setUserHasAnswered({answered:false, answeredRight: null})
  }, [])


  useEffect(()=>{
    if (currentNode.answer && currentNode.phrase){
      if (currentNode.answer == currentNode.phrase){
        setCorrectAnswers([...correctAnswers, 1])
        
        ref1.current[currentNode.phrase].style.pointerEvents = 'none'
        ref2.current[currentNode.answer].style.pointerEvents = 'none'
        ref1.current[currentNode.phrase].style.cursor = 'not-allowed'
        ref2.current[currentNode.answer].style.cursor = 'not-allowed'
        ref1.current[currentNode.phrase].style.border = '2px solid'
        ref2.current[currentNode.answer].style.border = '2px solid'
        ref1.current[currentNode.phrase].style.borderColor = 'green'
        ref2.current[currentNode.answer].style.borderColor = 'green'
        ref1.current[currentNode.phrase].style.opacity = 0.8
        ref2.current[currentNode.answer].style.opacity = 0.8

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
      setUserHasAnswered({answered:true, answeredRight: true})
      setAnswers({...answers, phrases: [...answers.phrases, phrase[0].id]})
    }
  }, [currentNode])

  
  return (
    <>
    <h1 className="match-prompt">Match the Phrases</h1>
    <div className="match-container">
    
      <div className="match-phrases">
        {phrases.map((match: any)=> {
          return <button key={match.index} 
          className={`match-options ${selectedP == match.index ? "cssSelectedp" : "cssNotSelectedp"}`} 
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

      <div className="match-answers">
        {answerChoices.map((match: any)=> {
          if (audio){
            return <button key={match.index} 
          className={`match-options ${selectedA == match.index ? "cssSelecteda" : "cssNotSelecteda"}`} 
          id={`${match.index}`}
          ref={element => {
            if(element) {
              ref2.current[match.index] = element
            } else {
              delete ref2.current[match.index]
            }}}
          onClick={(e)=>{setCurrentNode({...currentNode, answer:e.currentTarget.id}); 
          setSelectedA(Number(e.currentTarget.id))}}>
          <audio id="audio" className="match-audio" controls>
            <source src="your-audio-file.mp3" type="audio/mpeg"/>
            Your browser does not support the audio element.
        </audio>{/*match.answer*/}</button>
          }
          else{
            return <button key={match.index} 
          className={`match-options ${selectedA == match.index ? "cssSelecteda" : "cssNotSelecteda"}`} 
          id={`${match.index}`}
          ref={element => {
            if(element) {
              ref2.current[match.index] = element
            } else {
              delete ref2.current[match.index]
            }}}
          onClick={(e)=>{setCurrentNode({...currentNode, answer:e.currentTarget.id}); 
          setSelectedA(Number(e.currentTarget.id))}}>
          {match.answer}</button>
          }

          })
          }
      </div>

    </div>
    </>

  )
}

export default matchPairs