import React, { FC, ReactNode } from "react";
import { useEffect, useState } from "react";

interface ContextType{
    userHasAnswered: {answered: boolean, answeredRight: any},
    setUserHasAnswered: any,
    answers: {phrases: Number[], sentences: Number[], words: Number[]}, 
    setAnswers: any,
    user: number,
    setUser: any
}

const MyContext = React.createContext<ContextType>({userHasAnswered: {answered:true, answeredRight: true}, setUserHasAnswered: '', answers: {phrases: [], sentences: [], words: []}, setAnswers: '', user: 0, setUser: ()=>{}})

export const MyContextProvider: FC<{children: ReactNode}> = ({children}) =>{
    const [userHasAnswered, setUserHasAnswered] = useState({answered:true, answeredRight: null})
    const [answers, setAnswers] = useState({phrases: [], sentences: [], words: []})
    const [user, setUser] = useState(0)
    
    return(
        <MyContext.Provider value={{userHasAnswered: userHasAnswered, setUserHasAnswered: setUserHasAnswered, answers: answers, setAnswers: setAnswers, user: user, setUser: setUser}}>
            {children}
        </MyContext.Provider>
    )
} 



export default MyContext
