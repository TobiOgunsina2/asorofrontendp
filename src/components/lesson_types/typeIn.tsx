// import React from 'react'

import { useContext, useState } from "react"
import MyContext from "../../context/Context"
import './typeIn.css'

const TypeIn = ({phrase}: {phrase:any}) => {
  const {userHasAnswered, setUserHasAnswered} = useContext(MyContext)


  const checkAnswers = () =>{
    setUserHasAnswered({answered:true, answeredRight: true})
  }
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (char: any) => {
    setInputValue((prevValue) => prevValue + char);
  };

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };


  const yorubaCharacters = ['á','à', 'é', 'è','ẹ', 'ẹ́','ẹ̀', 'í','ì', 'ó', 'ò','ọ','ọ́', 'ọ̀','ú', 'ù','ṣ', 'ń',];

  return (
    <div className="typeIn">
      <label htmlFor="yoruba-input">Type <span>{phrase.phraseTranslation}</span> in Yoruba:</label>
      <input
        id="yoruba-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="type-box"
        placeholder="Type Yoruba here..."
      />
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
