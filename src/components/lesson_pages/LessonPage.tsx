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
    lessonOrder: string,
    sentences: [],
    phrases: [],
    unit: number,
    words: [],
    slides: any[]
  }

  const createSlidesOrder = (data: dataInterface)=>{
    const rawSlides = data.slides
    
    rawSlides.sort((a, b) => a.id - b.id);

    let components: [any]= [0]
    components.pop()
    let phrase: any = {}

    for (let i=0; i<data.slides.length; i++){
        switch(data.slides[i].slideType) {
          case "i":
            components.push(<lessonComponents.wordIntro key={data.slides[i].id} {...data.slides[i]}/>)
          break;
          case 'm':
            components.push(<lessonComponents.multipleChoice key={data.slides[i].id} {...data.slides[i]}/>)
          break;
          case 't':
            components.push(<lessonComponents.multipleChoice key={data.slides[i].id} {...data.slides[i]}/>)
          break;
          case 'y':
            components.push(<lessonComponents.trueFalse key={data.slides[i].id} {...data.slides[i]}/>)
          break;
          case 'b':
            components.push(<lessonComponents.sentenceBlockBuild key={data.slides[i].id} {...data.slides[i]}/>)
          break;
          case 'f':
              components.push(<lessonComponents.fillInSentenceGap key={data.slides[i].id} {...data.slides[i]}/>)
            break;
          case 'p':   
            components.push(<lessonComponents.matchPairs key={data.slides[i].id} {...data.slides[i]}/>)
            break;
          case 'n':   
            components.push(<lessonComponents.note key={data.slides[i].id} {...data.slides[i]}/>)
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
