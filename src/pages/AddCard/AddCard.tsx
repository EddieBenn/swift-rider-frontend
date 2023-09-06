import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaCcMastercard } from "react-icons/fa";
import { Link } from "react-router-dom";
import DemoNav from "../../components/Navbar/DemoNavbar";
import "./AddCard.css";

const AddCard = () => {
	return (
		<div>
			<DemoNav />
			<div className="method-payment-div">
				<div className="payment_options_title">
					<div className="payment_options_data1">
						<li className="absolute_post">
							<Link to={"/user-dashboard"}>
								<AiOutlineArrowLeft
									style={{ color: "black" }}
									className="add_card_navigate"
								/>
							</Link>
						</li>
						<li className="relative_post">Add a Card</li>
					</div>
					<div className="payment_options_data2">
						<div className="data2_card-container">
							<FaCcMastercard className="data2_card-icon" />
						</div>
						<div className="no_card_info">
							<h3>No Card added yet</h3>
							<br />
							<p>You have not added a card yet</p>
						</div>
					</div>
					<div className="add-card-btn">
						<Link to={"/card-details"}>
							<input type="button" value="Add Card" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddCard;
