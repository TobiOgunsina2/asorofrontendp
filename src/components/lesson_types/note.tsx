// import React from 'react'
import { useContext, useEffect } from 'react'
import MyContext from "../../context/Context"

import './note.css'


interface propType {
  answer: string,
  audio: string,
  dialogue:string,
  id: number,
  image: string,
  lesson: number,
  note: {note: string},
  options:string,
  phrase: any,
  prompt: string,
  sentence: {containedPhrases: any[],containedWords: any[],order: string, translation: string},
  slideType: string,
  video:""
}

const note = (props: propType) => {
  let {id,answer,audio,image,lesson, note, slideType, options, phrase,prompt,sentence,video} = props

  const {setUserHasAnswered} = useContext(MyContext)

  useEffect(()=>{
    setUserHasAnswered({answered:true, answeredRight: null})
  }, [])
  return (
    <div className="note">
      {note.note.startsWith('video') ? 
      <iframe
        src={note.note.split('-')[1]}
        frameBorder="0"
        className='note-video'
        allow='autoplay; encrypted-media'
        allowFullScreen
        title='video'
      /> : <></>}
      {note.note}
    </div>
  )
}

export default note
