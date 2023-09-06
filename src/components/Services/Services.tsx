import "./Services.css";
import reliable from "../../assets/reliable.svg";
import time from "../../assets/time.svg";
import track from "../../assets/track.svg";
import headset from "../../assets/headset.svg";
import world from "../../assets/world.svg";
import order from "../../assets/order.svg";
import quality_riders from "../../assets/quality_riders.png";
import ellipse from "../../assets/Ellipse.svg";
import stars from "../../assets/stars.svg";

const Services = () => {
	return (
		<div className="services-container">
			<div className="servicesContainer">
				<h1>TopNotch Services</h1>
				<p>
					Quickly integrate powerful solutions that gives you more flexibility
					and control over your parcel shipping and logistics processes
				</p>
			</div>

			<div className="services-grid">
				<div className="column">
					<div className="services-card">
						<img src={reliable} alt="reliable" />
						<p className="cardTitle">Reliable and Secure</p>
						<p className="cardText">
							Swift rider is the dispatch rider service you can trust. With a
							focus on security and reliablity, you can count on swidt delivery
							every time. Rest assured that your shipment is in good hands.
						</p>
					</div>
					<div className="services-card">
						<img src={time} alt="time" />
						<p className="cardTitle">On-Time Delivery</p>
						<p className="cardText">
							At Swift Rider, on-time delivery is more than just a promise, it's
							a guarantee. Our dispatch riders are equipped with the latest
							technology to ensure that your shipment arrives exactly when it's
							supposed to.
						</p>
					</div>
					<div className="services-card">
						<img src={track} alt="track" />
						<p className="cardTitle">Track your shipment</p>
						<p className="cardText">
							We provides real-time updates so you can stay informed every step
							of the way. From the moment your package leaves your hands to its
							final destination, you'll be able to track its progress.
						</p>
					</div>
				</div>
				<div className="column">
					<div className="services-card">
						<img src={headset} alt="headset" />
						<p className="cardTitle">Great Customer Service</p>
						<p className="cardText">
							At Swift Rider, customer service is our priority. With a team of
							friendly and knowledgeable representatives, we are dedicated to
							making sure your delivery needs are met.
						</p>
					</div>
					<div className="services-card">
						<img src={world} alt="world" />
						<p className="cardTitle">Nationwide Delivery</p>
						<p className="cardText">
							Swift rider is a nationwide dispatch rider service providing fast
							and reliable delivery solutions to customers across the country.
							We deliver nationwide delivery.
						</p>
					</div>
					<div className="services-card">
						<img src={order} alt="order" />
						<p className="cardTitle">Order Fulfilment</p>
						<p className="cardText">
							Swift Rider is a dispatch rider service that specialized in order
							fulfillment, ensuring that your packages are delivered promptly
							and efficiently
						</p>
					</div>
				</div>
			</div>
			<div className="qualityriders">
				<div className="riderImage">
					<img src={quality_riders} className="riderimg" alt="quality_riders" />
				</div>

				<div className="riderText">
					<h1>Quality Riders & Partners Ready To Deliver</h1>
					<p>
						At Swift Rider, we pride ourselves on having a network of quality
						riders and partners ready to deliver your packages with care and
						efficiency. Trust us for all your delivery needs.
					</p>
				</div>
			</div>
			<div className="clients">
				<div className="clientText">
					<h1>What Our Clients Say About Us</h1>
				</div>
				<div className="services-grid">
					<div className="column1">
						<div className="clientCard">
							<div className="imageCircle">
								<img src={ellipse} alt="ellipse" />
							</div>
							<p className="cardText">
								Swift Riders has made my life so much easier! I no longer have
								to worry about making time to go to the post office. They always
								deliver my packages on time and in perfect condition.
							</p>
							<div className="textStars">
								<p className="cardTitle">Chidimma Amadi</p>
								<img src={stars} alt="stars" />
							</div>
						</div>
						<div className="clientCard">
							<div className="imageCircle">
								<img src={ellipse} alt="ellipse" />
							</div>
							<p className="cardText">
								I love using Swift Riders for all my deliveries. Their riders
								are always professional and friendly, and I never have to worry
								about my packages getting lost or damaged in transit.
							</p>
							<div className="textStars">
								<p className="cardTitle">Bedimi Bolaji</p>
								<img src={stars} alt="stars" />
							</div>
						</div>
						<div className="clientCard">
							<div className="imageCircle">
								<img src={ellipse} alt="ellipse" />
							</div>
							<p className="cardText">
								As a small business owner, I rely on Swift Riders to get my
								products to my customers quickly and efficiently. They have
								never let me down and I couldn't be happier with their service.
							</p>
							<div className="textStars">
								<p className="cardTitle">Angela Mbakwe</p>
								<img src={stars} alt="stars" />
							</div>
						</div>
					</div>
					<div className="column1">
						<div className="clientCard">
							<div className="imageCircle">
								<img src={ellipse} alt="ellipse" />
							</div>
							<p className="cardText">
								I have used many delivery services in the past, but none compare
								to the reliability and convenience of Swift Riders. They have
								become my go-to for all my delivery needs.
							</p>
							<div className="textStars">
								<p className="cardTitle">Pelumi Adefarasin</p>
								<img src={stars} alt="stars" />
							</div>
						</div>
						<div className="clientCard">
							<div className="imageCircle">
								<img src={ellipse} alt="ellipse" />
							</div>
							<p className="cardText">
								Swift Riders makes it so easy to send packages to my friends and
								family. I love the real-time tracking and the peace of mind that
								comes with knowing my items are in good hands.
							</p>
							<div className="textStars">
								<p className="cardTitle">Chidike Chukwuma</p>
								<img src={stars} alt="stars" />
							</div>
						</div>
						<div className="clientCard">
							<div className="imageCircle">
								<img src={ellipse} alt="ellipse" />
							</div>
							<p className="cardText">
								I have used Swift Riders for both personal and business
								deliveries, and I am consistently impressed with their level of
								customer service. They always go above and beyond to make sure
								my deliveries are on time and hassle-free.
							</p>
							<div className="textStars">
								<p className="cardTitle">Igweka Murphy</p>
								<img src={stars} alt="stars" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Services;
