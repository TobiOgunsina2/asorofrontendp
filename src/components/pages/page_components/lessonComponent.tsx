import '../../styles/lesson.css'
import { Link, useNavigate } from 'react-router-dom'

const LessonComponent = (props:{lesson: any, value: any, clickHandler: any, id: number, complete: any}) => {
  const percentage = 60
  const navigate = useNavigate()
  return (
    <div style={props.complete ? {outline: '2px dotted', outlineColor:'rgba(0, 175, 80, 0.8)'}: {}} onClick={props.clickHandler} id={`${String(props.id)}`} className={`lesson ${props.value}`} >
      
        <img src="" alt="" />

        <section className="lesson-about">

        
       
        <h2 className="title">{props.lesson.lessonName}</h2>
        <h3 className="description">{props.lesson.lessonDescription}</h3>
        
        <svg width="80" height="80" viewBox="0 0 160 160" style={{"transform": 'rotate(0deg)'}}>
          <circle r="70" cx="80" cy="80" fill="transparent" stroke="#e0e0e0" stroke-width="12px"></circle>
          <circle r="70" cx="80" cy="80" fill="transparent" stroke="#60e6a8" stroke-width="12px" stroke-dasharray="439.6px" stroke-dashoffset="260px"></circle>
          <text x="50%" y="50%" dy='0.3em' className='circle-text' textAnchor='middle'>
              {props.lesson.phrase.length} words
          </text>
        </svg>
      
            

        <button onClick={()=>{navigate(`/lesson/unit/${props.lesson.unit}/level/${props.lesson.id}`)}} className="play-button">{props.complete ? 'Restart Lesson': 'Start Lesson'}</button>
        </section>
    </div>
  )
}

export default LessonComponent
