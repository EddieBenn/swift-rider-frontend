/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import NavbarProfile from "../../components/Navbar/NavbarProfile";
import DemoNav from "../../components/Navbar/DemoNavbar";
import React, { useEffect, useState } from "react";
import dashboard_style from "./userDashboard.module.css";
import orderimg from "../../assets/Users_dashboard/orders.svg";
import msg1 from "../../assets/Users_dashboard/msg1.svg";
import msg2 from "../../assets/Users_dashboard/msg2.svg";
import overview from "../../assets/Users_dashboard/overview.svg";
import addresscontact from "../../assets/Users_dashboard/addresscontact.svg";
import emailcontact from "../../assets/Users_dashboard/emailcontact.svg";
import phonecontact from "../../assets/Users_dashboard/phonecontact.svg";
import { apiGet, apiGetAndAuth, baseURI } from "../../utils/api/axios";
import { Link } from "react-router-dom";
import profilePic from "../../assets/profilepic.png";
import { FiMessageSquare } from "react-icons/fi";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import Success from "../../assets/Done.png";
import modalStyle from "../UserRequestRider/Modal2.module.css";
import Pusher from "pusher-js";
// import { baseURI } from '../../utils/api/axios';
import ScrollToBottom from "react-scroll-to-bottom";

function removeTimeAndFormatDate(datetimeString: string): string {
	// Parse the input string using the Date object
	const date = new Date(datetimeString);
	// Use the Intl.DateTimeFormat object to format the date
	const options: any = {
		weekday: "short",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	};
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
	return formattedDate;
}

const baseURL = `${baseURI}/chat/messages`;

