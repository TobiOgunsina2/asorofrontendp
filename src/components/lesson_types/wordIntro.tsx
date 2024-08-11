// import React from 'react'

import { useContext, useEffect } from "react"
import MyContext from "../../context/Context"
import './wordIntro.css'


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

const wordIntro = (props: propType) => {
  const {setUserHasAnswered} = useContext(MyContext)
  const {answers, setAnswers} = useContext(MyContext)

  //  let phrase = {id: 1,brokenDownPhrase: '', containedWords: [], wordNote: '', text: '', phraseTranslation: '', wordTranslation: ''}

  let {id,answer,audio,image,lesson,phrase,prompt,sentence,video} = props

  phrase = phrase[0]
  let splitPhrase

  if (answer){
    splitPhrase = [{word: answer.match(/^(.*?)(?=-)/), wordExplantion: {text: answer.match(/(?<=-).*/)}}]
  }
  else if (sentence){ //Sentence Processing
    let order = sentence.order.split(' ').map((sentenceSection: string)=>{
      if(sentenceSection[0]=='p'){
        return sentence.containedPhrases[Number(sentenceSection[1])]
      }
      else if(sentenceSection[0]=='w'){
        return sentence.containedWords[Number(sentenceSection[1])]
      }
    })
    splitPhrase = phrase.brokenDownPhrase ?phrase.brokenDownPhrase.split('1').map((word: string, index: number)=>{
      return {word: word, wordExplanation: order[index]}
    }) : [{word: phrase.text, wordExplanation: {text: phrase.note}}]

  }else{ //Phrase Processing
    splitPhrase = phrase.brokenDownPhrase ?phrase.brokenDownPhrase.split('1').map((word: string, index: number)=>{
      return {word: word, wordExplanation: phrase.containedWords[index]}
    }) : [{word: phrase.text, wordExplanation: {text: phrase.note}}]
  }
  useEffect(()=>{
    setUserHasAnswered({answered:true, answeredRight: null})
    setAnswers({...answers, phrases: [...answers.phrases, phrase.id]})
  }, [])

  console.log(answer)

  // https://codepen.io/worksbyvan/pen/mqZENj?editors=0110

  return (
    <div className="word-intro">
      <h1 className="intro-instruction">{prompt? prompt:'Look, something new!'}</h1>
      <div className="video-component">
        {video ? 
          <video className="word-video" /*CDN Link*/src={`https://video-link/${video}`}></video>:
          <video className="word-video" /*CDN Link*/src={`https://video-link/${lesson+id}`}></video>
        }
        <h2>{answer ? answer.match(/^[^-]*[^ -]/) :splitPhrase.map((word: any, index: number)=>{
          if (word.wordExplanation){

          return (<span key={index} className="annotation">
            <span className="annotation-text">
            {word.wordExplanation.text} <span className="word-meaning">{word.wordExplanation.translation} </span>
            </span>
            <span className="annotation-symbol">
              {word.word}&nbsp;
            </span>
            </span>)
        }})}</h2>
        <h4>{phrase.translation && !answer ? phrase.translation : !answer? phrase.translation.replace(/\s*\(.*?\)\s*-\s*/g, ''): answer.replace(/.*?-/, "").trim()}</h4>
      </div>
    </div>
  )
}

export default wordIntro
