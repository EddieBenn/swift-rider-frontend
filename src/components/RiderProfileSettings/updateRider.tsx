/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import style from "../../pages/ProfileSetting/ProfileSetting.module.css";
import { FaPencilAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import DemoNav from "../../components/Navbar/DemoNavbar";
import { apiPatchAuth, apiGetAndAuth } from "../../utils/api/axios";

function RiderProfileSetting() {
	const [formData, setFormData] = useState<Record<string, any>>({});
	const navigate = useNavigate();
	const handleChange = (e: any) => {
		console.log("changing data");
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const signature = localStorage.getItem("signature");

			await apiPatchAuth("/riders/update-rider", formData, {
				headers: {
					Authorization: `Bearer ${signature}`,
				},
			})
				.then((res: any) => {
					console.log(res.data.User);
					localStorage.setItem("userName", res.data.User.name);
					toast.success(res.data.message);
					setTimeout(() => {
						navigate("/riders-dashboard");
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
	const getRiderDetails = async () => {
		try {
		  const { data } = await apiGetAndAuth(
			 `/riders/get-rider`,
			 {
				headers: {
				  Authorization: `Bearer ${localStorage.getItem("signature")}`,
				},
			 }
		  );
			 
			 		setFormData(data.isRider);
		} catch (error) {
		  console.log(error);
		}
	 };
	 getRiderDetails();
	}, [])

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
						<div className={style.settings_input_field}>
							<label htmlFor="fullname">Full Name</label>
							<input
								className={style.settings_input_info}
								name="name"
								id="name"
								type="text"
								value={formData.name}
								placeholder="name"
								onChange={handleChange}
							/>
							<FaPencilAlt className={style.settings_pen} />
						</div>
						<div className={style.settings_input_field}>
							<label htmlFor="phone number">Phone Number</label>
							<input
								className={style.settings_input_info}
								type={"tel"}
								id="phone"
								name="phone"
								value={formData.phone}
								placeholder="Phone Number"
								onChange={handleChange}
							/>
							<FaPencilAlt className={style.settings_pen} />
						</div>
						<div className={style.settings_input_field}>
							<label htmlFor="Email">Email Address</label>
							<input
								className={style.settings_input_info}
								type={"email"}
								name="email"
								id="email"
								value={formData.email}
								placeholder="Email"
								onChange={handleChange}
							/>
							<FaPencilAlt className={style.settings_pen} />
						</div>
						<div className={style.settings_input_field}>
							<input
								className={style.settings_input_info}
								type={"submit"}
								value={"Submit"}
								style={{ backgroundColor: "#E02B45", color: "#fff" }}
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
export default RiderProfileSetting;
