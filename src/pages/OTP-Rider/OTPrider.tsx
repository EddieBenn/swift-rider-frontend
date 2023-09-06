/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-misused-promises */
import rOtpVerify from "./OTPrider.module.css";
import OTPInputField from "react-otp-input";
import DemoNav from "../../components/Navbar/DemoNavbar";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { apiPostAndAuth1, apiGet } from "../../utils/api/axios";
import { toast } from "react-toastify";

const OTPrider = () => {
	const {orderId} = useParams();
	const [otp, setOtp] = useState("");
	const [formData] = useState({});
	const handleChange = (otp: any) => {
		setOtp(otp);
	};
	console.log(orderId);
	const handleSubmit = async (e: any, formData: any) => {
		e.preventDefault();
		try {
			if (orderId === null) {
				return console.log("no signature");
			}
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			const result = await apiPostAndAuth1(
				`/riders/delivery-verify/${orderId}`,
				{ otp },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("signature")}`,
					},
				}
			);
			if (result.status === 200) {
				toast.success(result.data.message);
				setTimeout(() => {
					window.location.href = "/riders-dashboard";
				}, 2000);
			}
		} catch (error: any) {
			console.log(error);
			// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			if (error.response.data.error) {
				toast.error(error.response.data.error);
				// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			} else if (error.request) {
				toast.error(error.message);
				// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			} else if (error.message) {
				toast.error(error.response.date.Error);
			}
		}
	};
	const ResendOTP = () => {
		// const orderId = localStorage.getItem("signature") as string;

		const go = async () => {
			try {
				const result = await apiGet(`/riders/delivery-resend-otp/${orderId}`);
				if (result.status === 200) {
					toast.success(result.data.message);
					setTimeout(() => {
						window.location.href = `/riders-otp-verify/${orderId}`;
					}, 2000);
				}
			} catch (err: any) {
				console.log(err);
				// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
				if (err.response.data.error) {
					toast.error(err.result.data.Error);
					// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
				} else if (err.request) {
					toast.error(err.message);
					// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
				} else if (err.message) {
					toast.error(err.message);
				}
			}
		};

		void go();
	};

	return (
		<>
			<DemoNav />
			<div className={rOtpVerify.verifyContainer}>
				<div className={rOtpVerify.otpcard}>
					<div className={rOtpVerify.subverifyContainer}>
						<h3 className={rOtpVerify.verification}>OTP Verification</h3>
						<p className={rOtpVerify.pverification}>
							Fill in your OTP Verification code
						</p>
					</div>

					<form
						className={rOtpVerify.verifyForm}
						onSubmit={(e) => {
							void handleSubmit(e, formData);
						}}
					>
						<div className={rOtpVerify.verifyDiv}>
							<br />
							<br />
							<div className="OTP-field">
								<OTPInputField
									value={otp}
									onChange={handleChange}
									numInputs={4}
									inputStyle={{
										boxSizing: "border-box",
										width: "2.6rem",
										padding: "10px 5px",
										margin: "5px",
										border: "1px solid #d9d9d9",
										outline: "none",
										borderRadius: "5px",
										marginLeft: "10px",
									}}
								/>
							</div>
						</div>
						<br />
						<div>
							<div>
								<button className={rOtpVerify.btnContainer} type="submit">
									Verify
								</button>
							</div>
						</div>
					</form>
					<p>
						Didn't get OTP?
						<Link className={rOtpVerify.final} to={""}>
							<span className={rOtpVerify.resend} onClick={ResendOTP}>
								Resend OTP
							</span>
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default OTPrider;
