import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import lessonComponents from '../lesson_types/importComponents'
import LessonComplete from './LessonComplete'
import api from '../../context/api'
import MyContext from '../../context/Context'
import './lessonPage.css'
import Loader from '../pages/page_components/loader'


const LessonPage = () => {
  const [slides, setSlides] = useState<any>([])
  const [slideNumber, setSlideNumber] = useState(0)
  const {userHasAnswered, setUserHasAnswered} = useContext(MyContext)
  const {answers} = useContext(MyContext)
  const [progress, setProgress] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  const { uid } = useParams()
  const { lid } = useParams()

  useEffect(()=>{
    getSlides()
  }, [])

  interface dataInterface {
    id: number,
    lessonName: string,
    lessonType: string,
    sentences: [],
    phrases: [],
    unit: number,
    words: []
  }

  const createSlidesOrder = (data: dataInterface)=>{
    const lessonOrder = data.lessonType.split(' ')

    let components: [any]= [0]
    components.pop()
    let phrase: any = {}

    for (let i=0; i<lessonOrder.length; i++){
        switch(lessonOrder[i][0]) {
            case "p":
              phrase = data.phrases[Number(lessonOrder[i][1])-1]
            break;
            case 'w':
              phrase = data.words[Number(lessonOrder[i][1])-1]
            break;
            case 's':
              phrase = data.sentences[Number(lessonOrder[i][1])-1]
            break;
        }
        switch(lessonOrder[i][2]) {
          case "i":
            console.log(phrase)
            components.push(<lessonComponents.wordIntro key={phrase.id} phrase={phrase}/>)
          break;
          case 'm':
            components.push(<lessonComponents.multipleChoice key={phrase.id} phrase={phrase}/>)
          break;
          case 't':
            components.push(<lessonComponents.multipleChoice key={phrase.id} phrase={phrase}/>)
          break;
          case 'y':
            if (lessonOrder[i][3]){
              components.push(<lessonComponents.trueFalse key={phrase.id} phrase={{...phrase, answer:'same'}} />)
            }
            components.push(<lessonComponents.trueFalse key={phrase.id} phrase={phrase}/>)
          break;
          case 'b':
            components.push(<lessonComponents.sentenceBlockBuild key={i} phrase={phrase}/>)
          break;
          case 'f':
            if (lessonOrder[i][3]){
              console.log(data.sentences[Number(lessonOrder[i][3])-1])
              console.log(phrase)
              console.log(data.sentences)
              components.push(<lessonComponents.fillInSentenceGap key={phrase.id} phrase={data.phrases[Number(lessonOrder[i][3])-1]} sentence={phrase}/>)
            }
            break;
          case 'p':
            if (lessonOrder[i][3]){
              let x=3
              let phrases: [] = []
              while (x<lessonOrder[i].length){
                phrases.push(data.phrases[Number(lessonOrder[i][x])-1])
                x+=1
              }
              components.push(<lessonComponents.matchPairs key={phrase.id} otherPhrases={[phrases]} phrase={phrase} />)
            }
            else{
              components.push(<lessonComponents.matchPairs key={phrase.id} phrase={phrase}/>)
            }
          break;
      }
    }
    components.push(<LessonComplete accuracy={1} lesson={Number(lid)} />)
    return components
}
    

  const getSlides = () => {
    api
      .get(`/api/unit/${uid}/lesson/${lid}/`)
      .then((res) => res.data)
      .then((data)=> {
        console.log(data)
        setSlides(createSlidesOrder(data[0]))    
      })
      .then(()=>{
        setTimeout(()=>{setIsLoading(false)}, 400)
      })
      .catch((err)=> console.log(err))
  } 

  const changeLessonComponent = () => {
    if(userHasAnswered.answeredRight==false){
      let temp = slides
      temp.splice(slides.length-1, 0, slides[slideNumber])
      setSlides(temp)
      setAccuracy(accuracy-1)
    }
    if (slideNumber==(slides.length-2)){
      let temp = slides
      temp.pop()
      temp.push(<LessonComplete key={slides.length} accuracy={(slides.length+accuracy)/slides.length} lesson={Number(lid)} />)
      setSlides(temp)
    }

    setSlideNumber(slideNumber+1)
    setUserHasAnswered({answered:false, answeredRight: null})
    setProgress((slideNumber+2)/slides.length)
  }

  const navigate = useNavigate()

  return (
    <div className='lesson-page' style={userHasAnswered.answered && (userHasAnswered.answeredRight || userHasAnswered.answeredRight==false) ? {height:'106vh'} : {}}>
      <header className='lesson-header'>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{width: `${progress*100}%`}}></div>
        </div>
        
        <svg onClick={()=>{if(confirm('Are you sure you want to exit the lesson?')){navigate('/learn')}}} xmlns="http://www.w3.org/2000/svg" fill="black" width="2.3vw" height="2.3vw" viewBox="-3.5 0 19 19" className="cf-icon-svg"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"/></svg>

      </header>
      
      <div className="lesson-slide">
        {slides[slideNumber]}
      </div>
      
      

    
      {(slideNumber<slides.length-1 && userHasAnswered.answered && userHasAnswered.answeredRight)
      ? 
      <footer className="lesson-footer correct">
        <h3>Good Job!</h3>
        <button onClick={changeLessonComponent}>Continue</button>
      </footer>:
      (slideNumber<slides.length-1 && userHasAnswered.answered && userHasAnswered.answeredRight===false)
      ? <footer className="lesson-footer wrong">
        <h3>Wrong. The correct answer would be {}</h3>
        <button onClick={changeLessonComponent}>Continue</button>
      </footer>
      : (slideNumber<slides.length-1 && userHasAnswered.answered)
      ? <footer className="lesson-footer done">
        <button onClick={changeLessonComponent}>Continue</button>
      </footer>
      : <h1></h1>
      }
    </div>
  )
}

export default LessonPage
