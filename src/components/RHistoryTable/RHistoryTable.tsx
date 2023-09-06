/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import "./RHistoryTable.css";
import { apiGetAndAuth } from "../../utils/api/axios";
import DemoNav from "../Navbar/DemoNavbar";

const RHistoryTable = () => {
	const [data, setData] = React.useState([]);
	const [dataPerPage, setDataPerPage] = React.useState(10);
	const [currentPage, setCurrentPage] = React.useState(1);

	const getPosts = async () => {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const access_token = localStorage.getItem("signature");
		await apiGetAndAuth("/riders/rider-history", {
			headers: {
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				Authorization: `Bearer ${access_token}`,
			},
		})
			.then((response: any) => {
				setData(response?.data?.rows);
			})
			.catch((error: any) => {
				console.warn(error);
			});
	};
	React.useEffect(() => {}, []);

	const showData = () => {
		const indexOfLastPage = currentPage * dataPerPage;
		const indexOfFirstPage = indexOfLastPage - dataPerPage;
		const currentPosts = data.slice(indexOfFirstPage, indexOfLastPage);
		try {
			return currentPosts.map((item: any, index) => {
				const date = new Date(item.createdAt);
				const months = [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"June",
					"July",
					"Aug",
					"Sept",
					"Oct",
					"Nov",
					"Dec",
				];
				const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

				const month = months[date.getMonth()];
				const day = days[date.getDay()];
				const year = date.getFullYear();
				const hour = date.getHours();
				const minutes = date.getMinutes();
				const ampm = hour >= 12 ? "PM" : "AM";
				return (
					<tbody key={index}>
						<tr className="rider_hist_tr1">
							<td>{dataPerPage * (currentPage - 1) + index + 1}</td>
							<td>
								{item.dropOffLocation.length > 22
									? item.dropOffLocation.slice(0, 22) + "..."
									: item.dropOffLocation}
							</td>
							<td>{item.dropOffPhoneNumber}</td>
							<td>{`${month}, ${day} ${date.getDate()}, ${year} ${hour}:${minutes} ${ampm}`}</td>
							<td>{item.status}</td>
						</tr>
					</tbody>
				);
			});
		} catch (e: any) {
			alert(e.message);
		}
	};

	const showPagination = () => {
		const pageNumbers = [];
		const totalPosts = data.length;

		for (let i = 1; i <= Math.ceil(totalPosts / dataPerPage); i++) {
			pageNumbers.push(i);
		}

		const pagination = (pageNumbers: any) => {
			setCurrentPage(pageNumbers);
		};

		return (
			<nav>
				<ul className="pagination pickup_pagination">
					{pageNumbers.map((number) => (
						<li
							key={number}
							className={
								currentPage === number ? "page-item active" : "page-item"
							}
						>
							<button onClick={() => pagination(number)} className="page-link">
								{" "}
								{number}{" "}
							</button>
						</li>
					))}
				</ul>
			</nav>
		);
	};

	React.useEffect(() => {
		void getPosts();
	}, []);

	return (
		<>
			<div
				className="container pickup_history_table"
				style={{ marginTop: "10%" }}
			>
				<div className="rHis_title_container">
					<h3 className="rHis_title">Rider History</h3>
				</div>
				<table className="table align-items-center justify-content-center mb-0">
					<thead>
						<tr className="rHis_thead">
							<th>S/N</th>
							<th>Location</th>
							<th>Receiver's Contact</th>
							<th>Date/Time</th>
							<th>Status</th>
						</tr>
					</thead>
					{showData()}
				</table>

				<div style={{ float: "right" }}>{showPagination()}</div>
			</div>
		</>
	);
};

export default RHistoryTable;
