/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import riderOrderStyle from "./RiderBiddingOrder.module.css";
import { apiGetAndAuth } from "../../utils/api/axios";
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import DemoNav from "../../components/Navbar/DemoNavbar";

const BidingOrder = () => {
	const [orders, setOrders] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	// const [currentPage, setCurrentPage] = React.useState(1);
	// const [ordersPage, setOrdersPage] = React.useState();
	const getOrders = async () => {
		setLoading(true);
		const response = await apiGetAndAuth("/riders/all-biddings", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("signature")}`,
			},
		});
		setOrders(response.data.rows);
		setLoading(false);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const container = event.currentTarget;
		if (
			container.scrollHeight - container.scrollTop ===
			container.clientHeight
		) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			getOrders();
		}
	};

	React.useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		getOrders();
	}, []);

	return (
		<div>
			<DemoNav />
			<div className={riderOrderStyle.rider_biding_div}>
				<div className={riderOrderStyle.rider_biding_section}>
					<div className={riderOrderStyle.rider_biding_section_title_head}>
						<h1 className={riderOrderStyle.biding_order_title1}>
							Bidding Orders
						</h1>
						<div className={riderOrderStyle.biding_order_title}>
							<div className={riderOrderStyle.biding_span}>
								<span>
									{" "}
									<AiOutlineInfoCircle />{" "}
								</span>
								<span>You can accept or decline a bid.</span>
							</div>
						</div>
					</div>
					<div className={riderOrderStyle.biding_order_content}>
						<section
							className={riderOrderStyle.order_content_container}
							style={{ height: "800px", overflow: "scroll" }}
							onScroll={handleScroll}
						>
							{orders.length === 0 && (
								<div className={riderOrderStyle.bidding_items_empty}>
									{" "}
									No Biddings.
								</div>
							)}
							{orders.map((order: any) => (
								// eslint-disable-next-line react/jsx-key
								<div
									className={riderOrderStyle.biding_order_content_data}
									key={order.id}
								>
									<p className={riderOrderStyle.biding_order_content_faint_p}>
										Pickup location
									</p>
									<p className={riderOrderStyle.biding_order_content_ps}>
										{order.pickupLocation}
									</p>
									<p className={riderOrderStyle.biding_order_content_faint_p}>
										Delivery location{" "}
									</p>
									<p className={riderOrderStyle.biding_order_content_ps}>
										{order.dropOffLocation}
									</p>
									<p className={riderOrderStyle.biding_order_content_faint_p}>
										Package{" "}
									</p>
									<p className={riderOrderStyle.biding_order_content_ps}>
										{order.packageDescription}
									</p>
									<p className={riderOrderStyle.biding_order_content_faint_p}>
										Offer{" "}
									</p>
									<p className={riderOrderStyle.biding_order_content_ps}>
										{order.offerAmount}
									</p>
									<p className={riderOrderStyle.biding_order_content_faint_p}>
										Payment method{" "}
									</p>
									<p className={riderOrderStyle.biding_order_content_ps}>
										{order.paymentMethod}
									</p>
									<div className={riderOrderStyle.biding_order_button_div}>
										<Link
											className={riderOrderStyle.bidding_order_link}
											// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
											to={`/riders-accept-order-view/${order.id}~${order.userId}`}
										>
											<button className={riderOrderStyle.biding_order_button}>
												View Request Details
											</button>
										</Link>
										
									</div>
								</div>
								// eslint-disable-next-line react/jsx-no-comment-textnodes
							))}
							{loading && <div>Loading...</div>}
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BidingOrder;
