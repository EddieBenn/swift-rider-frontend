import React, { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import DemoNav from "../../components/Navbar/DemoNavbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./CardDetails.css";

interface Transaction {
	reference: string;
}

interface PaystackPop {
	newTransaction: (options: {
		key: string;
		amount: number;
		cardNumber: string;
		cardName: string;
		expiryDate: string;
		cvv: string;
		onSuccess: (transaction: Transaction) => void;
		onCancel: () => void;
	}) => void;
}
const CardDetails = () => {
	const [email, setEmail] = useState("");
	const [amount, setAmount] = useState("");
	const payWithPaystack = (e: any) => {
		e.preventDefault();
		const paystack = new PaystackPop();
		paystack.newTransaction({
			key: "pk_test_10f0bf166cf0c44bfa35b7f7f0ea72f24c01a60c",
			amount: amount * 100,
			email,

			onSuccess(transaction: Transaction) {
				const message = `Payment complete successfully ${transaction.reference}`;
				alert(message);
				setAmount("");
				setEmail("");
			},
			onCancel() {},
		});
	};
	return (
		<div>
			<DemoNav />
			<div className="method-payment-div_d">
				<div className="payment_options_title_d">
					<div className="payment_options_data1_d">
						<li className="absolute_post_d">
							<Link to="/add-card">
								<AiOutlineArrowLeft
									style={{ color: "black" }}
									className="add_card_navigate_d"
								/>
							</Link>
						</li>
						<li className="relative_post_d">Card Details</li>
					</div>
					<div className="payment_options_data1_d1">
						<form className="card_details_form">
							<div className="card_form_input">
								<label htmlFor="Email">Email</label>
								<input
									type="email"
									placeholder="Email"
									className="card_details_field"
									required={true}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="card_form_input">
								<label htmlFor="Amount">Amount</label>
								<input
									type="text"
									placeholder="Amount"
									className="card_details_field"
									onChange={(e) => setAmount(e.target.value)}
									required={true}
								/>
							</div>
							<input
								className="card_payment_send"
								value="Pay"
								type="submit"
								onClick={payWithPaystack}
							/>
						</form>
					</div>
				</div>
				<script src="https://js.paystack.co/v1/inline.js"></script>
			</div>
		</div>
	);
};
export default CardDetails;
