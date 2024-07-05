import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import lessonComponents from '../lesson_types/importComponents'
import LessonComplete from './LessonComplete'
import api from '../../context/api'
import MyContext from '../../context/Context'

const LessonPage = () => {
  const [slides, setSlides] = useState<any>([])
  const [slideNumber, setSlideNumber] = useState(0)
  const {userHasAnswered, setUserHasAnswered} = useContext(MyContext)
  const {answers} = useContext(MyContext)
  
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
        }
        switch(lessonOrder[i][2]) {
          case "i":
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
            components.push(<lessonComponents.sentenceBlockBuild key={phrase.id} phrase={phrase}/>)
          break;
          case 'f':
            if (lessonOrder[i][3]){
              console.log(data.sentences[Number(lessonOrder[i][3])-1])
              components.push(<lessonComponents.fillInSentenceGap key={phrase.id} phrase={phrase} sentence={data.sentences[Number(lessonOrder[i][3])-1]}/>)
            }
            break;
          case 'p':
            if (lessonOrder[i][3]){
              let x=3
              let phrases: [] = []
              console.log(lessonOrder[i].length-1)
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
    components.push(<LessonComplete lesson={Number(lid)} />)
    return components
}
    

  const getSlides = () => {
    api
      .get(`/api/unit/${uid}/lesson/${lid}/`)
      .then((res) => res.data)
      .then((data)=> {
          setSlides(createSlidesOrder(data[0]))
          console.log(data)
        })
      .catch((err)=> console.log(err))
  }
  

  const changeLessonComponent = () => {
    setSlideNumber(slideNumber+1)
    setUserHasAnswered({answered:false, answeredRight: null})
  }

  return (
    <div>
      <progress></progress>
      <Link to={'/learn'}><button>X</button></Link>
      
      {slides[slideNumber]}

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
