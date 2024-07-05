import '../../styles/progressBar.css'
import React from 'react'

const ProgressBar = (props: {bgcolor: string,progress: string,height: number}) => {
  const {bgcolor, progress, height} = props  

    const Parentdiv = {
        height: height,
        width: '80%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: '10px auto',
      }
     
      const Childdiv = {
        'height': '100%',
        'width': `${progress}%`,
        'backgroundColor': bgcolor,
        'borderRadius': 40,
        'TextAlign': 'right',
      }
     
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900,
        fontSize: '0.9vw'
      }
       
  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  )
}

export default ProgressBar
