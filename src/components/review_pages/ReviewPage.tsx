import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyContext from '../../context/Context'
import TypeIn from '../lesson_types/typeIn'
import { useLocation } from 'react-router-dom'
import ReviewComplete from './ReviewComplete'
import './review-page.css'

const ReviewPage = ()=>{
    const [slides, setSlides] = useState<any>([])
    const [slideNumber, setSlideNumber] = useState(0)
    const {userHasAnswered, setUserHasAnswered} = useContext(MyContext)
    const {answers} = useContext(MyContext)
    const [progress, setProgress] = useState(0)
    


    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        const { state } = location.state
        setUserHasAnswered({answered:false, answeredRight: null})
        setSlides([...state.data.slice(0, 13).map((phrase: any, index: number)=>{
            return <TypeIn key={index}  phrase={phrase}/>
        }), <ReviewComplete />])
    },[])
    const changeLessonComponent = () => {
        setProgress((slideNumber+2)/slides.length)
        setUserHasAnswered({answered:false, answeredRight: null})
        setSlideNumber(slideNumber+1)
    }

    return (
    <div>
        <div className="review-header">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{width: `${progress*100}%`}}></div>
        </div>
        
        <svg onClick={()=>{
            if (confirm('Are you sure you want to exit the lesson?')){
                navigate('/review')
            }
        }
        } 
            xmlns="http://www.w3.org/2000/svg" fill="black" width="2.3vw" height="2.3vw" viewBox="-3.5 0 19 19" className="cf-icon-svg"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"/></svg>
        </div>
        
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
        : 
        
        (slideNumber<slides.length-1 && userHasAnswered.answered)
        ? <footer className="lesson-footer done">

        <button onClick={changeLessonComponent}>Continue</button>
        </footer>
        : <h1></h1>
        }
    </div>
    )
}


export default ReviewPage
