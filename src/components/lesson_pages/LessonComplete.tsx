import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../context/api'
import MyContext from '../../context/Context'


const LessonComplete = (props: {lesson?: Number | 800}) => {
  const {answers} = useContext(MyContext)
  async function completeLesson() {
    const newAnswers = {phrases: [...new Set(answers.phrases)], sentences: [...new Set(answers.sentences)], words: [...new Set(answers.words)], lesson: props.lesson, lastLesson: props.lesson}
  
    const res = await api.put('/api/progress/complete/', newAnswers) // {'sentences': [], 'phrases': [3, 5], 'words': [7, 8, 9]}
  }
  useEffect(()=>{
    completeLesson()
  }, [])

  return (
    <div>
      <h1>Lesson Complete</h1>
      <div className="bronze-points">
        <p>Bronze</p>
        <p>+10</p>
      </div>
      <div className="score">
        <p>Score</p>
        <p>100%</p>
      </div>
      <footer className="lesson-footer">
        <Link to='/learn'><button>Continue</button></Link>
      </footer>
    </div>
  )
}

export default LessonComplete
