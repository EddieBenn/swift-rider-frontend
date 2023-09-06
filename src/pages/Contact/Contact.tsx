import React from 'react';
import Footer from '../../components/Footer/Footer';
import NavBarHome from "../../components/Navbar/NavBarHome";
import contactImg from '../../assets/hero.png';
import './Contact.css';


const Contact = () => {
  return (
    <div className="contactContainer">
        <NavBarHome/>
      <header className="contactHeader">
        <img src={contactImg} className="contactImg"/>
        <h1>Contact Us</h1>
      </header>

      <div className="contactMain">
        <div className="contactContent">
          <form className="contactformContent">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" className="contactFormInput" />
            <label>Phone Number</label>
            <input type="tel" name="phone" placeholder="Enter your phone number" className="contactFormInput"/>
            <label>Message</label>
            <textarea name="message" placeholder="Enter your message" className="contactFormInput"/>
            <input type="submit" value="Submit" className="contactFormInput"/>
          </form>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default Contact