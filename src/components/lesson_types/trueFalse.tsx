// import React from 'react'
import './trueFalse.css'

import { useContext, useEffect, useRef, useState } from "react"
import api from "../../context/api"
import MyContext from "../../context/Context"

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

const trueFalse = (props: propType) => {
  let {id,answer,audio,image,lesson, slideType, options, phrase,prompt,sentence,video} = props

  const [questionAnswer, setQuestionAnswer] = useState('')
  let {setUserHasAnswered} = useContext(MyContext)
  const {answers, setAnswers} = useContext(MyContext)

  const trueButton = useRef<any>() 
  const falseButton = useRef<any>()
  
  useEffect(()=>{
    if (prompt && answer){

    }
    else{
      let random_boolean = Math.random() < 0.5
      if (!phrase[0].relatedPhrases[0]){
        setQuestionAnswer(phrase[0].translation)
      }
      else if(phrase[0].relatedPhrases){
        api
        .get(`/api/phrase/${phrase[0].relatedPhrases[0]}/`)
        .then((res) => res.data)
        .then((data)=> {
            setQuestionAnswer(data[0].translation)
          })
        .catch((err)=> console.log(err))
      }
    }
    setUserHasAnswered({answered:false, answeredRight: null})
  }, [])
  
  const handleClick = (e: any) => {
    if ((phrase[0].translation===questionAnswer).toString()===e.target.className) {
      if (e.target.className=='true'){
        trueButton.current.style.border = '1.3px solid rgb(26, 222, 85)'
        trueButton.current.style.outline = 'none'
      }
      else{
        falseButton.current.border = '1.3px solid rgb(26, 222, 85)'
      }
      setUserHasAnswered({answered:true, answeredRight: true})
      setAnswers({...answers, phrases: [...answers.phrases, phrase[0].id]})
    }
    else{
      setUserHasAnswered({answered:true, answeredRight: false})
      setAnswers({...answers, phrases: [...answers.phrases, phrase[0].id]})
      // Add component back to stack for half points
    }
  }
  

  return (
    <div className='true-false'>
      <div className="slide-media">
        {video ? <video src="" className="word-video"></video> :<></>}
        {audio ? <audio id="audio" className="word-audio" controls>
            <source src="your-audio-file.mp3" type="audio/mpeg"/>
            Your browser does not support the audio element.
        </audio>:<></>}
        {image ? <img src={``} className="word-image"></img> :<></>}
      </div>
      {prompt 
      ? <div className="question"><h1>{prompt}</h1></div> 
      : <div className="question"><h1>Does <span className="inText yoruba">{phrase[0].text}</span> mean <span className="inText english">{questionAnswer}</span></h1></div>
      }
      <button ref={trueButton} className="true" onClick={handleClick}>True</button>
      <button ref={falseButton} className="false" onClick={handleClick}>False</button>
    </div>
  )
}

export default trueFalse
