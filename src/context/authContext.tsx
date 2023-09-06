import React, { createContext } from "react";
import { toast } from "react-toastify";
import { apiPost } from "../utils/api/axios";

interface AppContextInterface {
	name: string;
	rider: string;
	url: string;
}

export const dataContext = createContext<AppContextInterface | null>(null);

const DataProvider = ({ children }: any) => {
	/* ========= Register =========== */
	const riderRegisterConfig = async (FormData: any) => {
		try {
			const riderRegisterData = {
				firstName: FormData.firstName,
				lastName: FormData.lastName,
				email: FormData.email,
				password: FormData.password,
				confirmPassword: FormData.confirmPassword,
				phone: FormData.phone,
				address: FormData.address,
				image: FormData.image,
				plateNumber: FormData.plateNumber,
			};
			await apiPost("/rider/signup", riderRegisterData)
				.then((res: any) => {
					toast.success(res.data.message);
					localStorage.setItem("signature", res.data.signature);
					setTimeout(() => {
						window.localStorage.href = "/otp";
					}, 2000);
				})
				.catch((err: any) => {
					toast.error(err.response.data.Error);
				});
		} catch (err) {
			console.log(err);
		}
	};

	return { riderRegisterConfig };
};

export const useAuth = () => {
	const context = React.useContext(dataContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within the auth provider");
	}
	return context;
};
export default DataProvider;
