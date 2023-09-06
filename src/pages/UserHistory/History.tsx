/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import "./History.css";
import { apiGetAndAuth } from "../../utils/api/axios";
import moment from "moment";
import DemoNav from "../../components/Navbar/DemoNavbar";

const History = () => {
	const [data, setData] = useState([]);
	const [dataPerPage, setDataPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const getData = async () => {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const access_token = localStorage.getItem("signature");
		await apiGetAndAuth("/users/my-orders", {
			headers: {
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				Authorization: `Bearer ${access_token}`,
			},
		})
			.then((response) => {
				setData(response?.data?.rows);
			})
			.catch((error: any) => {
				console.warn(error);
			});
	};

	const showData = () => {
		const indexOfLastPage = currentPage * dataPerPage;
		const indexOfFirstPage = indexOfLastPage - dataPerPage;
		const currentPosts = data.slice(indexOfFirstPage, indexOfLastPage);
		try {
			return currentPosts.map((item: any, index) => {
				const date = new Date(item.createdAt);
				const options: Intl.DateTimeFormatOptions = {
					year: "2-digit",
					month: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				};
				const formattedTime: string = new Intl.DateTimeFormat(
					"en-US",
					options
				).format(date);
				return (
					<tbody key={index}>
						<tr>
							<td>{dataPerPage * (currentPage - 1) + index + 1}</td>
							<td>
								N{" "}
								{item.offerAmount
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							</td>
							<td>{formattedTime}</td>
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

	useEffect(() => {
		void getData();
	}, []);

	return (
		<>
			<DemoNav />
			<div
				className="container user_history_table"
				style={{ marginTop: "10%" }}
			>
				<div className="rHis_title_container">
					<h3 className="rHis_title">User History</h3>
				</div>
				<table className="table align-items-center justify-content-center mb-0">
					<thead>
						<tr>
							<th>S/N</th>
							<th>Amount</th>
							<th>Date</th>
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

export default History;
