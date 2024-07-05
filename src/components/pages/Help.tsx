import React from 'react'
import '../styles/help.css'


const Help = () => {
  return (
    <div className="help-container">
    <span className="big-circle"></span>
    <img src="img/shape.png" className="square" alt="" />
    <div className="form">
      <div className="contact-info">
        <h3 className="title">Let's get in touch</h3>
        <p className="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          dolorum adipisci recusandae praesentium dicta!
        </p>

        <div className="info">
          <div className="information">
            <img src="" className="icon" alt="" />
            <p>ogunsina04@gmail.com</p>
          </div>
          <div className="information">
            <img src="" className="icon" alt="" />
            <p>346-669-0922</p>
          </div>
        </div>

        <div className="social-media">
          <p>Connect with us :</p>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="contact-form">
        <span className="circle one"></span>
        <span className="circle two"></span>

        <form >
          <h3 className="title">Contact us</h3>
          <div className="input-container">
            <input type="text" name="name" className="input" />
            <label >Username</label>
            <span>Username</span>
          </div>
          <div className="input-container">
            <input type="email" name="email" className="input" />
            <label >Email</label>
            <span>Email</span>
          </div>
          <div className="input-container">
            <input type="tel" name="phone" className="input" />
            <label >Phone</label>
            <span>Phone</span>
          </div>
          <div className="input-container textarea">
            <textarea name="message" className="input"></textarea>
            <label >Message</label>
            <span>Message</span>
          </div>
          <input type="submit" value="Send" className="btn" />
        </form>
      </div>
    </div>
  </div>
  )
}

export default Help
