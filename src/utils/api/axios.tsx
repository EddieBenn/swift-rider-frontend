import axios from "axios";
// import { baseURI } from "../config";
import { baseURL } from "../config";

export const baseURI = "https://swift-rider.onrender.com";


export const apiGet = async (path: string) => {
	return await axios.get(`${baseURI}${path}`);
};

export const apiGetAndAuth = async (path: string, config: any) => {
	return await axios.get(`${baseURI}${path}`, config);
};

export const apiPostAndAuth1 = async (path: any, data: any, config: any) => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return await axios.post(`${baseURI}${path}`, data, config);
};

export const apiPostAndAuth = async (path: string, data: any) => {
	const signature = localStorage.getItem("signature");
	if (signature === null) {
		return;
	}

	const config = {
		headers: {
			Authorization: `Bearer ${signature}`,
		},
	};

	return await axios.post(`${baseURL}${path}`, data, config);
};

export const apiPost = async (path: string, data: any) => {
	return await axios.post(`${baseURI}${path}`, data);
};

export const apiPut = async (path: string, data: any) => {
	const signature = localStorage.getItem("signature");
	if (signature === null) {
		return;
	}
	const config = {
		headers: {
			Authorization: `Bearer ${signature}`,
		},
	};

	return await axios.put(`${baseURL}${path}`, data, config);
};

export const apiPatch = async (path: string, data: any) => {
	const signature = localStorage.getItem("signature");
	if (signature === null) {
		return;
	}
	const config = {
		headers: {
			Authorization: `Bearer ${signature}`,
		},
	};

	return await axios.patch(`${baseURI}${path}`, data, config);
};

export const apiDelete = async (path: string) => {
	const signature = localStorage.getItem("signature");
	if (signature === null) {
		return;
	}
	const config = {
		headers: {
			Authorization: `Bearer ${signature}`,
		},
	};

	return await axios.delete(`${baseURL}${path}`, config);
};

export const apiPatchAuth = async (path: string, data: any, config: any) => {
	return await axios.patch(`${baseURI}${path}`, data, config);
};
