import '../../styles/header.css'
import { Link } from 'react-router-dom'
import ProfileDrop from './profileDrop'

const Header = (props: {bgColor: string, completed: boolean, streak: any}) => {


  return (
    <div className="header-container">
      <div className="left">
        <p>Yoruba </p>
        <div className='flag'></div>
      </div>

      <div className="right">
        <p className='streak'>Streak {props.streak}</p>
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
