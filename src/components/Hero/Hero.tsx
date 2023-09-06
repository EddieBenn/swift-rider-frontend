import "./Hero.css";
import hero from "../../assets/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<div>
			<div className="Container">
				<div className="ImageContainer">
					<div className="imageOverlay"></div>
					<div className="mainText">
						<div className="maintexttogether">
							<h1 className="hero_h1">
								Fast, Reliable and Quality Dispatch Service
							</h1>
							<p className="hero_p">Send. Track. Receive.</p>
						</div>
						<div className="buttondiv">
							<Link
								to={"/user-signup"}
								style={{
									textDecoration: "none",
								}}
								className="button1"
							>
								Pickup Register
							</Link>
							<Link
								to={"/riders-signup"}
								style={{
									textDecoration: "none",
								}}
								className="button2"
							>
								Register as Rider
							</Link>
						</div>
					</div>

					<img src={hero} className="mainimage" alt="hero" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
