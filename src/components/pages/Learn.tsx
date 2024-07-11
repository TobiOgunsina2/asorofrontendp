import Unit from './page_components/unit'
import { useState, useEffect } from 'react'
import api from '../../context/api'
import '../styles/learn.css'
import Sidebar from './page_components/sidebar'
import Header from './page_components/header'
import Loader from './page_components/loader'

interface unitType {
  id: number,
  unitName: String,
  unitDescription: String,
  lessons: [any]
}

const Learn = () => {
  const [units, setUnits] = useState<[{id: number,unitName: String, unitDescription: String,lessons: any}]>([{lessons: [], id: 0,unitName: '',unitDescription: ''}])
  const [profile, setProfile] = useState<any>({progressData: {streak: 0, lessons: []}})
  const [isLoading, setIsLoading] = useState(false)
  
  const completed = profile.progressData.lessons.map((lesson: any)=>{
    if(lesson.completed){return lesson.lesson} 
  })
  
  // Make units highlighted on scroll


  useEffect(()=>{
    getUnits()
    getProfile()
    setTimeout(()=>{
      setIsLoading(true)
    }, 800)
  }, [])
  const getProfile = () => {
    api
      .get(`api/progress/profile/${localStorage.getItem('user')}/`)
      .then((res) => res.data)
      .then((data)=> 
        {
          setProfile(data)
          
        })
      .catch((err)=> console.log(err))
  }

  const getUnits = () => {
    api
      .get("/api/units/")
      .then((res) => res.data)
      .then((data)=> {
          setUnits(data)
      })
      .catch((err)=> console.log(err))
  }
  const unitList = units.map((unit: unitType, index)=> {
    
    if(index>0){
      if(completed.includes(units[index-1].lessons[units[index-1].lessons.length-1].id)){
      return <Unit key={unit.id} id={`unit${unit.id}`} available={true} completedLessons={completed} unitDescription={unit.unitDescription} unitName={unit.unitName} lessons={unit.lessons}/>  
      }
    }
    else if(index==0){
      return <Unit key={unit.id} id={`unit${unit.id}`} available={true} completedLessons={completed} unitDescription={unit.unitDescription} unitName={unit.unitName} lessons={unit.lessons}/>
    }
    return <Unit key={unit.id} id={`unit${unit.id}`} available={false} completedLessons={completed} unitDescription={unit.unitDescription} unitName={unit.unitName} lessons={unit.lessons}/>


  })


  return (
    <>
    {isLoading ? 
      <div className="container">
        <div className="sidebar">
          <Sidebar/>
        </div>
        <div className="main">
          <Header streak={profile.progressData.streak} bgColor={"23"} completed={false}/>
          <div className="content">
            <h1 className='' style={{visibility: 'hidden'}}>l</h1>
            <div className="unit-list">
              {unitList}
            </div>
          </div>
        </div>
      </div> 
      : <Loader/>}
    </>
  )
}

export default Learn
