import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/sidebar.css'

const Sidebar = () => {
  return (
    <>
        <div className="logo">
          <Link className='sidebar-link' to="/"><p className='logo-text'>Asoro</p></Link>
        </div>
        <Link className='sidebar-link' to="/learn">
        <p>
        <svg xmlns="http://www.w3.org/2000/svg" color='black' width="18px" height="18px" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.94531 1.25H14.0551C15.4227 1.24998 16.525 1.24996 17.3919 1.36652C18.292 1.48754 19.0499 1.74643 19.6518 2.34835C20.2538 2.95027 20.5126 3.70814 20.6337 4.60825C20.7502 5.47522 20.7502 6.57754 20.7502 7.94513V16.0549C20.7502 17.4225 20.7502 18.5248 20.6337 19.3918C20.5126 20.2919 20.2538 21.0497 19.6518 21.6517C19.0499 22.2536 18.292 22.5125 17.3919 22.6335C16.525 22.75 15.4226 22.75 14.0551 22.75H9.94532C8.57773 22.75 7.4754 22.75 6.60844 22.6335C5.70833 22.5125 4.95045 22.2536 4.34854 21.6517C3.74662 21.0497 3.48773 20.2919 3.36671 19.3918C3.32801 19.1039 3.30216 18.7902 3.2849 18.4494C3.24582 18.326 3.23821 18.1912 3.26895 18.0568C3.25016 17.4649 3.25017 16.7991 3.25019 16.0549V7.94513C3.25017 6.57754 3.25015 5.47522 3.36671 4.60825C3.48773 3.70814 3.74662 2.95027 4.34854 2.34835C4.95045 1.74643 5.70833 1.48754 6.60843 1.36652C7.4754 1.24996 8.57772 1.24998 9.94531 1.25ZM4.77694 18.2491C4.79214 18.6029 4.81597 18.914 4.85333 19.1919C4.95199 19.9257 5.13243 20.3142 5.4092 20.591C5.68596 20.8678 6.07453 21.0482 6.80831 21.1469C7.56366 21.2484 8.56477 21.25 10.0002 21.25H14.0002C15.4356 21.25 16.4367 21.2484 17.1921 21.1469C17.9258 21.0482 18.3144 20.8678 18.5912 20.591C18.8679 20.3142 19.0484 19.9257 19.147 19.1919C19.2299 18.5756 19.2462 17.7958 19.2494 16.75H13.7502V19.5309C13.7502 19.5396 13.7502 19.5485 13.7502 19.5578C13.7504 19.6691 13.7506 19.8276 13.7293 19.9638C13.7033 20.1302 13.6177 20.4514 13.2851 20.6468C12.9647 20.8349 12.6513 20.765 12.5024 20.7187C12.3726 20.6783 12.2302 20.6105 12.124 20.56C12.1156 20.556 12.1074 20.5521 12.0995 20.5483L11.0002 20.0261L9.90087 20.5483C9.89294 20.5521 9.88477 20.5559 9.87636 20.56C9.7702 20.6105 9.62782 20.6783 9.49796 20.7187C9.34903 20.765 9.03567 20.8349 8.7153 20.6468C8.38263 20.4514 8.29705 20.1302 8.27104 19.9638C8.24976 19.8276 8.25 19.6691 8.25016 19.5578C8.25017 19.5485 8.25019 19.5396 8.25019 19.5309V16.75H7.89796C6.91971 16.75 6.5777 16.7564 6.31562 16.8267C5.5963 17.0194 5.02286 17.5541 4.77694 18.2491ZM9.75019 16.75V18.9592L10.4995 18.6033C10.5013 18.6024 10.5043 18.6009 10.5083 18.5989C10.5573 18.5738 10.7638 18.4682 11.0002 18.4682C11.2365 18.4682 11.443 18.5738 11.4921 18.5989C11.4961 18.6009 11.499 18.6024 11.5009 18.6033L12.2502 18.9592V16.75H9.75019ZM7.89796 15.25C7.85879 15.25 7.8202 15.25 7.78217 15.25C6.9642 15.2497 6.40605 15.2495 5.92739 15.3778C5.49941 15.4925 5.10242 15.6798 4.75019 15.9259V8C4.75019 6.56458 4.75178 5.56347 4.85333 4.80812C4.95199 4.07435 5.13243 3.68577 5.4092 3.40901C5.68596 3.13225 6.07453 2.9518 6.80831 2.85315C7.56366 2.75159 8.56477 2.75 10.0002 2.75H14.0002C15.4356 2.75 16.4367 2.75159 17.1921 2.85315C17.9258 2.9518 18.3144 3.13225 18.5912 3.40901C18.8679 3.68577 19.0484 4.07435 19.147 4.80812C19.2486 5.56347 19.2502 6.56458 19.2502 8V15.25H7.89796ZM7.25019 7C7.25019 6.58579 7.58597 6.25 8.00019 6.25H16.0002C16.4144 6.25 16.7502 6.58579 16.7502 7C16.7502 7.41421 16.4144 7.75 16.0002 7.75H8.00019C7.58597 7.75 7.25019 7.41421 7.25019 7ZM7.25019 10.5C7.25019 10.0858 7.58597 9.75 8.00019 9.75H13.0002C13.4144 9.75 13.7502 10.0858 13.7502 10.5C13.7502 10.9142 13.4144 11.25 13.0002 11.25H8.00019C7.58597 11.25 7.25019 10.9142 7.25019 10.5Z" fill="#1C274D"/>
        </svg>
        Learn</p>
        </Link>
        <Link className='sidebar-link' to="/review">
        <p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px" viewBox="0 0 52 52" data-name="Layer 1"><path d="M24.56,45.75A1.45,1.45,0,0,0,26,44.3l.08-16.77A1.5,1.5,0,0,0,24.81,26H7.72a1.49,1.49,0,0,0-1.53,1.29v3.3a1.49,1.49,0,0,0,1.29,1.53H13a1.08,1.08,0,0,1,1.05,1.05,1.1,1.1,0,0,1-.25.73L2.56,45.18a1.65,1.65,0,0,0-.08,2.26l2.18,2.17a1.7,1.7,0,0,0,2.25-.08L18.28,38.17a1,1,0,0,1,1.45,0,.75.75,0,0,1,.24.73v5.31a1.51,1.51,0,0,0,1.29,1.54h3.3Z"/><path d="M30.53,48.33A24,24,0,0,0,43.1,41.88a23.37,23.37,0,1,0-33-33.05A23.09,23.09,0,0,0,3.61,21.32H8.36A18.65,18.65,0,0,1,39.8,12.14a18.66,18.66,0,0,1-9.11,31.43Zm.24-9.6a13.14,13.14,0,0,0,5.72-3.46A14,14,0,0,0,16.67,15.44a13.86,13.86,0,0,0-3.47,5.8h5A9.21,9.21,0,0,1,20,18.66,9.35,9.35,0,0,1,33.19,31.88a10.49,10.49,0,0,1-2.42,1.78Z"/></svg>
        Review</p>
        </Link>
        <Link className='sidebar-link' to="/videos">
        <p>
        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
        <path d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          Videos
          </p></Link>
    </>
  )
}

export default Sidebar
