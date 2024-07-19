// import React from 'react'
import SentenceBox from "./fillIn/SentenceBox";
import AnswerBox from "./fillIn/AnswerBox";
import { getSentence, getAnswers } from "./fillIn/TextConverter";

//import { AppContainer, PrimaryButton } from "./fillIn/styled";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/Context";
import './fillIn/fillIn.css'


export default function fillInSentenceGap({sentence, phrase}: {sentence: any, phrase: any}) {

  const {answers, setAnswers} = useContext(MyContext)

  useEffect(()=>{
    return ()=>setAnswers({...answers, sentences: [...answers.sentences, sentence.id]})
  }, [])

  let preText = sentence.text.split(' ')
  for (let i in sentence.text.split(' ')){
    for (let x in sentence.text.split(' ')){
      if (sentence.text.split(' ')[i] ==phrase.text.split(' ')[x]){
        preText[i] = `<${sentence.text.split(' ')[i]}>`
      }
    }
  }
  
  const text = preText.join(' ')

  const [wrong, setWrong] = useState(false)
  const [state, setState] = useState({
    showResults: false,
    question: "",
    answers: Array.from(new Set(getAnswers(text).concat(...phrase.relatedPhrases.map((i: any)=>{return i.text.split(' ')}).flat()))),
    sentence: getSentence(text)
  });

  const onDrop = (e: any, dropId:any) => {
    const text = e.dataTransfer.getData("text");

    const sentence = state.sentence.map(word => {
      if (word.id === dropId) {
        return { ...word, placed: true, displayed: text };
      }
      return word;
    });
    setState({ ...state, sentence });
  };
  

  const test = () => {
    setState({ ...state, showResults: !state.showResults });
  };

  const { showResults } = state;

  const {userHasAnswered, setUserHasAnswered} = useContext(MyContext)

  const getResults = (data: any[]) => {

    let f =  data.reduce((acc, cur) => {
      if (cur.type === "answer" && userHasAnswered.answered==false) {
        if (!wrong){
          let s = `word [${cur.text}] `;
          if (!cur.placed) {
            s += "has not been placed";
            console.log(s)
            if(showResults && userHasAnswered.answeredRight!=false){
              setUserHasAnswered({answered:true, answeredRight: false})
              setState({...state, showResults: true})
            }
          } 
          else {
            if (!(cur.text === cur.displayed)){
              if (showResults){
                setUserHasAnswered({answered:true, answeredRight: false})
                setState({...state, showResults: true})
              }
              s.concat("has not been placed correctly")
              setWrong(true)
              return acc.concat(s)
            } 
            else {
              if (showResults){
                setUserHasAnswered({answered:true, answeredRight: true})
                setState({...state, showResults: true})
              }
              s.concat("correct!")
            }
          } 
          return acc.concat(s);
        }
        else if (showResults && userHasAnswered.answeredRight!=false){
          setUserHasAnswered({answered:true, answeredRight: false})
        }
      }
      return acc;
    }, []);
    
    return f
  };

  const results = getResults(state.sentence);
  

  return (
    <div className="AppContainer">
      <h2 className="header">Fill in the blank</h2>
      <h4>What is <span>'{sentence.sentenceTranslation}'</span> in yoruba</h4>

      <SentenceBox
        marked={showResults}
        onDrop={onDrop}
        sentence={state.sentence}
      />
      <AnswerBox answers={state.answers} />
      <div>
        <div className="PrimaryButton" onClick={test}>Check result</div>
      </div>
      {showResults ? <div>
        {results.map((s: any, i: any) => (
          <p key={i}>{s}</p>
        ))}
      </div>: <h1></h1>}
    </div>
  );
}
