import LessonComponent from "./lessonComponent"
import '../../styles/unit.css'
import React,{ useEffect, useState } from "react"
import ProgressBar from "./progressBar"


const Unit = (props: {id: string, unitName: String, unitDescription: String, lessons: any[], available: boolean, completedLessons: any[]}) => {
  const {unitName, unitDescription, lessons} = props
  const [isActive, setisActive] = useState(new Array(lessons.length).fill(''))
  const [currentWidth, setCurrentWidth] = useState(0)
  const [unitProgress, setUnitProgress] = useState(0)
  const {completedLessons} = props

  useEffect(()=>{
    const temp = Array.from(''.repeat(isActive.length))
    temp[0] = 'active'
    setisActive(temp)
    let toSettoProgress = 0
    for (let i in lessons){
      if(completedLessons.includes(lessons[i].id)){
        toSettoProgress+=1
      }
    }
    setUnitProgress(toSettoProgress)
  }, [])


  const scrollHandler = (e: any) =>{
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
    const temp = new Array(lessons.length).fill('')
    temp[Number(e.target.id)] = 'active'
    setisActive(temp)
  }
  
  return (
      <div className='unit' id={props.id} style={!props.available ?{backgroundColor:'gray', filter: 'opacity(0.8)', pointerEvents:'none'}: {}}>
        <h2 className="unit-title">{unitName}</h2>
        <ProgressBar bgcolor="rgb(0, 200, 100)" progress={String(Math.round((unitProgress/lessons.length)*100))} height={17}/>
        <div onScroll={scrollHandler} className="lessons">
          {lessons.map((lesson, index)=>{
            return <LessonComponent complete={completedLessons.includes(lesson.id)} clickHandler={clickLesson} key={lesson.id} id={index} value={props.available ? isActive[index]: ''} lesson={lesson}/>
          })}
          <div className="lesson transparent"></div>
        </div>
    </div>
  )
}

export default Unit
