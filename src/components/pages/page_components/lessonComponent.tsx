import '../../styles/lesson.css'
import { useNavigate } from 'react-router-dom'

const LessonComponent = (props:{lesson: any, value: any, clickHandler: any, id: number, complete: any}) => {
  const navigate = useNavigate()
  return (
    <div className={`lesson ${props.value} ${props.complete ? 'complete' : ''}`} onClick={props.clickHandler} id={`${String(props.id)}`} >        

        <div className="img">
          <div className="gradient"></div>
          <img className='lesson-img' src="../img.img" width={100} height={100} alt="" />
        </div>
        <section className="lesson-about">

        <h2 className="title">{props.lesson.lessonName.replace(/U[^.]*\./, '')}</h2>
        <h3 className="description">{props.lesson.lessonDescription}</h3>

        <button onClick={()=>{navigate(`/lesson/unit/${props.lesson.unit}/level/${props.lesson.id}`)}} className="play-button">
          {props.complete ? 'Restart Lesson': 'Start Lesson'}

        </button>

        
        </section>
    </div>
  )
}

export default LessonComponent
