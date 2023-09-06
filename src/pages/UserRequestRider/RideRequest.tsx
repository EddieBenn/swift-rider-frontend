/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */ /* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from "react";
import requestRider from "../UserRequestRider/RequestRider.module.css";
import {
	Autocomplete,
	useJsApiLoader,
	useLoadScript,
} from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Ridermaps/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import back from "../../assets/back.png";
import DemoNav from "../../components/Navbar/DemoNavbar";
import { baseURI } from "../../utils/api/axios";

function RequestRider() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	// const [inputValue, setInputValue] = useState<string | number>();    const inputRef = useRef<any | null>();
	const [searchResult, setSearchResult] = useState<any | null>();
	const [searchResult1, setSearchResult1] = useState<any | null>();
	const options = {
		componentRestrictions: { country: "ng", administrativeArea: "Edo" },
		fields: ["address_components", "geometry", "icon", "name"],
		types: ["establishment"],
	};
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			await axios
				.post(`${baseURI}/users/order-ride`, formData, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("signature")}`,
					},
				})
				.then((res) => {
					toast.success(res.data.message);
					setTimeout(() => {
						navigate("/user-dashboard");
					}, 2000);
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.response.data.Error);
				});
		} catch (error) {
			console.log(error);
		}
	};
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY as string,
		libraries: ["places"],
	});
	function onPickupPlaceChanged() {
		if (searchResult1 != null) {
			const place = searchResult1.getPlace();
			setFormData({ ...formData, pickupLocation: place.formatted_address });
		} else {
			alert("Please enter text");
		}
	}
	function onDropoffPlaceChanged() {
		if (searchResult != null) {
			const place = searchResult.getPlace();
			setFormData({ ...formData, dropOffLocation: place.formatted_address });
		} else {
			alert("Please enter text");
		}
	}
	function onLoadp(autocomplete: any) {
		setSearchResult1(autocomplete);
	}
	function onLoad(autocomplete: any) {
		setSearchResult(autocomplete);
	}
	useEffect(() => {}, [formData]);
	console.log(formData);
	if (!isLoaded) {
		return <Loading />;
	}

	return (
		<div className={requestRider.requestOverAll}>
			<DemoNav />
			<div className={requestRider.requestContainer}>
				<div className={requestRider.requestFirst}>
					<div className={requestRider.request_header}>
						<span className={requestRider.requestBtn}>
							<Link to="/user-dashboard">
								{" "}
								<img src={back} alt="back" />
							</Link>
						</span>
						<h4 className={requestRider.requestTitle}>Request a Rider</h4>
					</div>
					<hr />

					<div className={requestRider.requestFirstLeft}>
						<form className={requestRider.userOrder_f} onSubmit={handleSubmit}>
							<div className={requestRider.req_order_form_dv}>
								<label className={requestRider.requestLabel}>
									Pick up Location
								</label>
								<Autocomplete
									onLoad={onLoadp}
									onPlaceChanged={() => onPickupPlaceChanged()}
								>
									<input
										className={requestRider.requestInputAutoCplt}
										name="pickupLocation"
										type="text"
										onChange={handleChange}
										placeholder="Enter Pickup Location"
									/>
								</Autocomplete>
							</div>
							<div className={requestRider.req_order_form_dv}>
								<label className={requestRider.requestLabel}>
									Drop off Location
								</label>
								<Autocomplete
									onLoad={onLoad}
									onPlaceChanged={() => onDropoffPlaceChanged()}
								>
									<input
										className={requestRider.requestInputAutoCplt}
										name="dropOffLocation"
										type="text"
										onChange={handleChange}
										placeholder="Enter Dropoff Location"
									/>
								</Autocomplete>
							</div>
							<div className={requestRider.req_order_form_dv}>
								<label className={requestRider.requestLabel}>
									Drop off Phone Number
								</label>
								<input
									className={requestRider.requestInput}
									onChange={handleChange}
									id="phoneIp"
									type="tel"
									pattern="[0-9]{11}"
									required
									placeholder="Enter drop off phone number"
									name="dropOffPhoneNumber"
								/>
							</div>

							<div className={requestRider.req_order_form_dv}>
								<label className={requestRider.requestLabel}>
									Package Description
								</label>
								<input
									className={requestRider.requestInput}
									onChange={handleChange}
									type="text"
									placeholder="Enter Package Description"
									name="packageDescription"
								/>
							</div>
							<div className={requestRider.req_order_form_dv}>
								<label className={requestRider.requestLabel}>Offer (NGN)</label>
								<input
									className={requestRider.requestInput}
									onChange={handleChange}
									type="number"
									placeholder="Enter an amount"
									name="offerAmount"
								/>
							</div>
							<div style={{ width: "100%" }}>
								<label className={requestRider.requestLabel}>
									Payment Method
								</label>
							</div>
							<div className={requestRider.req_order_form_data}>
								<div className={requestRider.req_order_form_pay}>
									<label htmlFor="Cash">Cash</label>
									<input
										onChange={handleChange}
										type="radio"
										value="Cash"
										name="paymentMethod"
									/>
								</div>
								<div className={requestRider.req_order_form_pay}>
									<label htmlFor="Card">Card</label>
									<input
										onChange={handleChange}
										type="radio"
										value="Card"
										name="paymentMethod"
									/>
								</div>
							</div>

							{/* <Link to="/request-rider-success" className={requestRider.requestLink} ><input type="submit"  onClick={toggleModal} className={requestRider.requestSubmit} value="Order ride" /></Link> */}
							<input
								type="submit"
								onClick={handleSubmit}
								className={requestRider.requestSubmit}
								value="Order ride"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RequestRider;
