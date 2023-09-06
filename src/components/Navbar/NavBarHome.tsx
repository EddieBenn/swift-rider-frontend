/* eslint-disable @typescript-eslint/restrict-template-expressions */
import logo from "../../assets/Logo.svg";
import "./DemoNav.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxDropdownMenu as Hamburger } from "react-icons/rx";

const NavBarHome = () => {
	const [showNavbar, setShowNavbar] = useState(false);

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};

	return (
		<nav className="demo_navbar">
			<div className="demo_container">
				<div className="demo_logo">
					{/* <Brand /> */}
					<NavLink style={{ textDecoration: "none" }} to="/riders-dashboard">
						<img src={logo} />
					</NavLink>
					<span>
						<NavLink
							style={{ textDecoration: "none", color: "#e02b45" }}
							to="/riders-dashboard"
						>
							Swift <br /> Rider
						</NavLink>
					</span>
				</div>
				<div className="demo_menu-icon" onClick={handleShowNavbar}>
					<Hamburger style={{ fontSize: "40px" }} />
				</div>
				<div className={`nav-elements  ${showNavbar && "active"}`}>
					<ul>
						<li>
							<NavLink style={{ textDecoration: "none" }} to="/">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/about">About us</NavLink>
						</li>
						<li>
							<NavLink to="/services">Services</NavLink>
						</li>
						<li style={{ width: "100px" }}>
							<NavLink to="/contact">Contact Us</NavLink>
						</li>
						<li>
							{/* <ReactSwitch checked={checked} onChange={handleChange} /> */}
						</li>

						<li className="li_moblile_s li_mobile_home">
							<NavLink to="/login">Login</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBarHome;
