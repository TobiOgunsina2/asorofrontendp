import '../../styles/header.css'
import { Link } from 'react-router-dom'
import ProfileDrop from './profileDrop'
import ProgressCircle from './progressCircle'

const Header = (props: {streak: number, shortened: string, fullProgress: number}) => {


  return (
    <div className="header-container">
      <div className="left">
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="45px" height="45px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#009A49" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"/><path fill="#EEE" d="M12 5h12v26H12z"/><path fill="#009A49" d="M32 5h-8v26h8a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"/></svg>
      </div>

      <div className="middle">
      <h1 className='yoruba-header'>Learn Yoruba</h1>
      </div>

      <div className="right">
        <p className='streak'><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="orange" version="1.1" id="Layer_1" width="20px" height="20px" viewBox="796 796 200 200" enableBackground="new 796 796 200 200" xmlSpace="preserve">
        <path d="M975.592,916.147c-0.019-0.279-0.039-0.557-0.063-0.838c-0.123-1.64-0.293-3.265-0.512-4.879  c-0.019-0.134-0.033-0.267-0.051-0.399c-0.23-1.617-0.494-3.225-0.821-4.812c-9.935-51.256-61.3-99.688-115.939-109.157  c-1.72-0.298-3.446,0.49-4.348,1.984c-0.901,1.495-0.794,3.39,0.272,4.771c14.591,18.911,2.209,46.013-15.437,63.031  c0.003,0.002,0.019,0.005,0.019,0.005c-13.913,14.36-22.493,33.922-22.493,55.498c0,33.906,21.155,62.861,50.984,74.41  c1.446,0.56,3.089,0.105,4.042-1.118s0.994-2.929,0.097-4.194c-5.168-7.279-9.087-16.828-9.087-29.047  c0-41.314,33.744-67.526,33.744-67.526s33.745,26.211,33.745,67.526c0,12.219-3.92,21.768-9.088,29.047  c-0.898,1.266-0.86,2.971,0.094,4.195s2.598,1.678,4.045,1.117c29.828-11.549,50.984-40.505,50.984-74.41  C975.78,919.6,975.703,917.87,975.592,916.147z"/>
        </svg> {props.streak}</p>

        <div className='progress'>
          <ProgressCircle strokeWidth={10} size={33} percentage={props.fullProgress}/>
        </div>
        <p className='help'><Link className='help-link' to='/help'><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
        <path d="M9 10C9 9.40666 9.17595 8.82664 9.50559 8.33329C9.83524 7.83994 10.3038 7.45543 10.852 7.22836C11.4001 7.0013 12.0033 6.94189 12.5853 7.05765C13.1672 7.1734 13.7018 7.45912 14.1213 7.87868C14.5409 8.29824 14.8266 8.83279 14.9424 9.41473C15.0581 9.99667 14.9987 10.5999 14.7716 11.1481C14.5446 11.6962 14.1601 12.1648 13.6667 12.4944C13.1734 12.8241 12.5933 13 12 13V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="17" r="1" fill="#000000"/>
        </svg>Help</Link></p>
        <ProfileDrop shortened={props.shortened}/>
      </div>
    </div>
  )
}

export default Header
