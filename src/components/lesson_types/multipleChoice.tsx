// import React from 'react'

import { useContext, useEffect, useState } from "react"
import MyContext from "../../context/Context"
import './multipleChoice.css'
import api from "../../context/api"


interface propType {
  answer: string,
  audio: string,
  dialogue:string,
  id: number,
  image: string,
  lesson: number,
  note:string,
  options:string,
  phrase: any,
  prompt: string,
  sentence: {containedPhrases: any[],containedWords: any[],order: string, translation: string},
  slideType: string,
  video:""
}


const multipleChoice = (props: propType) => {
  let {id,answer,audio,image,lesson, slideType, options, phrase,prompt,sentence,video} = props

  let [choices, setChoices]: any = useState(options 
  ? [...options.split('#').filter(value=>value!='').map((option: string)=>{
      return {text: option}
      }), {text: answer, isRight: true}]
  : !sentence ?[phrase[0]] : sentence)

  const {answers, setAnswers} = useContext(MyContext)
  let {userHasAnswered, setUserHasAnswered} = useContext(MyContext)
  
  useEffect(()=>{
    if(slideType=='t' && !options){
      api
        .get(`/api/phrase/${phrase[0].relatedPhrases[0]}/`)
        .then((res) => res.data)
        .then((data)=> {
            console.log(data)
            phrase[0].relatedPhrases.push(data[0])
            setChoices([{...phrase[0], isRight:true}, data[0]])
          })
        .catch((err)=> console.log(err))
    }
    else if(!options){
      let rest: any[] = []
      for (let i in phrase[0].relatedPhrases){
        api
          .get(`/api/phrase/${phrase[0].relatedPhrases[i]}/`)
          .then((res) => res.data)
          .then((data)=> {
              rest.push(data[0])
            })
          .catch((err)=> console.log(err))
      }
      setChoices([phrase[0], ...rest])
    }
    console.log(choices)
    setUserHasAnswered(false)
  }, [])

  const handleChoice = (e:any) => {
    if (e.target.value){
      setUserHasAnswered({answered:true, answeredRight: true})
      setAnswers({...answers, phrases: [...answers.phrases, phrase[0].id]})
    }
    else{
      console.log(e.target.value)
      setUserHasAnswered({answered:true, answeredRight: false})
      setAnswers({...answers, phrases: [...answers.phrases, phrase[0].id]})
    }
  }

  return (
    <div className="multiple-choice-slide">
      {
      prompt?<h1 className="mcq-question">{prompt}</h1>
      :<h1 className="mcq-question">What is "<span className="inText english">{!sentence ?phrase[0].translation: sentence.translation}</span>" in Yoruba</h1>}
      
      <div className="slide-media">
        {video ? <video src="" className="word-video"></video> :<></>}
        {audio ? <audio id="audio" className="word-audio" controls>
            <source src="your-audio-file.mp3" type="audio/mpeg"/>
            Your browser does not support the audio element.
        </audio>:<></>}
        {image ? <img src={``} className="word-image"></img> :<></>}
      </div>
      <section className={`multi-choice-container ${choices.length==4 ? 'four-choice': choices.length==3 ? 'three-choice': 'two-choice'} ${userHasAnswered.answered ? 'question-answered': ''}`}>

        {choices.slice(0, slideType=='t'? 2:4).map((choice:any, index: number)=>{
          return <button key={index} value={choice.isRight} onClick={handleChoice} className={`multi-choice ${choice.text==phrase.text && userHasAnswered.answeredRight ? 'correct-mcq' : ''} ${choice.id}`}>
            {choice.text}
          </button>
        })}
      </section>
    </div>
  )
}

export default multipleChoice
