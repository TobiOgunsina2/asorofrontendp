import LessonComponent from "./lessonComponent"
import '../../styles/unit.css'
import { useEffect, useState } from "react"
import ProgressBar from "./progressBar"


const Unit = (props: {unitName: String, unitDescription: String, lessons: any[], available: boolean, completedLessons: []}) => {
  const {unitName, unitDescription, lessons} = props
  const [isActive, setisActive] = useState(new Array(lessons.length))
  const [currentWidth, setCurrentWidth] = useState(0)
  const {completedLessons} = props

  useEffect(()=>{
    const temp = Array.from(''.repeat(isActive.length))
    temp[0] = 'active'
    setisActive(temp)
  }, [])


  const scrollHandler = (e:any) =>{
    var atSnappingPoint = e.target.scrollLeft % e.target.offsetWidth === 0;
    var timeOut         = atSnappingPoint ? 0 : 150; //see notes

    clearTimeout(e.target.scrollTimeout); //clear previous timeout
    if (e.target.scrollLeft-currentWidth>70){
      const temp = Array.from(''.repeat(lessons.length))
      temp[1] = 'active'
      setisActive(temp)
      atSnappingPoint=true
    }
    if (e.target.scrollLeft-currentWidth>270){
      const temp = Array.from(''.repeat(lessons.length))
      temp[2] = 'active'
      setisActive(temp)
      atSnappingPoint=true
    }
    if (e.target.scrollLeft-currentWidth>470){
      const temp = Array.from(''.repeat(lessons.length))
      temp[3] = 'active'
      setisActive(temp)
      atSnappingPoint=true
    }


    if (e.target.scrollLeft-currentWidth<75 && e.target.scrollLeft!=0){
      const temp = Array.from(''.repeat(lessons.length))
      temp[0] = 'active'
      setisActive(temp)
    }
    e.target.scrollTimeout = setTimeout(function() {
        //using the timeOut to evaluate scrolling state
        if (!timeOut) {
          // console.log('Scroller snapped!');
        } else {
          // console.log('User stopped scrolling.');
        }
    }, timeOut);
  }

  const clickLesson = (e: any)=>{
    console.log(isActive)
    const temp = Array.from(''.repeat(lessons.length))
    temp[Number(e.target.id)] = 'active'
    console.log(temp, e.target.id)
    setisActive(temp)
  }
  
  return (
      <div className='unit' style={!props.available ?{backgroundColor:'gray', filter: 'opacity(0.8)', pointerEvents:'none'}: {}}>
        <ProgressBar bgcolor="rgb(0, 200, 100)" progress="10" height={17}/>
        <h2>{unitName}</h2>
        <div onScroll={scrollHandler} className="lessons">
          {lessons.map((lesson, index)=>{
            return <LessonComponent complete={completedLessons.includes(lesson.id)} clickHandler={clickLesson} key={lesson.id} id={index} value={props.available ?isActive[index]: ''} lesson={lesson}/>
          })}
          <div className="lesson transparent"></div>
        </div>
    </div>
  )
}

export default Unit
