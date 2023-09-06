import { useState } from "react";
import styled from "./RidersSignupForm.module.css";
import RiderImage from "../../assets/registerBg.svg";
import BikeLogo from "../../assets/Riders_signup_assets/bike_icon.svg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { baseURI } from "../../utils/api/axios";

const baseUrl = baseURI;

const RidersSignup = () => {
	const [dataValues, setDataValues] = useState<Record<string, any>>({});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setDataValues({ ...dataValues, [name]: value });
	};

	const handleImageChange = (e: any) => {
		const { name } = e.target;
		const file = e.target.files[0];
		if (file.size > 1000000) {
			toast.error("file is too large");
			return;
		}
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		if (!file.type.includes("image")) {
			toast.error("File must be an image");
		}
		setDataValues({ ...dataValues, [name]: file });
	};
	console.log("data", dataValues);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// console.log("this is formDatat", formData);
		const formData = new FormData();
		formData.append("email", dataValues.email.trim().toLowerCase());
		formData.append("name", dataValues.name);
		formData.append("phone", dataValues.phone);
		formData.append("city", dataValues.city);
		formData.append("plateNumber", dataValues.plateNumber);
		formData.append("password", dataValues.password);
		formData.append("confirmPassword", dataValues.confirmPassword);
		formData.append("image", dataValues.documents);
		formData.append("image", dataValues.passport);
		formData.append("image", dataValues.validID);
		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};
			await axios
				.post(`${baseUrl}/riders/riders-signup`, formData, config)
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
		<div className={styled.Rider_Signup_container}>
			<div className={styled.image_container}>
				<div className={styled.rg_form_image}>{/* <img src={RiderImage} alt="placeholder_image_riders_signup_form" /> */}
					<p className={styled.cp}>
						Delivery service just got easier, elegant & superb with Swift Riders
					</p>
				</div>
			</div>
			<div className={styled.signup_form_field_container}>
				<div className={styled.form_bx}>
					{/* ---------- LOGO ---------- */}
					<Link to="/" style={{ textDecoration: "none" }}>
						<div className={styled.RiderSignUpLogo}>
							<div className={styled.logo_image}>
								<span>
									<img
										src={BikeLogo}
										alt="placeholder_image_riders_signup_form"
									/>
								</span>
							</div>
							<div className={styled.desc}>Swift Riders</div>
						</div>
					</Link>
					<h3 className={styled.sub_title}>Sign Up as a Rider</h3>
					{/* -------------- FORM -------------- */}
					<form className={styled.rider_SignUp_form}>

						<div className={styled.singup_form_fieldctn}>
									<label className={styled.singup_form_label}>Full Name</label>
									<b className={`fa fa-user login_form_s_input`}>
										<input
											placeholder="Enter your fullname"
											className={styled.singup_form_input}
											type="text"
											id="name"
											name="name"
											onChange={handleChange}
											style={{border: "1px solid red"}}
										/>
									</b>
									<label className={styled.singup_form_label}>Email</label>
									<b className={`fa fa-envelope login_form_s_input`}>
										<input
											className={styled.singup_form_input}
											type="email"
											name="email"
											placeholder="Enter your email"
											onChange={handleChange}
										/>
									</b>
									<label className={styled.singup_form_label}>Phone Number</label>
									<b className={`fa fa-phone login_form_s_input`}>
										<input
											className={styled.singup_form_input}
											type="phone"
											name="phone"
											placeholder="Enter your phone number"
											onChange={handleChange}
										/>
									</b>
									<label className={styled.singup_form_label}>City</label>
									<b className={`fa fa-city login_form_s_input`}>
										<input
											className={styled.singup_form_input}
											type="text"
											id="city"
											name="city"
											placeholder="City"
											onChange={handleChange}
										/>
									</b>
									<label className={styled.singup_form_label}>Plate Number</label>
									<b className={`fa fa-motorcycle login_form_s_input`}>
										<input
											className={styled.singup_form_input}
											type="text"
											id="plateNumber"
											name="plateNumber"
											placeholder="Plate Number"
											onChange={handleChange}
										/>
									</b>
									<label className={styled.singup_form_label}>Bike Documents</label>
									<b className={`fa fa-file-text login_form_s_input`}>
										<input
											className={styled.signup_uploads}
											type="file"
											name="documents"
											placeholder="Upload"
											onChange={handleImageChange}
										/>
									</b>
									<label className={styled.singup_form_label}>Valid ID Card</label>
									<b className={`fa fa-id-card login_form_s_input`}>
										<input
											className={styled.signup_uploads}
											type="file"
											name="validID"
											placeholder="Upload"
											onChange={handleImageChange}
										/>
									</b>
									<label className={styled.singup_form_label}>Passport Photo</label>
									<b className={`fa fa-user-circle login_form_s_input`}>
										<input
											className={styled.signup_uploads}
											type="file"
											name="passport"
											placeholder="Upload"
											onChange={handleImageChange}
										/>
									</b>
									<label className={styled.singup_form_label}>Password</label>
									<b className={`fa fa-lock login_form_s_input`}>
										<input
											className={styled.singup_form_input}
											type="password"
											name="password"
											placeholder="Enter your Password"
											onChange={handleChange}
										/>
									</b>
									<label className={styled.singup_form_label}>Confirm Password</label>
									<b className={`fa fa-lock login_form_s_input`}>
										<input
											className={styled.singup_form_input}
											type="password"
											name="confirmPassword"
											placeholder="Enter your Password"
											onChange={handleChange}
										/>
									</b>
						</div>

						<div className="btn-container">
							{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
							<button className={styled.buttonReg} onClick={handleSubmit}>
								Signup
							</button>
						</div>

						<p className={styled.signin}>
							Already have an account?
							<a>
								<Link to="/login" style={{ textDecoration: "none" }}>
									<span className="signin" style={{ textAlign: "center" }}>
										Sign In
									</span>
								</Link>
							</a>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};
export default RidersSignup;
