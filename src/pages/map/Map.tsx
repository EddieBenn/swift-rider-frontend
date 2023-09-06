/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useRef, useState } from "react";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	DirectionsRenderer,
} from "@react-google-maps/api";
import { Position, Coordinates } from "./geolocation";
import { apiGetAndAuth } from "../../utils/api/axios";
import locationTrkr from "./Map.module.css";
import { Link, useParams } from "react-router-dom";
import DemoNav from "../../components/Navbar/DemoNavbar";

const containerStyle = {
	width: "100%",
	height: "88vh",
};

const options = {
	// enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

const MapTracking: React.FC = () => {
	const [order, setOrder] = useState<any | null>({});
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY as string,
	});

	const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
	const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
	const [address, setAddress] = useState("");

	const { orderId } = useParams();

	const [geocodingError, setGeocodingError] = useState(false);
	const [directionResponse, setDirectionResponse] = useState<any | null>(null);
	const [count, setCount] = useState(0);
	const deliveryLocationRef = useRef<any | null>();
	const pickupLocationRef = useRef<any | null>();
	const [tripCompleted, setTripCompleted] = useState(true);
	const [lat, setLat] = useState(0);
	const [lng, setLng] = useState(0);
	

	const restructure = order.dropOffLocation?.split(" ").join("+");

	// fetch current position coordinate
	useEffect(() => {
		// setInterval(() => {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(
				(position) => {
					setCurrentPosition(position as Position);
					setCount(count + 1);
				},
				(error) => {
					console.error(error);
				},
				options
			);
		}
		// }, 5000)
	}, [currentPosition]);

	// converts address to coordinates
	useEffect(() => {
		const geocodeAddress = async () => {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${restructure}&key=${
					import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY
				}`
			);
			const data = await response.json();

			if (data.status === "OK") {
				setCoordinates({
					lat: data.results[0].geometry.location.lat,
					lng: data.results[0].geometry.location.lng,
				});
				setGeocodingError(false);
			} else {
				setGeocodingError(true);
			}
		};
		if (restructure) {
			geocodeAddress();
		}
	}, [restructure]);

	// reverse geocoding converts coordinates to human readable addresses
	useEffect(() => {
		const fetchAddress = async (lat: any, lng: any) => {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
					import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY
				}`
			);
			const data = await response.json();
			setAddress(data.results[0].formatted_address);
		};

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				if (latitude && longitude) {
					// (currentPosition?.coords.latitude && currentPosition?.coords.longitude)
					fetchAddress(latitude, longitude);
					setLat(latitude);
					setLng(longitude);
					// fetchAddress(currentPosition?.coords.latitude, currentPosition?.coords.longitude);
				}
			},
			(error) => console.error(error)
		);
	}, []);

	async function calculatorRoute() {
		// event.preventDefault();
		if (
			pickupLocationRef.current.value === "" ||
			deliveryLocationRef.current.value === ""
		) {
			return;
		}

		const directionsService = new google.maps.DirectionsService();
		const result = await directionsService.route({
			origin: pickupLocationRef.current.value,
			destination: deliveryLocationRef.current.value,
			travelMode: google.maps.TravelMode.DRIVING,
		});

		if(result){
		setDirectionResponse(result);
	}

		console.log("page loaded!!!");
	}

	if (
		currentPosition?.coords.latitude === coordinates.lat &&
		currentPosition?.coords.longitude === coordinates.lng
	) {
		setTripCompleted(true);
	}


	useEffect(() => {
		calculatorRoute();
	}, [order]);

	useEffect(() => {
		const getOrder = async () => {
			try {
				const { data } = await apiGetAndAuth(
					// eslint-disable-next-line @typescript-eslint/no-base-to-string
					`/riders/get-order-byId/${orderId}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("signature")}`,
						},
					}
				);

				setOrder(data.myOrder);
			} catch (error) {
				console.log(error);
			}
		};
		getOrder();
	}, []);


	if (loadError != null) return <div>Error loading maps</div>;
	if (!isLoaded) return <div>Loading maps...</div>;

	return (
		<div>
			<DemoNav />
			<div className={locationTrkr.LTMPCTN}>
				<div
					className={locationTrkr.LTmapContainer}
					style={{ backgroundColor: "#fff" }}
				>
					<div className={locationTrkr.LTdetails} style={{ marginTop: "20px" }}>
						<div className={locationTrkr.LTdivInputCtn}>
							<h1 style={{ color: "#E02B45" }}>Journey Tracker</h1>
							<div style={{ marginTop: "50px" }}>
								<p>
									<b>My-Latitude: </b> {currentPosition?.coords.latitude}
								</p>
								<p>
									<b>My-Longitude: </b> {currentPosition?.coords.longitude}
								</p>
								<p>
									<b>Delivery-Lat: </b> {coordinates.lat}
								</p>
								<p>
									<b>Delivery-Lng: </b> {coordinates.lng}
								</p>
								<p>
									<b>Req_count: </b> {count}
								</p>
							</div>
						</div>

						<div className={locationTrkr.LTdivInputCtnHolder}>
							<div className={locationTrkr.LTdivInputCtn}>
								<label className={locationTrkr.LTdivInputCtnLbl}>
									Current Location
								</label>
								<input
									type="text"
									value={address || "loading..."}
									placeholder="Current location"
									// ref={pickupLocationRef}
									disabled
								/>
							</div>
							<div className={locationTrkr.LTdivInputCtn}>
								{/* <label className={locationTrkr.LTdivInputCtnLbl}>
									Pickup Location
								</label> */}
								<input
									type="text"
									value={order.pickupLocation}
									placeholder="Pickup location"
									ref={pickupLocationRef}
									style={{display: "none"}}
									disabled
								/>
								
							</div>
							<div className={locationTrkr.LTdivInputCtn}>
								<label className={locationTrkr.LTdivInputCtnLbl}>
									Delivery Location
								</label>
								<input
									type="text"
									value={order.dropOffLocation}
									placeholder="Delivery location"
									ref={deliveryLocationRef}
									disabled
								/>
								<Link
									className={locationTrkr.navigator_link}
									to={`/riders-otp-verify/${orderId}`}
								>
									<button
										className={
											tripCompleted
												? `${locationTrkr.status_endTrip}`
												: `${locationTrkr.status_active}`
										}
										disabled={!tripCompleted}
									>
										{tripCompleted ? "End Trip?" : "Active Delivery!"}
									</button>
								</Link>
							</div>
						</div>
					</div>

					<div className={locationTrkr.LTmapV}>
						<GoogleMap
							mapContainerStyle={containerStyle}
							zoom={15}
							center={
								currentPosition != null
									? {
											lat: currentPosition.coords.latitude,
											lng: currentPosition.coords.longitude,
									  }
									: undefined
							}
						>
							{currentPosition != null && coordinates && (
								<>
									<Marker
										position={{
											lat: currentPosition?.coords.latitude,
											lng: currentPosition?.coords.longitude,
										}}
									/>
								</>
							)}
							{/* <Marker
								position={{
									lat: coordinates.lat,
									lng: coordinates.lng,
								}}
							/> */}
							{directionResponse && (
								<DirectionsRenderer directions={directionResponse} />
							)}
						</GoogleMap>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MapTracking;
