import React, { useEffect, useState } from 'react'
import Sidebar from './page_components/sidebar'
import Header from './page_components/header'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../context/api'
import Loader from './page_components/loader'
import '../styles/review.css'

const Review = () => {
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchedVal, setSearchedVal] = useState("");
    const [constantData, setConstantData] = useState<any>([])

    const getData = () => {
        api
            .get(`/api/review/`)
            .then((res) => res.data)
            .then((newdata)=> {
                setData([...newdata.phrases, ...newdata.sentences])
                setConstantData([...newdata.phrases, ...newdata.sentences])
            })
            .catch((err)=> console.log(err))
    }

    useEffect(()=>{
        getData()
        setTimeout(()=>{
            setIsLoading(true)
          }, 1000)
    }, [])

    const onTypeSearch = (e: any) =>{
        setSearchedVal(e.target.value)
        
        setData(constantData.filter((row: any) =>
            !searchedVal.length || row.text
            .toString()
            .toLowerCase()
            .includes(searchedVal.toString().toLowerCase()) 
            ))
    }

    return (
        <>
        {isLoading ? 
        <div>
        <div className="container">
        <div className="sidebar">
            <Sidebar/>
        </div>
            <div className="main">
            <Header streak={Number(localStorage.getItem('streak'))} fullProgress={Number(localStorage.getItem('fullProgress'))} shortened={String(localStorage.getItem('shortened'))}/>
            <div className="review-content">
                <h1 className='review-h1'>Review</h1>
                <div className="top-review">
                    <div className="review-left">
                        <p className='word-list'>Word List</p>
                        <Link to='/review/learn' className='play-review' state={{state: {data: [...data]}}}><button>Start</button></Link>
                    </div>
                    <input type="text" className='review-search' onChange={(e) => onTypeSearch(e)} placeholder="Search.."></input>
                </div>
                <table className='review-table'>
                    <thead>
                        <tr>
                            <th className='users-table-cell'>Yoruba</th>
                            <th className='users-table-cell'>English</th>
                            <th className='users-table-cell'>MasteryLevel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((phrase: any, index: any)=>{
                            let masteryLevel = phrase.masteryLevel>4 ? 3 : phrase.masteryLevel > 2 ? 2 : 1
                            return (<tr key={index} className='users-table-cell'>
                                <td>{phrase.text}</td>
                                <td>{phrase.phraseTranslation || phrase.sentenceTranslation}</td>
                                <td >
                                    <span className={`level level${masteryLevel}`}>
                                        <span className="dot"></span>
                                        Level {masteryLevel}
                                    </span>
                                </td>
                            </tr>)
                        })}
                        
                    </tbody>
                </table>
                
            </div>
            </div>
        </div>
        </div>
        : <Loader/>}
    </>
        
    )
}

export default Review
