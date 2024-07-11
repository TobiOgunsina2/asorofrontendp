import '../../styles/header.css'
import { Link } from 'react-router-dom'
import ProfileDrop from './profileDrop'

const Header = (props: {bgColor: string, completed: boolean, streak: any}) => {


  return (
    <div className="header-container">
      <div className="left">
        <p> </p>
        <div className='flag'></div>
      </div>

      <div className="right">
        <p className='streak'><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="orange" version="1.1" id="Layer_1" width="22px" height="22px" viewBox="796 796 200 200" enable-background="new 796 796 200 200" xmlSpace="preserve">
        <path d="M975.592,916.147c-0.019-0.279-0.039-0.557-0.063-0.838c-0.123-1.64-0.293-3.265-0.512-4.879  c-0.019-0.134-0.033-0.267-0.051-0.399c-0.23-1.617-0.494-3.225-0.821-4.812c-9.935-51.256-61.3-99.688-115.939-109.157  c-1.72-0.298-3.446,0.49-4.348,1.984c-0.901,1.495-0.794,3.39,0.272,4.771c14.591,18.911,2.209,46.013-15.437,63.031  c0.003,0.002,0.019,0.005,0.019,0.005c-13.913,14.36-22.493,33.922-22.493,55.498c0,33.906,21.155,62.861,50.984,74.41  c1.446,0.56,3.089,0.105,4.042-1.118s0.994-2.929,0.097-4.194c-5.168-7.279-9.087-16.828-9.087-29.047  c0-41.314,33.744-67.526,33.744-67.526s33.745,26.211,33.745,67.526c0,12.219-3.92,21.768-9.088,29.047  c-0.898,1.266-0.86,2.971,0.094,4.195s2.598,1.678,4.045,1.117c29.828-11.549,50.984-40.505,50.984-74.41  C975.78,919.6,975.703,917.87,975.592,916.147z"/>
        </svg> {props.streak}</p>
        
        <div style={{width: `${props.completed}%`, backgroundColor: props.bgColor}} className='filler'>
          <p><span className='label'>{`${/*props.completed*/0}%`}</span></p>
        </div>
        <p><Link className='help-link' to='/help'>Help</Link></p>
        <ProfileDrop/>
      </div>
    </div>
  )
}

export default Header
