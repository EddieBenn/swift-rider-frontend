import React, { useEffect, useState } from "react";
import Done from "../../assets/Done.png";
import { useParams } from "react-router-dom";
import { apiGetAndAuth, apiPatch } from "../../utils/api/axios";
import { useNavigate } from "react-router-dom";
import mapview from "./Riderrequestaccepted.module.css";

const Riderrequestaccepted = () => {
	const navigate = useNavigate();
	const { ID } = useParams();
	const [userName, setUserName] = useState<any | null>({});

	
	const splitRequestId = ID?.split("~") as string[];
	const ownerId = splitRequestId[1];
	const orderId = splitRequestId[0];

	if(!ID) return null;

	if(ID){
		useEffect(() => {
			const getOrderOwnerName = async () => {
				try {
					const { data } = await apiGetAndAuth(`/riders/get-order-owner-name-byId/${ownerId}`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("signature")}`,
						},
					})
	
					setUserName(data)
				} catch (error) {
					console.log(error)
				}
			}
			getOrderOwnerName();
	
		}, [ownerId])
}

function redret(){
	navigate(`/journey-tracker/${orderId}`)
}

 

	return (
		<div className={mapview.doneRQ}>
			<div className={mapview.Done}>
				<img src={Done} alt="approved logo" />
				<p className={mapview.doneRequest}>Request Accepted</p>
				<p className={mapview.donep}>
					You've Accepted to pick up{" "}
					<span className={mapview.doneinnerp}>{userName.owner}</span> request
				</p>
				<button className={mapview.doneBtn} onClick={redret} style={{cursor: "pointer"}}>Done</button>
			</div>
		</div>
	);
};

export default Riderrequestaccepted;
