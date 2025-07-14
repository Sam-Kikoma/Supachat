import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const App = () => {
	return (
		<div className="p-4 max-w-screen overflow-hidden">
			<Navbar />
			<div className="py-4 flex justify-center items-center">
				<Outlet />
			</div>
		</div>
	);
};

export default App;
