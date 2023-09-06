/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useRef, useState } from "react";
import Mastercard from "../../assets/Mastercard.svg";
import CashImg from "../../assets/cash_img.png";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import mapview from "./Ridermap.module.css";
import DemoNav from "../../components/Navbar/DemoNavbar";
import { apiGetAndAuth, apiPatch } from "../../utils/api/axios";
import { toast } from "react-toastify";
const containerStyle = {
  width: "100%",
  height: "85vh",
};
const center = {
  lat: 6.339185,
  lng: 5.617447,
};

const Ridermap = () => {
  const { requestId } = useParams();
  const [order, setOrder] = useState<any | null>({});
  const [orderOwner, setOrderOwner] = useState<any | null>({});
  const navigate = useNavigate();
  const [map, setMap] = useState<any | null>(/** @type google.maps.Map */ null);
  const [directionResponse, setDirectionResponse] = useState<any | null>(null);
  const [distance, setDistance] = useState<any | null>("");
  const [duration, setDuration] = useState<any | null>("");
  const [displayCard, setDisplayCard] = useState<any | null>(false);

  const pickupLocationRef = useRef<any | null>();
  const deliveryLocationRef = useRef<any | null>();
  const buttonRef = useRef<any | null>(null);

  //	split the requestId from the url
  const splitRequestId = requestId?.split("~") as string[];
  const requestId2 = splitRequestId[0];
  const ownerId = splitRequestId[1];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY as string, // remember to remove your api key
    libraries: ["places"],
  });

	const handleClick = (e:any) => {
		e.preventDefault();
		const go = async () => {
			try {
				await apiPatch(`/riders/accept-bid/${requestId2}`, "")
					.then((res: any) => toast.success(res.data.message))
					.then(() => setTimeout(() => {
						navigate(`/accept-request/${splitRequestId.join("~")}`)
						}, 3000))
					
			} catch (err: any) {
				console.log(err);
				toast.error(err.response.data.Error);
			}
		}

		localStorage.setItem("orderID", requestId2);

		void go();
	}
	async function calculatorRoute() {

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

    setDirectionResponse(result);
    setDistance(result.routes[0].legs[0].distance?.text);
    setDuration(result.routes[0].legs[0].duration?.text);

    console.log("page loaded!!!");
    setDisplayCard(!false);

    // setTimeout(() => {
    // 	navigate("/accept-request")
    // }, 10000)
  }

  useEffect(() => {
    calculatorRoute();
  }, [order]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await apiGetAndAuth(
          `/riders/get-order-byId/${requestId2}`,
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
    const getOrderOwnerName = async () => {
      try {
        const { data } = await apiGetAndAuth(
          `/riders/get-order-owner-name-byId/${ownerId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("signature")}`,
            },
          }
        );

        setOrderOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderOwnerName();

    calculatorRoute();
  }, [requestId2, ownerId]);

  // console.log(typeof order.pickupLocation)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!isLoaded) {
    return <Loading />;
  }

  // console.log(order)
  // const myStyle = {
  // 		display: order===null ? "none" : "block",
  // }
  return (
    <>
      <div>
        <DemoNav />
        <div className={mapview.MPCTN}>
          <div className={mapview.mapContainer}>
            <div className={mapview.details} /* style={myStyle} */>
              <h3>Request details</h3>
              <form key="" action="" className={mapview.formCtn}>
                <div className={mapview.divInputCtn}>
                  <label className={mapview.divInputCtnLbl}>
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={order.pickupLocation}
                    placeholder="pickup location"
                    ref={pickupLocationRef}
                    disabled
                  />
                </div>
                <div className={mapview.divInputCtn}>
                  <label className={mapview.divInputCtnLbl}>
                    Delivery Location
                  </label>
                  <input
                    type="text"
                    value={order.dropOffLocation}
                    placeholder="pickup location"
                    ref={deliveryLocationRef}
                    disabled
                  />
                </div>
                <div className={mapview.divInputCtn}>
                  <label className={mapview.divInputCtnLbl}>
                    Package details
                  </label>
                  <p>{order.packageDescription}</p>
                </div>
                <div className={mapview.divInputCtn}>
                  <label className={mapview.divInputCtnLbl}>
                    Drop off contact
                  </label>
                  <p>{order.dropOffPhoneNumber}</p>
                </div>
                <div className={mapview.divInputCtn}>
                  <label className={mapview.divInputCtnLbl}>
                    Payment method
                  </label>
                  <p>&#8358;{`${order.offerAmount}`}</p>
                </div>

                <div className={mapview.PymtCard}>
                <div>
                    <input checked type="radio" />
                    <span> {order.paymentMethod} payment</span>
                  </div>

                 { order.paymentMethod === "Card" ? <div>
                    <img src={Mastercard} alt="Mastercard logo" />
                  </div> : <div>
                    <img src={CashImg} alt="cash png"  style={{width: "35px", height: "25px"}}/>
                  </div> 
                  }
                </div>

                <div className={mapview.btnGroup}>
                  <button
                    onClick={handleClick}
                    ref={buttonRef}
                    className={mapview.aceptReq}
                  >
                    Accept Request
                  </button>
                  <Link to={"/rider-biddings"}>
                    <button className={mapview.declineReq}>
                      Decline Request
                    </button>
                  </Link>
                </div>
              </form>
            </div>

            <div className={mapview.mapV}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
              >
                {/* <Marker position={center} /> */}
                {directionResponse && (
                  <DirectionsRenderer directions={directionResponse} />
                )}
              </GoogleMap>
              {displayCard && (
                <div className={mapview.incomingRequest}>
                  <p>Incoming Request</p>
                  <p className={mapview.incomingRequestInnerP}>
                    {duration} . {distance}
                  </p>
                  <p
                    className={`${mapview.incomingRequestInnerP} ${mapview.innerPMedium}`}
                  >
                    {orderOwner.owner}
                  </p>
                  <p
                    className={`${mapview.incomingRequestInnerP} ${mapview.innerPSmall}`}
                  >
                    {order.pickupLocation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Ridermap;