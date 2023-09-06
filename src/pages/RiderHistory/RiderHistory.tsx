import DemoNav from "../../components/Navbar/DemoNavbar";
import RHistoryTable from "../../components/RHistoryTable/RHistoryTable";
import riderHistory from "./RiderHistory.module.css";

const RiderHistory = () => {
	return (
		<div className={riderHistory.riderhistory}>
			<DemoNav />
			<div className={riderHistory.rider_history_container}>
				<RHistoryTable />
			</div>
		</div>
	);
};

export default RiderHistory;
