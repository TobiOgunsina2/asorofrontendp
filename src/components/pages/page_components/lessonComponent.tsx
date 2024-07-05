import '../../styles/lesson.css'
import { Link, useNavigate } from 'react-router-dom'

const LessonComponent = (props:{lesson: any, value: any, clickHandler: any, id: number}) => {
  const percentage = 60
  const navigate = useNavigate()
  return (
    <div onClick={props.clickHandler} id={String(props.id)} className={`lesson ${props.value}`} >
        <h2 className="title">{props.lesson.lessonName}</h2>
        <h3 className="description">{props.lesson.lessonDescription}</h3>

        <svg width={'4vw'} height={'4vw'} viewBox='0 0 4vw 4vw'>
          <circle className='circle-background' cx={'2vw'} cy={'2vw'} strokeWidth={'0.4vw'} r='1.6vw'/>
          <circle className='circle-progress' cx={'2vw'} cy={'2vw'} strokeWidth={'0.4vw'} r='1.6vw' 
            style={{
              strokeDasharray: `${1.6*Math.PI*2}vw`,
              strokeDashoffset: `${1.6*Math.PI*2-(1.6*Math.PI*2*percentage)/100}vw`,
              
            }}
            transform={`rotate(-90 25.5 25.5)`}
            />

            <text x="50%" y="50%" dy='0.3em' className='circle-text' textAnchor='middle'>
              50 words
            </text>
            
        </svg>

        <button onClick={()=>{navigate(`/lesson/unit/${props.lesson.unit}/level/${props.lesson.id}`)}} className="play-button">Start Lesson</button>
    </div>
  )
}

export default LessonComponent