// console.log("My date now:  " ,removeTimeAndConvertTo12HourFormat("2022-12-21T11:58:01.571Z"))
const UserDashboard = () => {
	const [modal, setModal] = useState(false);
	const [modal2, setModal2] = useState(false);
	const [orders, setBiddings] = React.useState([]);
	const [completedOrders, setCompletedOrders] = React.useState(null);
	const [order, setOrder]: any = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [rider, setRider]: any = React.useState([]);
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);

	const [hide, setHide] = React.useState(false);
	// const [username, setUsername] = useState<string>('username')
	const [messages, setMessages] = useState<any>([]);
	const [message, setMessage] = useState<string>("");

	const nameUser = localStorage.getItem("userName");
	const allMessages: any = [];
	const handleChange = (e: any) => {
		setMessage(e.target.value);
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (message !== "") {
			await fetch(baseURL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: nameUser,
					message,
					time:
						// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
						new Date(Date.now()).getHours() +
						":" +
						new Date(Date.now()).getMinutes(),
				}),
			});
			setMessage("");
		}
	};

	useEffect(()=>{
			const ctDown = () => {// Set the date we're counting down to
				let countDownDate = new Date(`${new Date().toLocaleString()}`).getTime();
		
				// Update the count down every 1 second
				setInterval(function() {
		
				// Get today's date and time
				let now = new Date().getTime();
		
				// Find the distance between now and the count down date
				let distance = countDownDate - now;
		
				// Time calculations for days, hours, minutes and seconds
				let days = Math.floor(distance / (1000 * 60 * 60 * 24));
				let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				let seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
				// Display the result in the element with id="demo"
		
				setHour(hours),
				setMinute(minutes),
				setSecond(seconds)
				// If the count down is finished, write some text
			}, 1000);

		}

		ctDown();
		
	}, [])

	const handleClick = (orderId: number, status: string) => {
		console.log(status);
		if (status !== "pending") {
			const go = async (orderId: number) => {
				try {
					setLoading(true);
					const responses = await apiGet(`/users/my-order/${orderId}`);
					// console.log(responses);
					if (responses) {
						setLoading(false);
						await setOrder(responses.data.Order);
						console.log("The orders are ", order);
						//  setTimeout (() => {
						const ride = order.riderId;
						getRiderProfile(ride);
						//  }, 1000 )
					}
				} catch (error) {
					console.log(error);
				}
			};
			void go(orderId);
		}
	};
	// console.log("The orders are ", order.riderId);
	// const rideId: number = order.Order.riderId;

	const getRiderProfile = (ride: number) => {
		const go1 = async (ride: number) => {
			try {
				setLoading(true);
				const rider = await apiGet(`/riders/rider-order-profile/${ride}`);
				console.log("This is rider", rider);

				if (rider) {
					setLoading(false);
					setRider(rider.data.order.rider);
					toggleModal2();
				}
			} catch (error) {
				console.log(error);
			}
		};
		void go1(ride);
	};

	const toggleModal = () => {
		setModal(!modal);
	};
	const toggleModal2 = () => {
		setModal2(!modal2);
	};
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const access_token = localStorage.getItem("signature");
	const getBiddings = async () => {
		// e.preventDefault();
		try {
			const response = await apiGetAndAuth("/users/my-orders", {
				headers: {
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					Authorization: `Bearer ${access_token}`,
				},
			});
			// console.log("myData: ", response?.data);
			setBiddings(response?.data?.rows);
		} catch (err) {
			console.error(err);
		}
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const getCompletedOrders = async () => {
		// e.preventDefault();
		try {
			const res = await apiGetAndAuth("/users/completed-orders", {
				headers: {
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					Authorization: `Bearer ${access_token}`,
				},
			});
			setCompletedOrders(res?.data?.count);
			console.log("completed", completedOrders);
		} catch (error) {
			// console.error("get_completed_order", error);
		}
	};

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const container = event.currentTarget;
		if (
			container.scrollHeight - container.scrollTop ===
			container.clientHeight
		) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			getBiddings();
		}
	};
	const call = (phone: string) => {
		window.location.href = `tel:${phone}`;
	};

	React.useEffect(() => {
		void getBiddings();
		void getCompletedOrders();
	}, [order]);

	
	// console.log(messages)

	useEffect(() => {
		Pusher.logToConsole = true;

		const pusher = new Pusher("e6e0a271cc1dd441c02a", {
			cluster: "sa1",
		});

		const channel = pusher.subscribe("swiftRider");
		channel.bind("message", function (data: any) {
			allMessages.push(data);
			setMessages(allMessages);
		});
	}, []);

	const toggleChat = () => {
		// responsible for toggling the chat modal
		setHide(!hide);
	};
	return (
		<>
			{/* <NavbarProfile /> */}
			<DemoNav />
			<div className={dashboard_style.user_dashboard_parent_div}>
				<div className={dashboard_style.middle_container}>
					<h1 className={dashboard_style.viewoverH1}>
						<img
							style={{ marginRight: "8px" }}
							src={overview}
							width="30px"
							height="30px"
						/>
						Overview
					</h1>
					{/* <div className={dashboard_style.second_container}> */}
					<main className={dashboard_style.userD_main_container}>
						<div className={dashboard_style.orders_container}>
							<div className={dashboard_style.top_orders}>
								<h4 id={dashboard_style.orders}>Total Orders</h4>
								<h4 id={dashboard_style.request}>
									<Link
										className={dashboard_style.userDashboardLink}
										to="/request-rider"
									>
										{/* <span style={{ padding: "5px", color: "#e02b45" }}> */}
											Make a Request
										{/* </span> */}
									</Link>
								</h4>
							</div>
							<hr />
							<div className={dashboard_style.bottom_orders}>
								<div className={dashboard_style.bt_orders_span}>
									<span>
										<strong id={dashboard_style.order_number}>
											{completedOrders}
										</strong>
										<br />
										<br />
										<strong id={dashboard_style.orders_completed}>
											Orders Completed
										</strong>
									</span>
								</div>

								<div className={dashboard_style.bt_orders_span}>
									<span id={dashboard_style.image}>
										<img
											src={orderimg}
											id={dashboard_style.orders_image}
											height="39.38px"
											width="36.32px"
										/>
									</span>
								</div>
							</div>
						</div>
						<div className={dashboard_style.messages_container}>
							<p id={dashboard_style.messages}>Messages</p>
							<hr />
							<div id={dashboard_style.image_div}>
								<img
									id={dashboard_style.msg1}
									src={msg1}
									width="54px"
									height="49.5px"
									alt="message icon"
								/>
								<img
									id={dashboard_style.msg2}
									src={msg2}
									width="54px"
									height="38.4px"
								/>
							</div>
							<div id={dashboard_style.no_messages}>
								<p id={dashboard_style.msgP}>No Messages</p>
								<p id={dashboard_style.msgP2}>
									You curently do not have any message
								</p>
							</div>
						</div>
						<div
							className={dashboard_style.myorders_container}
							style={{ height: "350px", overflow: "scroll" }}
							onScroll={handleScroll}
						>
							<div className={dashboard_style.order_details}>
								<span id={dashboard_style.orderzz}>My Orders</span>
								<span className={dashboard_style.seeAll}>See all</span>
							</div>
							<hr />
							{/* biddings.length > 0 ? <Your code> : <>No data Available<></> */}
							{orders?.length > 0 ? (
								orders.map((bidding: any) => {
									const myStyle = {
										backgroundColor:
											bidding.status === "pending"
												? "rgba(252, 193, 52, 0.1)"
												: " rgba(52, 168, 83, 0.1)",
										color: bidding.status === "pending" ? "#F8B02B" : "#34A853",
										cursor: "pointer",
									};
									return (
										<div
											className={dashboard_style.order_stats}
											key={bidding.id}
										>
											<div className={dashboard_style.order_status_title}>
												<span className={dashboard_style.date}>
													{removeTimeAndFormatDate(bidding.createdAt)}
												</span>
												<span
													className={dashboard_style.status}
													onClick={() =>
														handleClick(bidding.id, bidding.status)
													}
													style={myStyle}
												>
													{bidding.status}
												</span>{" "}
											</div>
											<div className={dashboard_style.space}>
												<span className={dashboard_style.orderNo}>
													Order No - {bidding.orderNumber}
												</span>
												<span className={dashboard_style.amount}>
													&#8358;
													{bidding.offerAmount
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
													.00
												</span>
											</div>
										</div>
									);
								})
							) : (
								<p className={dashboard_style.para}>No data available</p>
							)}
						</div>
						<div className={dashboard_style.contacts_container}>
							<p className={dashboard_style.contacts_parag}>Contact Us</p>
							<hr />
							<div className={dashboard_style.bio}>
								<p id={dashboard_style.getInTouch}>Get in touch</p>
								<br />
								<p id={dashboard_style.questions}>
									Any questions or remarks? Send us a message
								</p>
								<br />
								<div className={dashboard_style.contact_mail_phone}>
									<div
										onClick={(e) => {
											window.location.href = "mailto:hello@swiftrider.com";
										}}
										className={dashboard_style.company_contacts}
									>
										{" "}
										<img
											src={emailcontact}
											className={dashboard_style.contactUs_images1}
										/>
										<a href="#">hello@swiftrider.com</a>
									</div>
									<div className={dashboard_style.company_contacts}>
										<img
											src={phonecontact}
											className={dashboard_style.contactUs_images2}
										/>
										<a href="tel:+2348062898015">08062898015,</a>{" "}
										<a href="tel:+2347015950245">07015950245</a>
									</div>
									<div className={dashboard_style.company_contacts}>
										<img
											src={addresscontact}
											className={dashboard_style.contactUs_images3}
										/>
										20, Abn Street, Banana Island, Lagos
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
				<div>
					{modal2 && (
						<div className={modalStyle.modal}>
							<div className={modalStyle.overlay}> </div>
							<div className={modalStyle.modal_content}>
								<img
									src={Success}
									alt="success"
									className={modalStyle.success}
								/>
								<h5 className={modalStyle.modalName}>Order Accepted </h5>
								<p className={modalStyle.modalText}>
									{" "}
									Your order has been accepted by{" "}
								</p>
								<h5 className={modalStyle.modalTitle}>{rider.name}</h5>
								<div className={modalStyle.modalArrange}>
									<button
										className={modalStyle.modalBtn1}
										onClick={toggleModal}
									>
										View Rider
									</button>
								</div>
								<button
									className={modalStyle.close_modal}
									onClick={() => {
										setOrder([]);
										setRider([]);
										toggleModal2();
										// setModal2(false);
									}}
								>
									<AiOutlineClose size={20} />
								</button>
							</div>
						</div>
					)}
					{modal && (
						<div className={modalStyle.modal}>
							<div className={modalStyle.overlay}> </div>
							<div className={modalStyle.modal_content2}>
								{/* <h5 className={modalStyle.modalName}>
									Rider arriving in about {" "}
								</h5> */}
								<img
									className={modalStyle.requestProfilePic}
									src={rider.passport}
									alt="profilePic"
								/>
								<h5 className={modalStyle.modalTitle}>{rider.name}</h5>
								<p className={modalStyle.modalText}>{rider.phone}</p>
								<p className={modalStyle.modalNumber}> Lincense plate number</p>
								<p className={modalStyle.modalPlate}> {rider.plateNumber}</p>
								<p className={modalStyle.modalNo}>
									{" "}
									4.90 <AiFillStar />
								</p>
								<div className={modalStyle.modalArrange}>
									<button
										className={modalStyle.modalBtn3}
										onClick={() => call(rider.phone)}
									>
										Call
									</button>
									<button className={modalStyle.modalBtn2} onClick={ toggleChat }>Send Message</button>
								</div>
								<button
									className={modalStyle.close_modal}
									onClick={() => {
										setOrder([]);
										setRider([]);
										toggleModal();
										toggleModal2();
										// setModal2(false);
									}}
								>
									<AiOutlineClose size={30} style={{ color: "red" }} />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			{hide && (
				<div className={dashboard_style.rchat_container_pa}>
					{" "}
					
					<div className="chat-window">
						{" "}
						<div className="chat-header">
							{" "}
							<p>Hello {nameUser} chat with your Dispatch Client</p>{" "}
						</div>{" "}
						<div className="chat-body">
							{" "}
							<ScrollToBottom className="message-container">
								{" "}
								
								{messages.map((user: any) => (
									<div
										key={user.id}
										className="message"
										id={user.username === nameUser ? "you" : "other"}
									>
										{" "}
										<div>
											{" "}
											<>
												{" "}
												<div className="message-content">
													{" "}
													<p>{user.message}</p>{" "}
												</div>{" "}
												<div className="message-meta">
													{" "}
													<p id="author">{user.username}</p>{" "}
													<p id="author">{user.time}</p>{" "}
												</div>{" "}
											</>{" "}
										</div>{" "}
									</div>
								))}
							</ScrollToBottom>{" "}
						</div>{" "}
						<form onSubmit={handleSubmit}>
							{" "}
							<div className="chat-footer">
								{" "}
								<input
									type="text"
									value={message}
									placeholder="type message here..."
									onChange={handleChange}
								/>{" "}
								<button onClick={handleSubmit}>&#9658;</button>{" "}
							</div>{" "}
						</form>{" "}
					</div>{" "}
				</div>
			)}
			<div>
				{" "}
				<FiMessageSquare
					style={{
						position: "fixed",
						bottom: "10px",
						right: "0",
						color: "#fff",
						width: "60px",
						height: "60px",
						padding: "10px",
						borderRadius: "50%",
						backgroundColor: "rgba(0,0,0, 0.75)",
						fontSize: "50px",
						// opacity: "0.55",
						cursor: "pointer",
					}}
					className={dashboard_style.chatBttn}
					onClick={toggleChat}
				/>{" "}
				{/* {hide === true? <p></p>: (<Chat />)} */}
			</div>
		</>
	);
};
export default UserDashboard;
