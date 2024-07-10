import '../../styles/lesson.css'
import { useNavigate } from 'react-router-dom'

const LessonComponent = (props:{lesson: any, value: any, clickHandler: any, id: number, complete: any}) => {
  const navigate = useNavigate()
  return (
    <div style={props.complete ? {outline: '2px dotted', outlineColor:'rgba(0, 175, 80, 0.8)'}: {}} onClick={props.clickHandler} id={`${String(props.id)}`} className={`lesson ${props.value}`} >        
        
        <section className="lesson-about">

        <h2 className="title">{props.lesson.lessonName}</h2>
        <h3 className="description">{props.lesson.lessonDescription}</h3>

        <button onClick={()=>{navigate(`/lesson/unit/${props.lesson.unit}/level/${props.lesson.id}`)}} className="play-button">
          {props.complete ? 'Restart Lesson': 'Start Lesson'}

        </button>

        
        </section>

        <img className='lesson-img' src="../img.img" width={100} height={100} alt="" />

    </div>
  )
}

export default LessonComponent
