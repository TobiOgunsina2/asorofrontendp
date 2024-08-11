import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../context/api'
import MyContext from '../../context/Context'
import './lessonComplete.css'


const LessonComplete = (props: {lesson?: Number | 800, accuracy: number}) => {
  const {answers, setNext, next} = useContext(MyContext)
  async function completeLesson() {
    const newAnswers = {phrases: [...new Set(answers.phrases)], sentences: [...new Set(answers.sentences)], words: [...new Set(answers.words)], lesson: props.lesson, lastLesson: props.lesson}
    setNext(props.lesson)
    console.log(newAnswers)
    const res = await api.put('/api/progress/complete/', newAnswers) // {'sentences': [], 'phrases': [3, 5], 'words': [7, 8, 9]}
  }
  useEffect(()=>{
    completeLesson()
  }, [])

  console.log(props.accuracy)

  return (
    <div className='lesson-complete'>
      <h1>Good Job!</h1>
      <div className="points">
        <div className="progress-points">
          <p className='points-header'>Progress</p>
          <p className='progress-score'>+10</p>
        </div>
        <div className="score">
          <p className='points-header'>Score</p>
          <p className='score-value'>{Number((props.accuracy*100).toPrecision(2))}%</p>
        </div>
        <div className="words-learned">
          <p className='points-header'>Words Learned</p>
          <p className='score-value'>7 words</p>
        </div>
      
      </div>
      <footer className="lesson-footer">
        <Link to={`/learn`}><button>Continue</button></Link>
      </footer>
    </div>
  )
}

export default LessonComplete
