import React from 'react';
import Footer from '../../components/Footer/Footer';
import NavBarHome from "../../components/Navbar/NavBarHome";
import aboutImg from '../../assets/hero.png';
import './About.css';


const About = () => {
  return (
    <div className="aboutContainer">
        <NavBarHome/>
      <header className="aboutHeader">
        <img src={aboutImg} className="aboutImg"/>
        <h1>About Us</h1>
      </header>

      <div className="aboutMain">
        <div className="aboutContent">
          <p> Welcome to Swift Rider, the premier delivery service provider for your local community. Our goal is to make life easier for you by providing fast and reliable delivery services for your daily needs.</p>


          <p>Our platform was founded with the mission of making it convenient for customers to have their favorite products delivered straight to their doorstep. Whether it's a delicious meal from your favorite restaurant, groceries from the local store, or any other item you need, we're here to help.</p>


          <p>We take pride in our team of highly skilled and professional delivery drivers who work tirelessly to ensure your order arrives on time and in perfect condition. Our cutting-edge technology ensures that your order is tracked from the moment it's placed until it reaches your door, giving you peace of mind.</p>


          <p>At Swift Rider, we believe that customer satisfaction is key. That's why we offer a wide range of services, competitive pricing, and exceptional customer support. Our aim is to make every delivery a pleasant experience for you.</p>


          <p>Thank you for choosing Swift Rider. We look forward to serving you soon.</p>
        </div>
        {/* <div>
          <h4>Development Team</h4>
          <ul>

          </ul>
        </div> */}
      </div>

      <Footer />

    </div>
  )
}

export default About