/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import Group15 from "../../assets/Group15.svg";
import { Link } from "react-router-dom";
import rest from "./ResetPasswordd.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import { baseURI } from "../../utils/api/axios";

const baseUrl = baseURI;
const ForgotPasswordd = () => {
	const [formData, setFormData] = useState({});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			await axios
				.post(`${baseUrl}/riders/riders-signup`, formData)
				.then((res) => {
					const signature = res.data.signature;
					localStorage.setItem("signature", signature);
					toast.success(res.data.message);
					setTimeout(() => {
						window.location.href = "/login";
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
	return (
		<div className={rest.reset_container}>
			<div>
				{/* <img src={registerBg} alt="Dispatch rider" /> */}
			</div>

			<div className={rest.form_style}>
				<form className={rest.form_div}>
					<div className={rest.budylogo}>
						<img src={Group15} alt="rider" />
						<p className={rest.swift}>
							Swift <br /> Rider
						</p>
					</div>

					<h3 className={rest.signup_head}> Reset Password</h3>
					<div className={rest.input_form}>
						<div>
							<label className={rest.labels}>New Password</label>
							<input
								type="password"
								name="password"
								onChange={handleChange}
								className={rest.resetPassword_input}
								placeholder="Enter your password"
							></input>
						</div>
						<div>
							<label className={rest.labels}> Confirm Password</label>
							<input
								type=""
								name="confirmPassword"
								onChange={handleChange}
								className={rest.resetPassword_input}
								placeholder="confirm your password"
							></input>
						</div>

						<button>
							<Link to="/login" className={rest.btnReg} onClick={handleSubmit}>
								Reset Password
							</Link>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ForgotPasswordd;

