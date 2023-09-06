import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import Footer from "../../components/Footer/Footer";
import "./Home.css";
import NavBarHome from "../../components/Navbar/NavBarHome";

const Home = () => {
	return (
		<div>
			<NavBarHome />
			<div className="home_holding_con">
				<div className="home_holding_con2">
					<Hero />
					<Services />
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default Home;
