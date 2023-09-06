/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-irregular-whitespace */
import React, { useState } from "react";
// import registerBg from "../../assets/registerBg.svg";
import Group15 from "../../assets/Group15.svg";
import { Link } from "react-router-dom";
import modern from "./Register.module.css";
import { toast } from "react-toastify";
import { apiPost } from "../../utils/api/axios";

const Register = () => {
	const [formData, setFormData] = useState({});
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	console.log(formData);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const result = await apiPost("/users/signup", formData);
			if (result.status === 201) {
				toast.success(result.data.message);
				setTimeout(() => {
					window.location.href = "/login";
				}, 2000);
			}

		} catch (error: any) {
			console.log(error);
			// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			if (error.response.data.Error) {
				toast.error(error.response.data.Error);
				// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			} else if (error.request) {
				toast.error(error.message);
				// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			} else if (error.message) {
				toast.error(error.message);
			}
		}
	};
	return (
		<div className={modern.singup_f_section}>
			<div className={modern.singup_form_data_container}>
				<div className={modern.singup_form_image}>
					<h1 className={modern.singup_section_h1}>
						Delivery service just got easier, elegant & superb with Dispatch
						Buddy
					</h1>
					{/* <img src={image} /> */}
				</div>
			</div>

			<div className={modern.singup_form_ctainer}>
				<div className={modern.singup_form_ctainer_innerDiv}>
					<div className={modern.singup_logo_div}>
						<Link to="/" style={{ textDecoration: "none" }}>
							<div className={modern.singup_form_logo}>
								<img src={Group15} alt="logo" />
								<span>
									Swift
									<br />
									Rider
								</span>
							</div>
						</Link>
					</div>
					<form className={modern.singup_form} onSubmit={handleSubmit}>
						<div className={modern.singup_form_data_content}>
							<h2 className={modern.singup_form_title}>Customer Signup</h2>

							<div className={modern.singup_form_label_ctn}>
								<div className={modern.singup_form_fieldctn}>
									<label className={modern.singup_form_label}>Full Name</label>
									<b className={`fa fa-user login_form_s_input`}>
										<input
											placeholder="Enter your fullname"
											className={modern.singup_form_input}
											type="text"
											id="name"
											name="name"
											onChange={handleChange}
										/>
									</b>
									<br />
									<label className={modern.singup_form_label}>Email</label>
									<b className={`fa fa-envelope login_form_s_input`}>
										<input
											placeholder="Enter your email"
											className={modern.singup_form_input}
											type="email"
											id="email"
											name="email"
											onChange={handleChange}
										/>
									</b>
									<br />
									<label className={modern.singup_form_label}>
										Phone Number
									</label>
									<b className={`fa fa-phone login_form_s_input`}>
										<input
											placeholder="Enter your phone number"
											className={modern.singup_form_input}
											type="tel"
											id="phone"
											name="phone"
											onChange={handleChange}
										/>
									</b>
									<br />
									<label className={modern.singup_form_label}>Password</label>
									<b className={`fa fa-lock login_form_s_input`}>
										<input
											placeholder="Enter your password"
											className={modern.singup_form_input}
											type="password"
											id="password"
											name="password"
											onChange={handleChange}
										/>
									</b>
									<br />
									<label className={modern.singup_form_label}>
										Confirm Password
									</label>

									<b className="fa fa-lock">
										<input
											placeholder="Confirm password"
											className={modern.singup_form_input}
											type="password"
											id="confirm_password"
											name="confirm_password"
											onChange={handleChange}
										/>
									</b>
									<br />
									<input
										className={`${modern.singup_form_input} ${modern.singup_form_s_input}`}
										type="submit"
										value="Signup"
									/>
									<div>
										<p className={modern.singup_form_p}>
											Already have an account?? <Link to="/login">Login</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

	);
};
export default Register;
