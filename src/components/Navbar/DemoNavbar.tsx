/* eslint-disable @typescript-eslint/restrict-template-expressions */
import bell from "../../assets/bell.svg";
import avatar from "../../assets/avatar.svg";
import logo from "../../assets/Logo.svg";
import "./DemoNav.css";
import ReactSwitch from "react-switch";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxDropdownMenu as Hamburger } from "react-icons/rx";
import { NotificationAlert } from "../../pages/userNotification/NotificationAlert";
// import { ReactComponent as Brand } from "../../assets/icons/logo.svg";

const DemoNav = () => {
	const [showNavbar, setShowNavbar] = useState(false);
	const [checked, setChecked] = useState(true);
	const image = localStorage.getItem("photo");

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};
	const Role = localStorage.getItem("role");
	const userName = localStorage.getItem("userName") as unknown as string;

	const Logout = () => {
		localStorage.clear();
		window.location.href = "/login";
	};

	const handleChange = (val: boolean) => {
		setChecked(val);
	};

	return (
		<nav className="demo_navbar">
			{Role === "user" ? (
				<div className="demo_container">
					<div className="demo_logo">
						{/* <Brand /> */}
						<NavLink style={{ textDecoration: "none" }} to="/user-dashboard">
							<img src={logo} />
						</NavLink>
						<span>
							<NavLink
								style={{ textDecoration: "none", color: "#e02b45" }}
								to="/user-dashboard"
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
								<NavLink to="/order-history">My Orders</NavLink>
							</li>
							<li>
								<NavLink to="/add-card">Payment</NavLink>
							</li>
							<li onClick={Logout}>
								<NavLink to="/login">Logout</NavLink>
							</li>

							<li className="li_moblile_s li_mobile_l_u">
								<NotificationAlert />

								{/* <img src={bell} alt="notification" /> */}
							</li>
							<li>
								{image ? <img className="demo_logo_last" src={`${image}`} alt="photo" />:<img className="demo_logo_last" src={avatar} alt="avatar" />}
								<NavLink
									to="/user-profilesetting"
									className="nav-elements-span_sp"
								>
									{userName.length > 10
										? userName.slice(0, 10) + "..."
										: userName}
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			) : (
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
								<NavLink to="/rider-biddings">Bidding</NavLink>
							</li>
							<li className="link_to_ride_history">
								<NavLink to="/riderhistory">Ride History</NavLink>
							</li>
							<li>
								<NavLink to="/rider-earnings">Earnings</NavLink>
							</li>
							<li className="availability_m-r">Availability</li>
							<li className="availability_m-l">
							<ReactSwitch checked={checked} onChange={handleChange} />
							</li>
							<li onClick={Logout}>
								<NavLink to="/projects">Logout</NavLink>
							</li>

							<li className="li_moblile_s li_mobile_l">
								<img src={bell} alt="notification" />
							</li>
							<li>
								<img className="demo_logo_last" src={`${image}`}  alt="avatar" />
								<NavLink
									to="/rider-profilesetting"
									className="nav-elements-span_sp"
								>
									{userName.length > 10
										? userName.slice(0, 10) + "..."
										: userName}
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			)}
		</nav>
	);
};

export default DemoNav;
