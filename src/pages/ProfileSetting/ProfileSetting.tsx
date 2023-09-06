/* eslint-disable @typescript-eslint/strict-boolean-expressions *//* eslint-disable @typescript-eslint/no-misused-promises *//* eslint-disable @typescript-eslint/restrict-template-expressions */
import style from "./ProfileSetting.module.css";
import { FaPencilAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import DemoNav from "../../components/Navbar/DemoNavbar";
import FormData from "form-data";
import { apiPatchAuth, apiGetAndAuth } from "../../utils/api/axios";

function ProfileSetting() {
	const [dataValues, setDataValues] = useState<Record<string, any>>({});

	const navigate = useNavigate();

	const { name, email, phone, passport } = dataValues;
	// listen to changes in the input fields    
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setDataValues({ ...dataValues, [name]: value });
	};
	//listen to changes in the image field    
	const handleImageChange = (e: any) => {
		const { name } = e.target;
		const file = e.target.files[0];
		if (file.size > 1000000) {
			toast.error("file is too large");
			return;
		}
		if (!file.type.includes("image")) {
			toast.error("File must be an image");
		}
		// setDataValues({ ...dataValues, [name]: file });        
		// console.log("this is dataValues", dataValues);    
		setDataValues({ ...dataValues, passport: e.target.files[0] });
	};
	// handle form submission    
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// console.log("this is formDatat", formData);        
		const formData = new FormData();
		formData.append("email", email);
		formData.append("name", name);
		formData.append("phone", phone);
		formData.append("passport", passport);
		try {
			const signature = localStorage.getItem("signature");
			await apiPatchAuth("/users/updateUserProfile", formData, {
				headers: {
					Authorization: `Bearer ${signature}`,
				},
			})
				.then((res: any) => {
					console.log(res.data.User);
					localStorage.setItem("userName", res.data.User.name);
					localStorage.setItem("photo", res.data.User.passport);
					toast.success(res.data.message);
					setTimeout(() => {
						navigate("/user-dashboard");
					}, 2000);
					
				})
				.catch((err: any) => {
					console.log(err);
					toast.error(err.response.data.Error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getDetails = async () => {
			try {
			  const { data } = await apiGetAndAuth(
				 `/users/get-user-profile`,
				 {
					headers: {
					  Authorization: `Bearer ${localStorage.getItem("signature")}`,
					},
				 }
			  );
				 
				 setDataValues(data.isUser);
			} catch (error) {
			  console.log(error);
			}
		 };
		 getDetails();
	},[])


	return (
		<div className={style.user__settings__div}>
			<DemoNav />
			<div className={style.user_settings_main}>
				<h1 className={style.user_settings_title}>Profile Settings</h1>
				<form className={style.user_settings_form} onSubmit={handleSubmit}>
					<div className={style.user_settings_form_title}>
						<h5 className={style.settings_b_info}>BASIC INFORMATION</h5>
						<p className={style.settings_p_info}>
							Only you can view and edit your information
						</p>
					</div>
					<div className={style.settings_f_fields}>
						<div className={style.settings_input_field}>                            <label htmlFor="fullname">profile image</label>
							<input className={style.settings_input_info}
								name="photo" id="photo" type="file" placeholder="image" onChange={handleImageChange}
							/>
							<FaPencilAlt className={style.settings_pen} />
						</div>
						<div className={style.settings_input_field}>                            <label htmlFor="fullname">Full Name</label>                            
						<input className={style.settings_input_info}
							name="name" id="name" type="text" placeholder="name" onChange={handleChange}
							value={dataValues.name}
							required />
							<FaPencilAlt className={style.settings_pen} />
						</div>
						<div className={style.settings_input_field}>                            <label htmlFor="phone number">Phone Number</label>
							<input className={style.settings_input_info}
								type={"tel"}
								id="phone" name="phone" placeholder="Phone Number" onChange={handleChange}
								value={dataValues.phone}
								required />
							<FaPencilAlt className={style.settings_pen} />
						</div>
						<div className={style.settings_input_field}>
							<label htmlFor="Email">Email Address</label>
							<input className={style.settings_input_info}
								type={"email"}
								name="email" id="email" placeholder="Email" onChange={handleChange}
								value={dataValues.email}
								required />
							<FaPencilAlt className={style.settings_pen}/>
						</div>
						<div className={style.settings_input_field}>
							<input className={style.settings_input_info}
								type={"submit"}
								value={"Submit"}
								style={{ backgroundColor: "#E02B45", color: "#fff" }}
							/>
						</div>
					</div>
				</form>
			</div>
		</div>);
}
export default ProfileSetting;