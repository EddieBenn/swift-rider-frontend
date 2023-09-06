import {Link} from "react-router-dom";
import "./Footer.css";
import footerlogo from "../../assets/footerlogo.svg";
import facebook from "../../assets/facebook.svg";
import google from "../../assets/google.svg";
import linkedin from "../../assets/linkedin.svg";
import twitter from "../../assets/twitter.svg";

const Footer = () => {
	return (
		<div className="footer">
			<div className="firstrow">
				<div className="logocontainer">
					<div className="logo">
						<img src={footerlogo} alt="footerlogo" />
					</div>
					<div className="logotext">
						<h1 className="footertitle">Swift Rider</h1>
					</div>
				</div>
				<hr className="footerHr"/>
				<div className="links">
					<Link to="/"><p className="cardTitle1">Home</p></Link>
					<Link to="/about"><p className="cardTitle1">About Us</p></Link>
					<Link to="/#"><p className="cardTitle1">FAQ</p></Link>
					<Link to="/contact"><p className="cardTitle1">Contact Us</p></Link>
				</div>
				<hr className="footerHr"/>
				<div className="icons">
					<img src={facebook} alt="facebook" />
					<img src={twitter} alt="twitter" />
					<img src={linkedin} alt="linkedin" />
					<img src={google} alt="google" />
				</div>
			</div>
			<div className="secondrow">
				<div className="copyright">
					<p className="cardTitle2">All rights reserved</p>
				</div>
				<hr className="footerHr"/>
				<div className="links">
					<p className="cardTitle2">Privacy Policy</p>
					<p className="cardTitle2">Terms and Conditions</p>
					<p className="cardTitle2">Legal</p>
					<p className="cardTitle2">Help</p>
				</div>
				<hr className="footerHr"/>
				<div className="version">
					<p className="cardTitle2">English version</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
