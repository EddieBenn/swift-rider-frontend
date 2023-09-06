import DemoNav from "../../components/Navbar/DemoNavbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaCcMastercard } from "react-icons/fa";
import { Link } from "react-router-dom";
// import "./paymentOption.css";

const PaymentOption = () => {
	return (
		<>
			<DemoNav />

			<div className="method-payment-div">
				<div className="options">
					<AiOutlineArrowLeft className="icon" />
					<h4 className="back">Back</h4>
					<h3 className="choose-method">Choose Payment Method</h3>
					<div className="bottom-border"></div>
					<FaCcMastercard className="card-icon" />
					<h3 className="choose">Choose a Payment Method</h3>
				</div>
				<div className="card-div">
					<Link className="card" to={"/add-card"}>
						<h3
							style={{ color: "white", fontSize: "20px", paddingTop: "0.3em" }}
						>
							Card
						</h3>
					</Link>
				</div>

				<div className="cash-div">
					<Link className="card" to={""}>
						<h3
							style={{
								fontSize: "20px",
								paddingTop: "0.5em",
								color: "white",
							}}
						>
							Cash
						</h3>
					</Link>
				</div>
			</div>
		</>
	);
};

export default PaymentOption;
