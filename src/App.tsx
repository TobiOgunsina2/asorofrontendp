import LessonPage from './components/lesson_pages/LessonPage'
import Learn from './components/pages/Learn'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import NotFound from './components/pages/NotFound'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/pages/page_components/header'
import RequireAuth from './context/RequireAuth'
import {MyContextProvider} from './context/Context'
import Home from './components/pages/HomePage'
import Review from './components/pages/Review'
import Help from './components/pages/Help'
import ReviewPage from './components/review_pages/ReviewPage'

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/> 
            <Route element={<RequireAuth/>}>
              <Route path='/learn' element={<Learn/>}/> 
              <Route path='/review' element={<Review/>}/>
              <Route path='/review/learn' element={<MyContextProvider children={<ReviewPage/>}/>}/>
              <Route path='lesson/unit/:uid/level/:lid' element={<MyContextProvider children={<LessonPage/>}/>}/> 
            </Route>          
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/help' element={<Help/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
