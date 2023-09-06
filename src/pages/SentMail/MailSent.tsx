import React from "react";

import "./MailSent.css";

import Email from "../../assets/Email.png";
import { Link } from "react-router-dom";

const MailSent = () => {
	return (
		<div className="sentMail-Container">
			<div className="Cover">
				<div className="image">
					<img src={Email} alt="" style={{width:"155px", height: "154px"}}></img>
				</div>
				<div className="text">
					<h3 className="mailsent_h3">Check your mail</h3>
					<p className="mailsent_ptag">
						We have sent a password recover <br /> instruction to your account.
					</p>
					<h6>Don’t receive the email? Click to Resend link</h6>
				</div>
				<div>
					<Link to="/login" className="sentBtn">
						Back to Login
					</Link>
				</div>
				{/* <ReusableButton text="Open email app"></ReusableButton> */}
			</div>
		</div>
	);
};

export default MailSent;
