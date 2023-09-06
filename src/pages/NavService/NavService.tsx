import React from 'react';
import Footer from '../../components/Footer/Footer';
import NavBarHome from "../../components/Navbar/NavBarHome";
import serviceImg from '../../assets/hero.png';
import './NavService.css';


const NavService = () => {
  return (
    <div className="serviceContainer">
        <NavBarHome/>
      <header className="serviceHeader">
        <img src={serviceImg} className="serviceImg"/>
        <h1>Our Services</h1>
      </header>

      <div className="serviceMain">
        <div className="serviceContent">
          {["Pickup", "Delivery", "Competitive pricing"].map((item, index) => 
            // return (
              <div className="serviceformContent" key={index}>
                {item}
              </div>
          // )
          )
        }
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default NavService