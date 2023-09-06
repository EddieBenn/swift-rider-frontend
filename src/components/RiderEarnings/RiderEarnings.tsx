/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from "react";
import EarningStlye from "./RiderEarnings.module.css";
import cars from "../../assets/Riders_signup_assets/car.svg";
import { apiGetAndAuth } from "../../utils/api/axios";
import { AiOutlineClockCircle } from "react-icons/ai";
import moment from "moment";

const RiderEarnings = () => {
	const [result, setResult] = useState<any>([]);
	const [totalEarnings, setTotalEarnings] = useState(0);
	const [totalRides, setTotalRides] = useState(0);
	const [totalHours, setTotalHours] = useState<any>(null);

	const total = result.reduce((acc: any, cur: any) => {
		return acc + cur.offerAmount;
	}, 0);
	const timeTravelled = result.reduce((acc: any, cur: any) => {
		return (
			acc +
			(new Date(cur.completedTime).getTime() -
				new Date(cur.acceptedTime).getTime())
		);
	}, 0);
	const date = new Date(timeTravelled);
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	useEffect(() => {
		const getEarnings = async () => {
			try {
				const resp = await apiGetAndAuth("/riders/get-rider-earnings", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("signature")}`,
					},
				});
				setResult(resp.data.rows);
				console.log(resp.data.rows);
				setTotalRides(resp.data.count);
			} catch (error) {
				console.log(error);
			}
		};
		setTotalEarnings(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
		setTotalHours(` ${hours}hrs . ${minutes}mins`);
		void getEarnings();
	}, [total]);
	return (
		<div className={EarningStlye.rider_earning_p_div}>
			<div className={EarningStlye.earning_container}>
				<div className={EarningStlye.earning_container_header}>
					<h4 className={EarningStlye.earning_title}>My Earnings</h4>
					<br />
					<h1>&#8358;{totalEarnings}</h1>
					<div className={EarningStlye.earning_list}>
						<ul className={EarningStlye.ride_count}>
							<li>
								<img src={cars} alt="cars" />
								{/* {totalRides} Rides */}
								{totalRides === 1
									? `${totalRides} Ride`
									: `${totalRides} Rides`}
							</li>
							<li>
								<AiOutlineClockCircle />
								{totalHours}
							</li>
						</ul>
					</div>
				</div>
				{result.length > 0 ? (
					result.map((item: any) => (
						<div key={item.id} className={EarningStlye.earning_ride_details}>
							<span className={EarningStlye.earning_date}>
								<h4>{moment(item.accptedTime).format("dddd, h:mm A")}</h4>
							</span>
							<span className={EarningStlye.earning_status}>
								<li>{item.status}</li>
								<li>
									&#8358;
									{item.offerAmount
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								</li>
							</span>
						</div>
					))
				) : (
					<div className={EarningStlye.earning_ride_details_empty}>
						No Earnings Yet
					</div>
				)}
			</div>
		</div>
	);
};

export default RiderEarnings;
