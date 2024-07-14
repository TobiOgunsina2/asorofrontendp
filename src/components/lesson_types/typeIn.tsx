import React from 'react'

import { useContext, useEffect, useRef, useState } from "react"
import MyContext from "../../context/Context"
import './typeIn.css'

const TypeIn = ({phrase}: {phrase:any}) => {
  const {userHasAnswered, setUserHasAnswered} = useContext(MyContext)
  const [inputValue, setInputValue] = useState('');
  const [nextTyped, setNextTyped] = useState(0);


  let refs = useRef<any>([]);
  refs.current = phrase.text.split('').map((_: any, i: any) => refs.current[i] ?? React.createRef())

  
  useEffect(() => {
    refs.current[0].current.focus()
  }, []);
  

  const checkAnswers = () =>{
    let userAnswer = ''
    for (let i in refs.current){
      if (refs.current[i]){
        if (refs.current[i].current == null){
          refs.current[i]=null
          userAnswer+=' '
        }else{
          userAnswer+=(refs.current[i].current.value)
        }
      }
    }

    console.log(userAnswer, phrase.text)
    setUserHasAnswered({answered:true, answeredRight: true})
  }

  const handleButtonClick = (char: any) => {
    if(refs.current[nextTyped].current){
      refs.current[nextTyped].current.value=char
      refs.current[Number(nextTyped)+1].current.focus()
    }
  };

  const handleType = (e: any)=>{
    if (e.key=='delete' || e.key=='Backspace' && e.target.id !='0' && e.target.value==''){
      if(refs.current[Number(e.target.id)-1].current==null){
        refs.current[Number(e.target.id)-2].current.focus()
        setNextTyped(refs.current[Number(e.target.id)-2].current.id)
      }
      else{
        refs.current[Number(e.target.id)-1].current.focus()
        setNextTyped(refs.current[Number(e.target.id)-1].current.id)

      }
    }
    if (e.key!='delete' && e.key!='Backspace' && e.target.value!='' && e.target.id!==refs.current[refs.current.length-1].current.id){
      if(refs.current[Number(e.target.id)+1].current==null){
        refs.current[Number(e.target.id)+2].current.focus()
        setNextTyped(refs.current[Number(e.target.id)+2].current.id)
      }
      else{
        refs.current[Number(e.target.id)+1].current.focus()
        setNextTyped(refs.current[Number(e.target.id)+1].current.id)
      }
    }
  }


  const yorubaCharacters = ['á','à', 'é', 'è','ẹ', 'ẹ́','ẹ̀', 'í','ì', 'ó', 'ò','ọ','ọ́', 'ọ̀','ú', 'ù','ṣ', 'ń',];
  return (
    <div className="typeIn-container">
      <label htmlFor="yoruba-input" className="yoruba-input">Type <span className="inText english">{phrase.phraseTranslation}</span> in Yoruba:</label>
      <div className="type-in-boxes">
        {phrase.text.split('').map((letter: any, index: number)=>{
          return <div key={index} className={`typeIn-box ${letter==' ' ? 'type-in-space': ''}`}>{letter==' ' ? '' :<input maxLength={1} onKeyDown={handleType} onChange={handleType} ref={refs.current[index]} id={String(index)} className="typeIn-input" type="text" />}</div>
        })}
      </div>
      <div className="type-character-div">
        {yorubaCharacters.map((char) => (
          <button key={char} onClick={() => handleButtonClick(char)}>
            {char}
          </button>
        ))}
      </div>
      <button className="type-checkAnswers" onClick={checkAnswers}>Check Answers</button>
    </div>
  )
}

export default TypeIn
