import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MyContext from '../../context/Context'
import TypeIn from '../lesson_types/typeIn'
import { useLocation } from 'react-router-dom'
import ReviewComplete from './ReviewComplete'


const ReviewPage = ()=>{
    const [slides, setSlides] = useState<any>([])
    const [slideNumber, setSlideNumber] = useState(0)
    const {userHasAnswered, setUserHasAnswered} = useContext(MyContext)
    const {answers} = useContext(MyContext)

    const location = useLocation()
    

    useEffect(()=>{
        const { state } = location.state
        setSlides([...state.data.map((phrase: any)=>{
            return <TypeIn phrase={phrase}/>
        }), <ReviewComplete />])
    },[])
    const changeLessonComponent = () => {
        setUserHasAnswered({answered:false, answeredRight: null})
        setSlideNumber(slideNumber+1)
    }

    return (
    <div>
        <progress></progress>
        <Link to={'/review'}><button>X</button></Link>
        
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
