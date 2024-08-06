import React from 'react'
import '../../styles/progressBar.css'

const ProgressBar = (props: {bgcolor: string,progress: string,height: number}) => {
  const {bgcolor, progress, height} = props  

    const Parentdiv = {
        height: height,
        width: '80%',
        backgroundColor: 'rgb(237, 237, 237)',
        borderRadius: 40,
        margin: '10px auto',
      }
     
      const Childdiv = {
        'height': '100%',
        'width': Number(progress)>0?`${progress}%`: '7%',
        'backgroundColor': bgcolor,
        'borderRadius': 40,
        'TextAlign': 'right',
      }
     
      const progresstext = {
        padding: 10,
        color: 'white',
        fontWeight: 700,
        fontSize: '0.9vw',
        position: 'relative',
        bottom: '2px'
      } as React.CSSProperties
       
  return (
    <div className="progress-bar" style={Parentdiv}>
      <div style={Childdiv}>
        <span className="progress-number" style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  )
}

export default ProgressBar
