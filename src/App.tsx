import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const App = () => {
	return (
		<div className="p-4">
			<Navbar />
			<div className="py-4">
				<Outlet />
			</div>
		</div>
	);
};

export default App;
