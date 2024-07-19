import React from 'react'
import { useContext, useEffect, useRef, useState } from "react"
import MyContext from "../../context/Context"
import './typeIn.css'

const TypeIn = ({phrase}: {phrase:any}) => {
  const {userHasAnswered, setUserHasAnswered} = useContext(MyContext)
  const [nextTyped, setNextTyped] = useState(0);
  const [typeShift, setTypeShift] = useState(false)
  let formRef = useRef<any>();

  const specialSplit =(word: any)=>{
    let splitWord: any[] = []
    let i: number
    for (i in word){
      if(word[i].charCodeAt() == 803){
        if (splitWord[i-1] == 'è'){splitWord[i-1] = 'ẹ̀'}
        if (splitWord[i-1] == 'é'){splitWord[i-1] = 'ẹ́'}
        if (splitWord[i-1] == 'ó'){splitWord[i-1] = 'ọ́'}
        if (splitWord[i-1] == 'ọ̀'){splitWord[i-1] = 'ọ̀'}
      }
      else{
        splitWord.push(word[i])
      }
    }
    return splitWord
  }

  const splitPhrase = specialSplit(phrase.text)

  let refs = useRef<any>([]);
  refs.current = splitPhrase.map((_: any, i: any) => refs.current[i] ?? React.createRef())


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

    if(userAnswer.toLowerCase()==phrase.text.toLowerCase() || String(userAnswer.toLowerCase()).localeCompare(String(phrase.text.toLowerCase()))==0){
      setUserHasAnswered({answered:true, answeredRight: true})
    }
    else{
      setUserHasAnswered({answered:true, answeredRight: false})
    }
  }


  const handleButtonClick = (char: any) => {
    if(refs.current[nextTyped].current){
      refs.current[nextTyped].current.value=char
      
      if(nextTyped<refs.current.length-1){
        if(refs.current[Number(nextTyped)+1].current){
          refs.current[Number(nextTyped)+1].current.focus()
          setNextTyped(Number(nextTyped)+1)
        }
        else if(refs.current[Number(nextTyped)+2].current){
          refs.current[Number(nextTyped)+2].current.focus()
          setNextTyped(Number(nextTyped)+2)
        }
      }
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

    if(refs.current[e.target.id].current.id !=1){
      setTypeShift(true)
    }
  }
  
  const yorubaCharacters = ['á','à','é','è','ẹ','ẹ́','ẹ̀','í','ì','ó','ò','ọ','ọ́','ọ̀','ú','ù','ṣ'];
  const upperCaseCharacters = ['Á','À','É','È','Ẹ','Ẹ́','Ẹ̀','Í','Ì','Ó','Ò','Ọ','Ọ́','Ọ̀','Ṣ','Ú','Ù']

  const changeShift=()=>{
    setTypeShift(!typeShift)
  }

  const lowerCaseOptions = yorubaCharacters.filter(element => splitPhrase.map(v => v.toLowerCase()).includes(element))
  const upperCaseOptions = upperCaseCharacters.filter(element => splitPhrase.map(v => v.toUpperCase()).includes(element))
  
  return (
    <div className="typeIn-container">
      <label htmlFor="yoruba-input" className="yoruba-input">Type <span className="inText english">{phrase.phraseTranslation}</span> in Yoruba:</label>
      
      <video className='lesson-video' src="" width={200} height={200}></video>
      <form action='' ref={formRef} onSubmit={(e)=>{e.preventDefault()}} className="type-in-boxes">
        {splitPhrase.map((letter: any, index: number)=>{
          return (
            <div key={index}  className={`typeIn-box ${letter==' ' ? 'type-in-space': ''}`}>
            {letter==' ' ? '' :
            <input maxLength={1} onKeyDown={handleType} onChange={handleType} ref={refs.current[index]} id={String(index)} className={`typeIn-input ${userHasAnswered.answeredRight ? 'space-green': ''}`} type="text" />}
            </div>
          )
        })}
      </form>
      <div className="type-character-div">
        {!(lowerCaseOptions.length==0 || upperCaseOptions.length==0) ? <button onClick={changeShift} className='shift' >shift</button>: ''}
        {(typeShift ? lowerCaseOptions : upperCaseOptions).map((char, index) => (
          <button  key={index} onClick={() => handleButtonClick(char)}>
            {char}
          </button>
        ))}
      </div>

      <button className="type-checkAnswers" onClick={checkAnswers}>Check Answers</button>
    </div>
  )
}

export default TypeIn
