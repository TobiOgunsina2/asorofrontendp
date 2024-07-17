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
  const [profile, setProfile] = useState<any>({progressData: {streak: 0, lessons: []}, userData: {profile: 1, shortened_user: '', username: ''}})
  const [isLoading, setIsLoading] = useState(false)
  
  const completed = profile.progressData.lessons.map((lesson: any)=>{
    if(lesson.completed){return lesson.lesson} 
  })
  localStorage.setItem('fullProgress', String(Number(completed.length*100/7).toPrecision(2)))

  
  // Make units highlighted on scroll


  useEffect(()=>{
    getUnits()
    getProfile()
    setTimeout(()=>{
      setIsLoading(true)
    }, 400)
  }, [])
  const getProfile = () => {
    api
      .get(`api/progress/profile/${localStorage.getItem('user')}/`)
      .then((res) => res.data)
      .then((data)=> 
        {
          setProfile(data)
          console.log(data)
          localStorage.setItem('shortened', data.userData.shortened_user)
        }).then(()=>{
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
          <Header fullProgress={Number(Number(completed.length*100/7).toPrecision(2))} shortened={profile.userData.shortened_user}  streak={profile.progressData.streak}/>
          <div className="content">
            <h1 className='head-h1' style={{visibility: 'hidden'}}>l</h1>
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
