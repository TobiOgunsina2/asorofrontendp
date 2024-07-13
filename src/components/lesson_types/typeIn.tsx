// import React from 'react'

import { useContext, useEffect, useState } from "react"
import MyContext from "../../context/Context"
import './typeIn.css'

const TypeIn = ({phrase}: {phrase:any}) => {
  const {userHasAnswered, setUserHasAnswered} = useContext(MyContext)
  const [inputValue, setInputValue] = useState('');

  const checkAnswers = () =>{
    setUserHasAnswered({answered:true, answeredRight: true})
  }

  const handleButtonClick = (char: any) => {
    setInputValue((prevValue) => prevValue + char);
  };

  const handleChange = (event: any) => {
    let temp = inputValue.split('')
    
    temp[Number(event.target.id)] = event.target.value 
    setInputValue(temp.join(''));
    console.log(inputValue)
  };


  const yorubaCharacters = ['á','à', 'é', 'è','ẹ', 'ẹ́','ẹ̀', 'í','ì', 'ó', 'ò','ọ','ọ́', 'ọ̀','ú', 'ù','ṣ', 'ń',];
  return (
    <div className="typeIn-container">
      <label htmlFor="yoruba-input" className="yoruba-input">Type <span className="inText english">{phrase.phraseTranslation}</span> in Yoruba:</label>
      <div className="type-in-boxes">
        {phrase.text.split('').map((l: any, index: number)=>{
          return <div className={`typeIn-box ${l==' ' ? 'type-in-space': ''}`}>{l==' ' ? '': <input maxLength={1} id={String(index)} onChange={handleChange} value={inputValue[index]} className="typeIn-input" type="text" />}</div>
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
