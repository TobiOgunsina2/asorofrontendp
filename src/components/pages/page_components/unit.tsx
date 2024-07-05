import LessonComponent from "./lessonComponent"
import '../../styles/unit.css'
import { useEffect, useState } from "react"
import ProgressBar from "./progressBar"


const Unit = (props: {unitName: String, unitDescription: String, lessons: [any], available: boolean}) => {
  const {unitName, unitDescription, lessons} = props
  const [isActive, setisActive] = useState(new Array(lessons.length))
  const [currentWidth, setCurrentWidth] = useState(0)

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
      const temp = Array.from(''.repeat(isActive.length))
      temp[1] = 'active'
      setisActive(temp)
    }
    if (e.target.scrollLeft-currentWidth>270){
      const temp = Array.from(''.repeat(isActive.length))
      temp[2] = 'active'
      setisActive(temp)
    }
    if (e.target.scrollLeft-currentWidth>470){
      const temp = Array.from(''.repeat(isActive.length))
      temp[3] = 'active'
      setisActive(temp)
    }


    if (e.target.scrollLeft-currentWidth<75 && e.target.scrollLeft!=0){
      const temp = Array.from(''.repeat(isActive.length))
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
    const temp = Array.from(''.repeat(isActive.length))
    temp[Number(e.target.id)] = 'active'
    setisActive(temp)
  }
  console.log(props.unitName, props.available)
  
  return (
      <div className="unit" style={!props.available ?{backgroundColor:'red'}: {}}>
        <ProgressBar bgcolor="rgb(0, 200, 100)" progress="10" height={17}/>
        <h2>{unitName}</h2>
        <div onScroll={scrollHandler} className="lessons">
          {lessons.map((lesson, index)=>{
            return <LessonComponent clickHandler={clickLesson} key={lesson.id} id={lesson.id} value={isActive[index]} lesson={lesson}/>
          })}
          <div className="lesson transparent"></div>
        </div>
    </div>
  )
}

export default Unit
